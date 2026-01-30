import { useState } from "react";
import StatsCards from "../components/StatsCards";
import api from "../../../services/axios";
import { 
  User, Mail, Phone, Lock, Calendar, MapPin, CreditCard, 
  Check, ArrowRight, ArrowLeft, Sparkles 
} from "lucide-react";
import "./CreateAccount.css";

export default function CreateAccount() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    aadharNo: "",
    panNo: "",
    completeAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/manager/create-customer", formData);
      alert("Customer account created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        aadharNo: "",
        panNo: "",
        completeAddress: "",
        city: "",
        state: "",
        pincode: "",
      });
      setCurrentStep(1);
    } catch (error) {
      console.error(error);
      alert("Failed to create customer account");
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Identity & Contact", icon: CreditCard },
    { number: 3, title: "Address Details", icon: MapPin },
  ];

  return (
    <div className="wizard-container">
      <h5 className="wizard-page-title">Dashboard Overview</h5>
      <StatsCards />

      <div className="wizard-card">
        {/* Wizard Header */}
        <div className="wizard-header">
          <div className="wizard-title-section">
            <div className="wizard-icon-wrapper">
              <Sparkles className="wizard-sparkle" />
            </div>
            <div>
              <h2 className="wizard-title">Create New Account</h2>
              <p className="wizard-subtitle">Set up a customer account with complete KYC verification</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="wizard-steps">
            {steps.map((step, index) => (
              <div key={step.number} className="step-item-wrapper">
                <div className={`step-item ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
                  <div className="step-circle">
                    {currentStep > step.number ? (
                      <Check size={20} />
                    ) : (
                      <step.icon size={20} />
                    )}
                  </div>
                  <div className="step-label">
                    <span className="step-number">Step {step.number}</span>
                    <span className="step-title">{step.title}</span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`step-connector ${currentStep > step.number ? 'completed' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="wizard-body">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="form-step" key="step1">
              <div className="step-header">
                <User className="step-icon" size={28} />
                <div>
                  <h3 className="step-heading">Personal Information</h3>
                  <p className="step-description">Enter the customer's basic details</p>
                </div>
              </div>

              <div className="form-fields">
                <div className="field-row">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      First Name
                    </label>
                    <input
                      className="form-input"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Last Name
                    </label>
                    <input
                      className="form-input"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={16} />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Gender
                    </label>
                    <select
                      className="form-input"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>
                </div>

                <div className="field-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={16} />
                      Mobile Number
                    </label>
                    <input
                      className="form-input"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Lock size={16} />
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-input"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create strong password"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Identity & Contact */}
          {currentStep === 2 && (
            <div className="form-step" key="step2">
              <div className="step-header">
                <CreditCard className="step-icon" size={28} />
                <div>
                  <h3 className="step-heading">Identity & Contact</h3>
                  <p className="step-description">Provide KYC and contact information</p>
                </div>
              </div>

              <div className="form-fields">
                <div className="form-group full-width">
                  <label className="form-label">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="field-row">
                  <div className="form-group">
                    <label className="form-label">
                      <CreditCard size={16} />
                      Aadhar Number
                    </label>
                    <input
                      className="form-input"
                      name="aadharNo"
                      value={formData.aadharNo}
                      onChange={handleChange}
                      placeholder="XXXX XXXX XXXX"
                      maxLength="12"
                    />
                    <span className="field-hint">12-digit Aadhar number</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <CreditCard size={16} />
                      PAN Number
                    </label>
                    <input
                      className="form-input"
                      name="panNo"
                      value={formData.panNo}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                      maxLength="10"
                      style={{ textTransform: 'uppercase' }}
                    />
                    <span className="field-hint">10-character PAN number</span>
                  </div>
                </div>

                <div className="kyc-notice">
                  <div className="notice-icon">
                    <CreditCard size={20} />
                  </div>
                  <div className="notice-content">
                    <h4>KYC Verification Required</h4>
                    <p>Please ensure all identity documents are valid and match the customer's records</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {currentStep === 3 && (
            <div className="form-step" key="step3">
              <div className="step-header">
                <MapPin className="step-icon" size={28} />
                <div>
                  <h3 className="step-heading">Address Details</h3>
                  <p className="step-description">Complete residential address information</p>
                </div>
              </div>

              <div className="form-fields">
                <div className="form-group full-width">
                  <label className="form-label">
                    <MapPin size={16} />
                    Complete Address
                  </label>
                  <textarea
                    className="form-input form-textarea"
                    name="completeAddress"
                    value={formData.completeAddress}
                    onChange={handleChange}
                    placeholder="House/Flat No., Street, Locality"
                    rows="3"
                  />
                </div>

                <div className="field-row">
                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={16} />
                      City
                    </label>
                    <input
                      className="form-input"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={16} />
                      State
                    </label>
                    <input
                      className="form-input"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={16} />
                      PIN Code
                    </label>
                    <input
                      className="form-input"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN"
                      maxLength="6"
                    />
                  </div>
                </div>

                <div className="summary-card">
                  <h4 className="summary-title">Account Summary</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Name</span>
                      <span className="summary-value">{formData.firstName} {formData.lastName || "..."}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Email</span>
                      <span className="summary-value">{formData.email || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Mobile</span>
                      <span className="summary-value">{formData.contactNo || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">City</span>
                      <span className="summary-value">{formData.city || "Not provided"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="wizard-footer">
          <button
            className="wizard-btn btn-secondary"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          <div className="step-indicator">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep < 3 ? (
            <button className="wizard-btn btn-primary" onClick={nextStep}>
              Next Step
              <ArrowRight size={18} />
            </button>
          ) : (
            <button className="wizard-btn btn-success" onClick={handleSubmit}>
              <Check size={18} />
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
