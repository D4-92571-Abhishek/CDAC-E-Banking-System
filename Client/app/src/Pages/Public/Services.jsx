import React, { useEffect } from 'react';
import "./page-content.css";
import { CreditCard, Send, TrendingUp, Smartphone, Zap, BarChart3 } from 'lucide-react';

export const Services = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#f8f9fa";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const services = [
    {
      icon: <CreditCard size={40} color="white" strokeWidth={1.5} />,
      title: "Account Management",
      description: "Manage your accounts with ease. Real-time balance updates and transaction history at your fingertips."
    },
    {
      icon: <Send size={40} color="white" strokeWidth={1.5} />,
      title: "Fund Transfer",
      description: "Send money instantly to any account. Domestic and international transfers made simple and fast."
    },
    {
      icon: <TrendingUp size={40} color="white" strokeWidth={1.5} />,
      title: "Loan Services",
      description: "Quick loan approval process. Competitive interest rates tailored to your financial profile."
    },
    {
      icon: <Smartphone size={40} color="white" strokeWidth={1.5} />,
      title: "Mobile Banking",
      description: "Bank on the go with our intuitive mobile app. Access all services anytime, anywhere."
    },
    {
      icon: <Zap size={40} color="white" strokeWidth={1.5} />,
      title: "Quick Payments",
      description: "Pay bills, utilities, and invoices instantly. Setup automatic payments for convenience."
    },
    {
      icon: <BarChart3 size={40} color="white" strokeWidth={1.5} />,
      title: "Financial Analytics",
      description: "Gain insights into your spending patterns. Personalized recommendations for better financial health."
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <h1 className="page-title">Our Services</h1>
        <p className="page-subtitle">
          Comprehensive Banking Solutions Designed for You
        </p>
      </section>

      {/* Services Grid */}
      <div className="page-content">
        <section className="services-grid-section">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
