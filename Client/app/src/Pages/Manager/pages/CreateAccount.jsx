import React, { useState } from "react";
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";
import api from "../../../services/axios";
import { toast } from "react-toastify";
import "./CreateAccount.css";

export default function CreateAccountUI() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    let { name, value } = e.target;

    if (name === "panNo") value = value.toUpperCase();
    if (["aadharNo", "contactNo", "pincode"].includes(name)) {
      value = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [name]: value });
  };

  /* ================= VALIDATIONS ================= */
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      contactNo,
      password,
      dateOfBirth,
      gender,
      aadharNo,
      panNo,
      completeAddress,
      city,
      state,
      pincode,
    } = formData;

    if (!firstName.trim()) return toast.error("First name is required"), false;
    if (!lastName.trim()) return toast.error("Last name is required"), false;

    if (!email.trim()) return toast.error("Email is required"), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Invalid email format"), false;

    if (!contactNo.trim())
      return toast.error("Contact number is required"), false;
    if (!/^[0-9]{10}$/.test(contactNo))
      return toast.error("Contact number must be 10 digits"), false;

    if (!password) return toast.error("Password is required"), false;
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters"), false;

    if (!dateOfBirth)
      return toast.error("Date of birth is required"), false;
    if (new Date(dateOfBirth) >= new Date())
      return toast.error("Date of birth must be in the past"), false;

    if (!gender) return toast.error("Please select gender"), false;

    if (!aadharNo.trim())
      return toast.error("Aadhar number is required"), false;
    if (!/^[0-9]{12}$/.test(aadharNo))
      return toast.error("Aadhar number must be 12 digits"), false;

    if (!panNo.trim()) return toast.error("PAN number is required"), false;
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNo))
      return toast.error("Invalid PAN format (ABCDE1234F)"), false;

    if (!completeAddress.trim())
      return toast.error("Complete address is required"), false;
    if (!city.trim()) return toast.error("City is required"), false;
    if (!state.trim()) return toast.error("State is required"), false;

    if (!pincode.trim())
      return toast.error("Pincode is required"), false;
    if (!/^[0-9]{6}$/.test(pincode))
      return toast.error("Pincode must be 6 digits"), false;

    return true;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await api.post("/manager/create-customer", formData);
      toast.success("Customer account created successfully 🎉");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      // ✅ UNIVERSAL ERROR HANDLING (VERY IMPORTANT)
      const message =
        err?.response?.data?.message || // normal backend JSON
        err?.response?.data ||          // plain string response
        err?.data?.message ||           // axios interceptor case
        err?.message ||                 // JS error
        "Failed to create customer account";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container-fluid">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div className="success-circle">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h4 className="fw-bold mt-3">Account Created</h4>
            <p className="text-muted">
              Customer account created successfully
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="mb-4 mt-4">
        <h4 className="fw-bold">Create Customer Account</h4>
        <p className="text-muted">
          Enter customer details to create a new account
        </p>
      </div>

      <div className="card border-0 rounded-3 p-5 shadow-sm">
        <h6 className="fw-bold mb-4">
          <UserPlus size={18} className="me-2" />
          Customer Information
        </h6>

        <div className="row g-3">
          <Input icon={<User size={16} />} label="First Name" name="firstName" onChange={handleChange} />
          <Input icon={<User size={16} />} label="Last Name" name="lastName" onChange={handleChange} />
          <Input type="date" label="Date of Birth" name="dateOfBirth" onChange={handleChange} />
          <Select label="Gender" name="gender" onChange={handleChange} />
          <Input icon={<Phone size={16} />} label="Mobile Number" name="contactNo" onChange={handleChange} />
          <Input icon={<Lock size={16} />} type="password" label="Password" name="password" onChange={handleChange} />

          <Input icon={<Mail size={16} />} type="email" label="Email" name="email" onChange={handleChange} />
          <Input icon={<FileText size={16} />} label="Aadhar Number" name="aadharNo" onChange={handleChange} />
          <Input icon={<FileText size={16} />} label="PAN Number" name="panNo" onChange={handleChange} />

          <Input icon={<MapPin size={16} />} label="Complete Address" name="completeAddress" onChange={handleChange} />
          <Input label="City" name="city" onChange={handleChange} />
          <Input label="State" name="state" onChange={handleChange} />
          <Input label="Pin Code" name="pincode" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <button
            className="btn btn-primary w-100 py-3 fw-semibold gradient-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            <UserPlus size={18} className="me-2" />
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========== Reusable Inputs ========== */

const Input = ({ label, icon, type = "text", name, onChange }) => (
  <div className="col-md-4">
    <label className="form-label fw-semibold">
      {icon && <span className="me-2">{icon}</span>}
      {label}
    </label>
    <input
      type={type}
      name={name}
      className="form-control rounded-2"
      onChange={onChange}
    />
  </div>
);

const Select = ({ label, name, onChange }) => (
  <div className="col-md-4">
    <label className="form-label fw-semibold">{label}</label>
    <select
      name={name}
      className="form-select rounded-2"
      onChange={onChange}
    >
      <option value="">Select</option>
      <option value="MALE">Male</option>
      <option value="FEMALE">Female</option>
    </select>
  </div>
);
