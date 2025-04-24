import React from "react";
import PatientHP from "./patientHP";
import DoctorHP from "./doctorHP";
import { patientUser, doctorUser } from "../data/sampleData";

export default function App() {
  return (y
    <div>
      {/* Pass data via props */}
      <PatientHP user={patientUser} />
      <div className="h-12" />
{/*       <DoctorHP user={doctorUser} /> */}
    </div>
  );
}
