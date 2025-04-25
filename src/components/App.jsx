import React from "react";
import PatientHP from "./patientHP.jsx";
import DoctorHP from "./doctorHP";
import { patientUser, doctorUser } from "../data/sampleData";
import SignIn from "./sign in/SignIn";

export default function App() {
  return (
    <div>
      {/* Pass data via props */}
      {/*<PatientHP user={patientUser} />*/}
        <SignIn/>
      <div className="h-12" />
{/*       <DoctorHP user={doctorUser} /> */}
    </div>
  );
}
