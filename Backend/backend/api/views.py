from django.contrib.auth.hashers import check_password
from rest_framework import status
from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    Patient, Doctors, Scan, Appointment, FamilyRelatives,
    Grouptable, MedicalHistory
)
from .serializers import (
    PatientSerializer, DoctorSerializer, ScanSerializer,
    AppointmentSerializer, FamilyRelativesSerializer,
    GrouptableSerializer, MedicalHistorySerializer
)


# Login API
@api_view(['POST'])
def login(request):
    """
    Handles user authentication for both patients and doctors.

    POST Request Body:
        {
            "email": "user@example.com",
            "password": "user_password"
        }

    Response:
        - On Success (HTTP 200):
            {
                "role": "patient" or "doctor",
                "user": {...}  # User details serialized
            }
        - On Error (HTTP 400 or 401):
            {
                "detail": "Error message"
            }
    """
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate that email and password are provided
    if not email or not password:
        return Response(
            {"detail": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Try finding the user as a patient
        user = Patient.objects.get(email=email)
        role = 'patient'
    except Patient.DoesNotExist:
        try:
            # Try finding the user as a doctor
            user = Doctors.objects.get(email=email)
            role = 'doctor'
        except Doctors.DoesNotExist:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )

    # Validate the password
    if not check_password(password, user.password):
        return Response(
            {"detail": "Invalid credentials."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Serialize the user based on their role
    serializer = PatientSerializer(user) if role == 'patient' else DoctorSerializer(user)

    return Response(
        {
            "role": role,
            "user": serializer.data
        },
        status=status.HTTP_200_OK
    )


# Patient APIs
@api_view(['GET', 'POST'])
def patients_list_create(request):
    """
    Handles retrieving the list of patients or creating a new patient using raw SQL.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM patient")
            columns = [col[0] for col in cursor.description]
            patients = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return Response(patients)

    elif request.method == 'POST':
        data = request.data

        # Validate required fields
        required_fields = ['name', 'gender', 'primary_mobile_no', 'password']
        for field in required_fields:
            if not data.get(field):
                return Response(
                    {"error": f"'{field}' is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        try:
            with connection.cursor() as cursor:
                # 1) Insert new patient, return the new id
                cursor.execute("""
                    INSERT INTO patient (
                        name,
                        photo_url,
                        gender,
                        dob,
                        primary_mobile_no,
                        secondry_mobile_no,
                        email,
                        address,
                        referred_by,
                        blood_type,
                        password
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                    data.get('password'),
                ])
                new_id = cursor.fetchone()[0]

                # 2) Fetch the full row for the newly created patient
                cursor.execute("SELECT * FROM patient WHERE id = %s", [new_id])
                columns = [col[0] for col in cursor.description]
                patient_data = dict(zip(columns, cursor.fetchone()))

            # Return the full patient record
            return Response(patient_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": str(e)},
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
@api_view(['GET'])
def patient_appointments(request, patient_id):
    """
    Retrieves all appointments related to a specific patient.
    """
    appointments = Appointment.objects.filter(patient_id=patient_id)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def doctor_appointments(request, doctor_id):
    """
    Retrieves all appointments related to a specific doctor.
    """
    appointments = Appointment.objects.filter(doctor_id=doctor_id)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


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
@api_view(['GET'])
def patient_medical_history(request, patient_id):
    """
    Retrieves all medical history records for a specific patient.
    """
    history = MedicalHistory.objects.filter(patient_id=patient_id)
    serializer = MedicalHistorySerializer(history, many=True)
    return Response(serializer.data)