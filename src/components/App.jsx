import React from "react";
import PatientHP from "./patientHP";
import DoctorHP from "./doctorHP";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./sign in/SignIn";
import SignUp from "./sign up/SignUp";

export default function App() {
  return (
    // <div>
    //   {/* Pass data via props */}
    //   {/*<PatientHP user={patientUser} />*/}
    //     <SignIn/>
    //   <div className="h-12" />
    //   {/* <DoctorHP user={doctorUser} /> */}
    // </div>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign up" element={<SignUp />} />
              <Route path="/doctor home page" element={<DoctorHP />} />
              <Route path="/patient home page" element={<PatientHP />} />
          </Routes>
      </BrowserRouter>
  );
}
