from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.contrib.auth.hashers import check_password, make_password
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
import traceback
from rest_framework.views import APIView

from .models import (
    Patient, Doctors, Scan, Appointment, FamilyRelatives,
    Grouptable, MedicalHistory, Surgery
)
from .serializers import (
    PatientSerializer, DoctorSerializer, ScanSerializer,
    AppointmentSerializer, FamilyRelativesSerializer,
    GrouptableSerializer, MedicalHistorySerializer, ScanSerializer, SurgerySerializer
)

# -----------------------------------------------------------------------------
# Login API
# -----------------------------------------------------------------------------
@csrf_exempt
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def login(request):
    """
    POST /api/login/
      { "email": "...", "password": "..." }
    Always returns JSON.
    """
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response(
                {"detail": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Attempt to find exactly one patient with this email
        patients = Patient.objects.filter(email=email)
        if patients.count() > 1:
            return Response(
                {"detail": "Multiple patient accounts found with this email, contact admin."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        if patients.exists():
            user = patients.first()
            role = 'patient'
        else:
            # Then attempt doctors
            doctors = Doctors.objects.filter(email=email)
            if doctors.count() > 1:
                return Response(
                    {"detail": "Multiple doctor accounts found with this email, contact admin."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            if not doctors.exists():
                return Response(
                    {"detail": "Invalid credentials."},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            user = doctors.first()
            role = 'doctor'

        # Validate the password
        if not check_password(password, user.password):
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Serialize and return
        serializer = PatientSerializer(user) if role == 'patient' else DoctorSerializer(user)
        return Response(
            {"role": role, "user": serializer.data},
            status=status.HTTP_200_OK
        )

    except Exception as exc:
        return Response(
            {"detail": f"Server error: {str(exc)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

#--------------------------------------------------------------------------------------------
#Surgery Methods
#---------------------------------------------------------------------------------------------
@api_view(['GET', 'POST'])
@renderer_classes([JSONRenderer])
def surgery_list_create(request):
    # GET → list (with optional doctor filter)
    if request.method == 'GET':
        try:
            qs = Surgery.objects.all()
            doc_id = request.query_params.get('doctor')
            if doc_id:
                qs = qs.filter(doctor_id=doc_id)
            serializer = SurgerySerializer(qs, many=True)
            return Response(serializer.data)

        except Exception as exc:
            # Return the exception detail + full traceback for debugging
            tb = traceback.format_exc()
            return Response(
                {
                    "detail": str(exc),
                    "traceback": tb
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # POST → create new surgery
    serializer = SurgerySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def surgery_detail(request, pk):

    try:
        surgery = Surgery.objects.get(pk=pk)
    except Surgery.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = SurgerySerializer(surgery)
    return Response(serializer.data)

# -----------------------------------------------------------------------------
# Patient List/Create (raw SQL) — unchanged except password hashing
# -----------------------------------------------------------------------------
@api_view(['GET', 'POST'])
@renderer_classes([JSONRenderer])
def patients_list_create(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id,name,photo_url,gender,dob,primary_mobile_no,"
                "secondry_mobile_no,email,address,referred_by,blood_type "
                "FROM patient"
            )
            cols = [c[0] for c in cursor.description]
            patients = [dict(zip(cols, row)) for row in cursor.fetchall()]
        return Response(patients)

    # POST → hash password before INSERT
    data = request.data
    for f in ['name','gender','primary_mobile_no','password']:
        if not data.get(f):
            return Response(
                {"error": f"'{f}' is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

    hashed = make_password(data['password'])
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO patient (
                    name,photo_url,gender,dob,primary_mobile_no,
                    secondry_mobile_no,email,address,referred_by,
                    blood_type,password
                ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                RETURNING id
            """, [
                data.get('name'),
                data.get('photo_url'),
                data.get('gender'),
                data.get('dob'),
                data.get('primary_mobile_no'),
                data.get('secondry_mobile_no'),
                data.get('email'),
                data.get('address'),
                data.get('referred_by'),
                data.get('blood_type'),
                hashed
            ])
            new_id = cursor.fetchone()[0]
            cursor.execute("""
                SELECT id,name,photo_url,gender,dob,primary_mobile_no,
                       secondry_mobile_no,email,address,referred_by,blood_type
                FROM patient WHERE id=%s
            """, [new_id])
            cols = [c[0] for c in cursor.description]
            patient_data = dict(zip(cols, cursor.fetchone()))
        return Response(patient_data, status=status.HTTP_201_CREATED)

    except Exception as exc:
        return Response(
            {"error": str(exc)},
            status=status.HTTP_400_BAD_REQUEST
        )



@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def patient_detail(request, pk):
    """
    Handles operations on an individual patient, using raw SQL for updates.
    """
    # 1) Fetch the patient or 404
    try:
        patient = Patient.objects.get(pk=pk)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # 2) GET → just serialize
    if request.method == 'GET':
        serializer = PatientSerializer(patient)
        return Response(serializer.data)

    # 3) DELETE → ORM delete is fine here
    if request.method == 'DELETE':
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # 4) PUT or PATCH → raw‑SQL update
    if request.method in ['PUT', 'PATCH']:
        data = request.data
        # Only these columns are allowed to be written
        allowed = [
            'name', 'photo_url', 'gender', 'dob',
            'primary_mobile_no', 'secondry_mobile_no',
            'email', 'address', 'referred_by', 'blood_type'
        ]

        # Build SET clause and parameters
        set_parts = []
        params = []
        for col in allowed:
            if col in data:
                set_parts.append(f"{col} = %s")
                params.append(data[col])

        if not set_parts:
            return Response(
                {"detail": "No updatable fields provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        params.append(pk)  # for WHERE id = %s
        set_clause = ", ".join(set_parts)

        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    f"UPDATE patient SET {set_clause} WHERE id = %s",
                    params
                )
            # Re‑fetch & return the updated record
            updated = Patient.objects.get(pk=pk)
            serializer = PatientSerializer(updated)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


# Doctor APIs
@api_view(['GET', 'POST'])
def doctors_list_create(request):
    """
    Handles retrieving the list of doctors or creating a new doctor.
    """
    if request.method == 'GET':
        doctors = Doctors.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def doctor_detail(request, pk):
    """
    Handles operations on an individual doctor.
    """
    try:
        doctor = Doctors.objects.get(pk=pk)
    except Doctors.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        partial = request.method == 'PATCH'  # Support partial updates
        serializer = DoctorSerializer(doctor, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        doctor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Scan APIs
@api_view(['GET'])
def patient_scans(request, patient_id):
    """
    Retrieves all scans related to a specific patient.
    """
    scans = Scan.objects.filter(patient_id=patient_id)
    serializer = ScanSerializer(scans, many=True)
    return Response(serializer.data)


# Appointment APIs
@api_view(['GET', 'POST'])
def appointments_list_create(request):
    """
    GET  /api/appointments/?patient=<id>&doctor=<id>
      → filter by either or both query-params
    POST /api/appointments/
      → create new appointment; body must include patient, doctor, timestamp, address, status
    """
    if request.method == 'GET':
        qs = Appointment.objects.all()
        patient_id = request.query_params.get('patient')
        doctor_id  = request.query_params.get('doctor')
        if patient_id:
            qs = qs.filter(patient_id=patient_id)
        if doctor_id:
            qs = qs.filter(doctor_id=doctor_id)

        serializer = AppointmentSerializer(qs, many=True)
        return Response(serializer.data)

    # POST
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Family APIs
@api_view(['GET'])
def patient_family(request, patient_id):
    """
    Retrieves all family relatives of a specific patient.
    """
    family = FamilyRelatives.objects.filter(patient_id=patient_id)
    serializer = FamilyRelativesSerializer(family, many=True)
    return Response(serializer.data)


# Group APIs
@api_view(['GET'])
def patient_group(request, patient_id):
    """
    Retrieves all group data for a specific patient.
    """
    group = Grouptable.objects.filter(patient_id=patient_id)
    serializer = GrouptableSerializer(group, many=True)
    return Response(serializer.data)


# Medical History APIs
@api_view(['GET', 'POST'])
def patient_medical_history(request, patient_id):
    """
    GET  /api/patients/<patient_id>/medical_history/  -> list history
    POST /api/patients/<patient_id>/medical_history/  -> create new record
    """
    if request.method == 'GET':
        history = MedicalHistory.objects.filter(patient_id=patient_id)
        serializer = MedicalHistorySerializer(history, many=True)
        return Response(serializer.data)

    # POST
    data = request.data.copy()
    data['patient'] = patient_id
    serializer = MedicalHistorySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
