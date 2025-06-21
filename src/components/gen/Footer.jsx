// src/components/Footer.jsx
import React from 'react';
import { AboutUs, Careers, PrivacyPolicy } from './NavItems';
import './SurgeryPage.css'

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-col footer-col-logo">
                        <img
                            src="https://images-platform.99static.com/GiphEaEGEuJIzS3uK9ef05VVevo=/263x1107:1416x2260/500x500/top/smart/99designs-contests-attachments/135/135540/attachment_135540270"
                            alt="elehealth"
                        />
                    </div>

                    <div className="footer-col footer-col-about">
                        <h4>About</h4>
                        <ul>
                            <li><AboutUs /></li>
                            <li>
                                <a href="/annual-checkup" className="footer-link annual-checkup">
                                    Annual Checkup
                                </a>
                            </li>
                            <li>
                                <a href="/blog" className="footer-link blog">
                                    Blog
                                </a>
                            </li>
                            <li><Careers /></li>
                        </ul>
                    </div>

                    <div className="footer-col footer-col-services">
                        <h4>Get A Diagnosis</h4>
                        <ul>
                            <li>
                                <a href="/diagnosis" className="footer-link diagnosis">
                                    Get A Diagnosis
                                </a>
                            </li>
                            <li>
                                <a href="/how-it-works" className="footer-link how-it-works">
                                    How it works
                                </a>
                            </li>
                            <li><PrivacyPolicy /></li>
                            <li>
                                <a href="/faq" className="footer-link faq">
                                    FAQ’s
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col footer-col-insurances">
                        <h4>Top Insurances</h4>
                        <ul>
                            <li>
                                <a href="/insurances/aetna" className="footer-link aetna">
                                    Aetna
                                </a>
                            </li>
                            <li>
                                <a href="/insurances/health-net" className="footer-link health-net">
                                    Health Net
                                </a>
                            </li>
                            <li>
                                <a href="/insurances/health-plan" className="footer-link health-plan">
                                    Health Plan
                                </a>
                            </li>
                            <li>
                                <a href="/insurances/blue-shield" className="footer-link blue-shield">
                                    Blue Shield
                                </a>
                            </li>
                            <li>
                                <a href="/insurances/view-more" className="footer-link view-more">
                                    View More
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col footer-col-social">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="https://facebook.com" className="social-icon facebook">F</a>
                            <a href="https://twitter.com" className="social-icon twitter">T</a>
                            <a href="https://linkedin.com" className="social-icon linkedin">in</a>
                            <a href="https://instagram.com" className="social-icon instagram">IG</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span className="footer-copy">All rights reserved by WPDeveloper 2025</span>
                    <div className="footer-policy-links">
                        <PrivacyPolicy />
                        <a href="/terms" className="footer-link bottom-terms">
                            Terms &amp; Conditions
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}
