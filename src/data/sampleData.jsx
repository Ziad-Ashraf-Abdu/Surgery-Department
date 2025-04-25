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
