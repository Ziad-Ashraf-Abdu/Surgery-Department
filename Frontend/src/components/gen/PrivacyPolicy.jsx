import React from 'react';
import './SurgeryPage.css';

export default class PrivacyPolicyPage extends React.Component {
    render() {
        return (
            <div className="privacy-page">
                <h1>Privacy Policy</h1>
                <section>
                    <h2>Introduction</h2>
                    <p>We respect your privacy and are committed to protecting your personal information.</p>
                </section>
                <section>
                    <h2>Information We Collect</h2>
                    <ul>
                        <li>Personal identification (name, email, phone)</li>
                        <li>Usage data (pages visited, time spent)</li>
                        <li>Cookies and tracking technologies</li>
                    </ul>
                </section>
                <section>
                    <h2>How We Use Your Information</h2>
                    <p>We use your data to improve our services, communicate with you, and ensure compliance.</p>
                </section>
                <section>
                    <h2>Third-Party Sharing</h2>
                    <p>We do not sell your data but may share with service providers under NDA.</p>
                </section>
                <section>
                    <h2>Your Rights</h2>
                    <p>You can request access, correction, or deletion of your data at any time.</p>
                </section>
                <section>
                    <h2>Contact Us</h2>
                    <p>Email: privacy@example.com | Phone: 1-800-123-4567</p>
                </section>
            </div>
        );
    }
}
