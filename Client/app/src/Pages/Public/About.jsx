import React, { useEffect } from "react";
import "./page-content.css";
import { Award, Users, Globe, TrendingUp } from "lucide-react";

export const About = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#f8f9fa";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <h1 className="page-title">About Bankify</h1>
        <p className="page-subtitle">
          Revolutionizing Banking for Everyone
        </p>
      </section>

      {/* Main Content */}
      <div className="page-content">
        <section className="content-section">
          <div className="section-grid">
            <div className="text-content">
              <h2>Our Mission</h2>
              <p>
                At Bankify, we believe that banking should be simple, secure, and accessible to everyone. 
                We're committed to providing innovative financial solutions that empower our customers to 
                manage their money with confidence.
              </p>
              <p>
                Founded in 2024, Bankify has grown to serve thousands of customers worldwide. Our team of 
                dedicated professionals works tirelessly to deliver excellence in every interaction.
              </p>
            </div>
            <div className="image-content">
              <div className="placeholder-image">
                <Globe size={100} strokeWidth={1} />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Award size={40} />
              </div>
              <h3>Integrity</h3>
              <p>
                We operate with the highest standards of honesty and ethical behavior in all our dealings.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users size={40} />
              </div>
              <h3>Customer First</h3>
              <p>
                Your satisfaction and success are at the heart of everything we do. Your needs guide our innovation.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <TrendingUp size={40} />
              </div>
              <h3>Innovation</h3>
              <p>
                We constantly evolve and improve our services to stay ahead of industry standards.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
