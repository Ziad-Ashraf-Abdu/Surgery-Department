import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SurgeryDepartmentPage from './SurgeryDepartment';
import SignIn from './sign in/SignIn';
import SignUp from './sign up/SignUp';
import DoctorHP from './doctorHP';
import PatientHP from './patientHP';
import Dashboard from './Dashboard';

import {
    Covid19, FindDoctor, AllLocations, GetCare, PatientsVisitors,
    AboutUs, Donate, Careers
} from './gen/NavItems';
import PrivacyPolicyPage from "./gen/PrivacyPolicy";
// Placeholder page components:
const Placeholder = ({ title }) => <div style={{ padding: 40 }}><h2>{title}</h2></div>;

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SurgeryDepartmentPage />} />

                {/* Auth */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                {/* Homepages */}
                <Route path="/doctor-home-page" element={<DoctorHP />} />
                <Route path="/patient-home-page" element={<PatientHP />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* NavItem routes */}
                <Route path="/covid"             element={<Placeholder title="COVID-19 Info" />} />
                <Route path="/find-doctor"       element={<Placeholder title="Find a Doctor" />} />
                <Route path="/locations"         element={<Placeholder title="All Locations" />} />
                <Route path="/get-care"          element={<Placeholder title="Get Care" />} />
                <Route path="/patients-visitors" element={<Placeholder title="Patients & Visitors" />} />
                <Route path="/about-us"          element={<AboutUs />} />
                <Route path="/donate"            element={<Donate />} />
                <Route path="/careers"           element={<Careers />} />
                <Route path="/privacy-policy"    element={<PrivacyPolicyPage />} />

                {/* Fallback */}
                <Route path="*" element={<div style={{ padding: 40 }}><h2>Page Not Found</h2></div>} />
            </Routes>
        </BrowserRouter>
    );
}
