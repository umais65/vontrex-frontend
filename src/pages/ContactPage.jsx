import React, { useState } from 'react';
import '../assets/css/pages.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would handle the API submission
        console.log("Form Submitted", formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Contact Us</h1>
                <p>We're here to help. Reach out with any questions or concerns.</p>
            </div>

            <div className="page-content contact-content">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <div className="info-block">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h3>Office</h3>
                                <p>52250 Hafizabad road, Grw, Pakistan</p>
                            </div>
                        </div>
                        <div className="info-block">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h3>Email</h3>
                                <p>support@vontrex.com</p>
                                <p>sales@vontrex.com</p>
                            </div>
                        </div>
                        <div className="info-block">
                            <i className="fas fa-phone-alt"></i>
                            <div>
                                <h3>Phone / WhatsApp</h3>
                                <p>03368884744</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <h2>Send a Message</h2>
                        {submitted ? (
                            <div className="success-message">
                                <i className="fas fa-check-circle" style={{ color: 'var(--success-color)', fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
                                <h3>Message Sent Successfully!</h3>
                                <p>Thank you for reaching out. Our support team will respond within 24 hours.</p>
                                <button className="btn-secondary" onClick={() => setSubmitted(false)} style={{ marginTop: '1rem' }}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">FullName</label>
                                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} placeholder="Order Inquiry" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange} placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-100">Send Message</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
