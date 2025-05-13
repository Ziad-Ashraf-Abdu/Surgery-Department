import React, { useState, useEffect } from 'react';
import {
    PrivacyPolicy,
    Covid19,
    FindDoctor,
    AllLocations,
    GetCare,
    PatientsVisitors,
    AboutUs,
    Donate,
    Careers,
    MyChartButton
} from './gen/NavItems';
import Footer from './gen/Footer';
import './gen/SurgeryPage.css';


function SurgeryDepartmentPage() {
    const goTo = (url) => window.location.href = url;

    const handleDoctorSearch = (e) => {
        e.preventDefault();
        const { name, language, zip } = e.target.elements;
        goTo(`/find-doctor?name=${encodeURIComponent(name.value)}&lang=${language.value}&zip=${zip.value}`);
    };

    // Cookie modal state
    const [showCookie, setShowCookie] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('cookieAccepted')) {
            setShowCookie(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieAccepted', 'true');
        setShowCookie(false);
    };

    return (
        <div className="page-container">
            {/* Cookie Modal */}
            {showCookie && (
                <div className="cookie-modal-overlay">
                    <div className="cookie-modal">
                        <p>
                            We use cookies to improve your experience on our site. Please accept our&nbsp;
                            <PrivacyPolicy />.
                        </p>
                        <button className="btn cookie-accept" onClick={acceptCookies}>
                            Accept
                        </button>
                    </div>
                </div>
            )}

            {/* Top contact & auth bar */}
            <div className="top-contact-bar">
                <div className="contact-items">
                    <button onClick={() => goTo('tel:1-800-123-4567')} className="contact-btn">
                        📞 Call for an appointment
                    </button>
                    <button onClick={() => goTo('/telehealth')} className="contact-btn">
                        💬 Talk to a Doctor Now
                    </button>
                    <button onClick={() => goTo('/appointment')} className="contact-btn">
                        📅 Make an Appointment
                    </button>
                </div>
                <div className="rights-items">
                    <MyChartButton />
                    <button className="btn login-btn" onClick={() => goTo('/sign-in')}>
                        Login
                    </button>
                    <button className="btn signup-btn" onClick={() => goTo('/sign-up')}>
                        Sign Up
                    </button>
                    <select className="language-select" onChange={e => goTo(`?lang=${e.target.value}`)}>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="zh">中文</option>
                    </select>
                </div>
            </div>

            {/* Main navigation + logo */}
            <nav className="main-nav">
                <div className="nav-left">
                    <div className="logo">
                        <svg
                            width="260"
                            height="40"
                            viewBox="0 0 200 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="#3D90D7" d="m.787 12.567 6.055-2.675 3.485 2.006.704 6.583-4.295-.035.634-4.577-.74-.422-3.625 2.817-2.218-3.697Z"/>
                            <path fill="#7AC6D2" d="m10.714 11.616 5.352 3.908 2.112-3.767-4.295-1.725v-.845l4.295-1.76-2.112-3.732-5.352 3.908v4.013Z"/>
                            <path fill="#B5FCCD" d="m10.327 7.286.704-6.583-4.295.07.634 4.577-.74.422-3.66-2.816L.786 6.617l6.055 2.676 3.485-2.007Z"/>
                            <text x={25} y={16} fill="#3D90D7" fontSize="16" fontWeight="bold">
                                Surgery Department
                            </text>
                        </svg>
                    </div>
                </div>
                <div className="nav-center">
                    <Covid19 />
                    <FindDoctor />
                    <AllLocations />
                    <GetCare />
                    <PatientsVisitors />
                    <AboutUs />
                    <Donate />
                    <Careers />
                </div>
                <div className="nav-right">
                    <button className="search-icon" onClick={() => goTo('/search')}>🔍</button>
                    <button className="hamburger" onClick={() => document.body.classList.toggle('nav-open')}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <header className="hero">
                <div className="hero-overlay" />
                <div className="hero-text">
                    <h1>We Keep You Healthy</h1>
                    <p>The nation’s largest municipal health system empowering you to live your healthiest life.</p>
                </div>
            </header>

            {/* Find a Doctor */}
            <section className="search-panel">
                <form onSubmit={handleDoctorSearch}>
                    <input name="name" type="text" placeholder="Name Or Specialty" className="search-input" required />
                    <select name="language" className="search-input">
                        <option value="en">Language</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="zh">中文</option>
                    </select>
                    <input name="zip" type="text" placeholder="Zip Address" className="search-input" required />
                    <button type="submit" className="btn action-btn">Search</button>
                </form>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default SurgeryDepartmentPage;
