import React, { useEffect } from 'react'
import "./home.css"
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, TrendingUp, Users } from 'lucide-react'

export const Home = () => {
  useEffect(() => {
    // Apply page-specific background
    document.body.style.backgroundColor = "#f8f9fa";

    // Cleanup when leaving the page
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const navigate = useNavigate();
  const login = () => {
    navigate("/loginlogoutpage/login", {
      state: { from: "loginbtn" }
    });
  }
  const register = () => {
    navigate("/loginlogoutpage/register", {
      state: { from: "registerbtn" }
    });
  }

  return (
    <div className='home-page'>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Bankify</h1>
          <p className="hero-subtitle">
            Modern Banking for Your Modern Life. Secure, Fast, and Simple.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="btn-primary"
              onClick={login}
            >
              Login
              <ArrowRight size={20} className="btn-icon" />
            </button>
            <button 
              className="btn-secondary"
              onClick={register}
            >
              Sign Up
              <ArrowRight size={20} className="btn-icon" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-badge">
              <Lock size={20} />
              <span>Bank-Level Security</span>
            </div>
            <div className="trust-badge">
              <Users size={20} />
              <span>Trusted by Thousands</span>
            </div>
            <div className="trust-badge">
              <TrendingUp size={20} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Bankify?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Transfers</h3>
            <p>Send money to anyone, anywhere in seconds with our instant transfer service.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Banking</h3>
            <p>Your funds are protected with military-grade encryption technology.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile First</h3>
            <p>Manage your account anytime, anywhere with our intuitive mobile app.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Loans</h3>
            <p>Get approved for loans instantly with competitive interest rates.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
