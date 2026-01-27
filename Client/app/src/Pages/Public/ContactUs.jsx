import React, { useEffect, useState } from 'react'
import "./page-content.css";
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#f8f9fa";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">
          We'd Love to Hear From You
        </p>
      </section>

      <div className="page-content">
        <section className="contact-section">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have questions? We're here to help!</p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon"style={{background:"black"}}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p><a href="mailto:support@bankify.com">support@bankify.com</a></p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon" style={{background:"black"}}>
                    <Phone size={24}  />
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <p><a href="tel:+911234567890">+91 1234 567 890</a></p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon" style={{background:"black"}}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3>Address</h3>
                    <p>123 Banking Street, Finance City<br />State, Country - 123456</p>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Contact Form */}
            {/* <div className="contact-form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
}
