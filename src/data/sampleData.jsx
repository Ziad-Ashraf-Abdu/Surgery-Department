export const patientUser = {
  name: "Neil S.",
  id: "P130412",
  gender: "Male",
  age: 25,
  dob: "1988-04-05",
  referredBy: "Practo.com",
  bloodGroup: "O+",
  family: {
    parent: "Girish V.",
    spouse: "Anita G.",
  },
  contact: {
    primaryMobile: "+919887654321",
    secondaryMobile: "+917895432101",
    landLine: "+918025432101",
    email: "neils@someemail.com",
    address: "#10 4th Main 20th Cross",
  },
  photo:
    "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
  notes: [
    {
      text: "routine check up on Wednesday",
      author: "Dr. Rashmi G",
      date: "22 Apr 2013",
    },
    {
      text: "Needs wheelchair access.",
      author: "Dr. Anuraag D",
      date: "19 Apr 2013",
    },
  ],
  medicalHistory: [
    "Allergies",
    "Undergone Dental Treatment Earlier",
    "Low Blood Pressure",
  ],
  groups: ["Corporate Patients", "Has Insurance", "Smoker"],
  billing: {
    dueAmount: 200.0,
    currency: "INR",
  },
  medication: {
    name: "", // Add the medication name here
    dose: "", // Add the dose here
    referredBy: "", // Add who referred the patient
  },
};

export const doctorUser = {
  name: "Ayesha K.",
  id: "D20458",
  specialization: "Cardiology",
  department: "Cardiology Department",
  photo: "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
  contact: {
    email: "ayesha.k@hospital.com",
    phone: "+919812345678",
    office: "Room 402, Cardio Wing",
  },
  yearsExperience: 15,
  credentials: ["MD", "PhD"],
  certifications: ["ABIM Certified", "BLS", "ACLS"],
  affiliations: ["American Medical Association"],
  surgeriesThisWeek: [
    { date: "April 25, 2025", time: "08:00", procedure: "Knee Arthroscopy", room: "3A" },
    // …
  ],
  avgWaitTime: 12,
  satisfactionScore: 4.7,
  onCallSchedule: [
    { date: "2025-04-27", shift: "7 pm–7 am" },
    // …
  ],
  todaySchedule: [
    { time: "09:00 AM", patient: "Neil S." },
    { time: "10:30 AM", patient: "Maria L." },
    { time: "01:00 PM", patient: "John D." },
    { time: "03:00 PM", patient: "Sara P." },
  ],
  notifications: ["2 pending lab reviews", "1 new message from Admin"],
  patientCount: 20,
};

// src/components/sampleData.jsx
export default {
  doctorUser: {
    name: "Dr. Emily Carter",
    specialty: "Cardiothoracic Surgery",
    hospital: "City General Hospital",
    profileImage: "doctor-avatar.jpg",
    patientCount: 327,
    avgWaitTime: 14,
    satisfactionScore: 4.7,

    todaySchedule: [
      { time: "08:30 AM", patient: "Sarah Johnson", type: "Pre-op Consultation" },
      { time: "10:00 AM", patient: "Michael Chen", type: "Follow-up" },
      { time: "01:45 PM", patient: "James Wilson", type: "Surgical Review" },
      { time: "03:30 PM", patient: "Emma Davis", type: "New Patient" }
    ],

    surgeriesThisWeek: [
      {
        date: "2023-08-01",
        time: "07:30",
        procedure: "CABG",
        room: "OR 1",
        patient: "Robert Smith",
        duration: "3.5h"
      },
      {
        date: "2023-08-03",
        time: "11:00",
        procedure: "Valve Replacement",
        room: "OR 2",
        patient: "Maria Garcia",
        duration: "4h"
      },
      {
        date: "2023-08-04",
        time: "09:00",
        procedure: "Aortic Aneurysm Repair",
        room: "OR 1",
        patient: "David Miller",
        duration: "5h"
      }
    ],

    onCallSchedule: [
      { date: "Mon", shift: "Day Shift (7a-7p)", urgent: false },
      { date: "Wed", shift: "Night Shift (7p-7a)", urgent: true },
      { date: "Fri", shift: "Evening Coverage (5p-11p)", urgent: false },
      { date: "Sun", shift: "Emergency Coverage", urgent: true }
    ],

    notifications: [
      "New lab results available for Patient #1452",
      "OR 1 maintenance scheduled for tomorrow AM",
      "Patient discharge request needs approval",
      "New message from Dr. Patel in Radiology",
      "Surgery consent form signed for Robert Smith",
      "Inventory alert: Surgical gloves low stock"
    ]
  }
};