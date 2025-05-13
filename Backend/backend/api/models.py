# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Doctors(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    photo_url = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    primary_mobile_no = models.CharField(max_length=20, blank=True, null=True)
    secondry_mobile_no = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    password = models.CharField(max_length=128, blank=False, null=False)  # Add password field

    class Meta:
        managed = False
        db_table = 'doctors'


class Patient(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    photo_url = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    primary_mobile_no = models.CharField(max_length=20, blank=True, null=True)
    secondry_mobile_no = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    referred_by = models.ForeignKey(Doctors, models.DO_NOTHING, db_column='referred_by', blank=True, null=True)
    blood_type = models.CharField(max_length=5, blank=True, null=True)
    password = models.CharField(max_length=128, blank=False, null=False)  # Add password field

    class Meta:
        managed = False
        db_table = 'patient'


class Appointment(models.Model):
    patient   = models.ForeignKey('Patient', on_delete=models.CASCADE)
    doctor    = models.ForeignKey('Doctors', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(blank=True, null=True)

    address   = models.CharField(max_length=255, blank=True, null=True)
    status    = models.CharField(max_length=50,  blank=True, null=True)

    class Meta:
        db_table = 'appointment'

    def __str__(self):
        return f"Appointment with Dr. {self.doctor.name} on {self.timestamp}"

class Surgery(models.Model):
    doctor       = models.ForeignKey(Doctors,  on_delete=models.CASCADE)
    patient      = models.ForeignKey(Patient,  on_delete=models.CASCADE)
    procedure    = models.CharField(max_length=255)     # what surgery to perform
    room         = models.CharField(max_length=50)      # OR room number/name
    scheduled_at = models.DateTimeField()               # when it happens
    notes        = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'Surgery'

    def __str__(self):
        return f"{self.procedure} for {self.patient.name} by Dr. {self.doctor.name}"


class FamilyRelatives(models.Model):
    patient = models.ForeignKey('Patient', models.DO_NOTHING, blank=True, null=True)
    relative = models.ForeignKey('Patient', models.DO_NOTHING, related_name='familyrelatives_relative_set', blank=True, null=True)
    relation = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'family_relatives'


class Grouptable(models.Model):
    patient = models.ForeignKey('Patient', models.DO_NOTHING, blank=True, null=True)
    group_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'grouptable'


class InquiryOrRequest(models.Model):
    patient = models.ForeignKey('Patient', models.DO_NOTHING, blank=True, null=True)
    doctor_of_interest = models.ForeignKey(Doctors, models.DO_NOTHING, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inquiry_or_request'



class MedicalHistory(models.Model):
    patient         = models.ForeignKey('Patient', on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=255)
    dosage          = models.CharField(max_length=100, blank=True, null=True)
    refills         = models.IntegerField(default=0)
    date_recorded   = models.DateField()

    class Meta:
        db_table = 'medical_history'

    def __str__(self):
        return f"{self.medication_name} for {self.patient.name}"



class Scan(models.Model):
    patient = models.ForeignKey(Patient, models.DO_NOTHING, blank=True, null=True)
    scan_file_url = models.TextField(blank=True, null=True)
    scan_date = models.DateField(blank=True, null=True)
    scan_type = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scan'
