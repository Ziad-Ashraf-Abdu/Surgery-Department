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
  photo: "https://via.placeholder.com/150",
  contact: {
    email: "ayesha.k@hospital.com",
    phone: "+919812345678",
    office: "Room 402, Cardio Wing",
  },
  todaySchedule: [
    { time: "09:00 AM", patient: "Neil S." },
    { time: "10:30 AM", patient: "Maria L." },
    { time: "01:00 PM", patient: "John D." },
    { time: "03:00 PM", patient: "Sara P." },
  ],
  notifications: ["2 pending lab reviews", "1 new message from Admin"],
  patientCount: 20,
};
