from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('login/', views.login, name='login'),

    # Patients
    path('patients/', views.patients_list_create, name='patients_list_create'),
    path('patients/<int:pk>/', views.patient_detail, name='patient_detail'),
    path('patients/<int:patient_id>/scans/', views.patient_scans, name='patient_scans'),
    path('patients/<int:patient_id>/family/', views.patient_family, name='patient_family'),
    path('patients/<int:patient_id>/group/', views.patient_group, name='patient_group'),
    path('patients/<int:patient_id>/medical_history/', views.patient_medical_history, name='patient_medical_history'),

    # Doctors
    path('doctors/', views.doctors_list_create, name='doctors_list_create'),
    path('doctors/<int:pk>/', views.doctor_detail, name='doctor_detail'),

    # Appointments (list/create) — use query-params for ?patient= or ?doctor=
    path('appointments/', views.appointments_list_create, name='appointments_list_create'),

    # Surgeries (list/create + detail)
    path('surgeries/',    views.surgery_list_create, name='surgery_list_create'),
    path('surgeries/<int:pk>/', views.surgery_detail,   name='surgery_detail'),

    path('stats/', views.get_stats),
    path('doctors/gender/', views.get_doctors_gender),
    path('patients/age-distribution/', views.get_patients_age_distribution),
    path('appointments/', views.get_appointments),
]
