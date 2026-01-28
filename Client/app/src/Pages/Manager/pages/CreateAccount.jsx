import { useState } from "react";
import StatsCards from "../components/StatsCards";
import api from "../../../services/axios";

export default function CreateAccount() {
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
    } catch (error) {
      console.error(error);
      alert("Failed to create customer account");
    }
  };

  return (
    <div className="content">
      <h5 className="mb-3">Dashboard Overview</h5>
      <StatsCards />

      <div className="card p-4 mt-3">
        <h5 className="mb-1">Create New Account</h5>
        <small className="text-muted">Create a new customer account with complete KYC</small>
        <hr className="my-3" />

        {/* Personal Information */}
        <h6 className="mb-3">Personal Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">First Name</label>
            <input className="form-control" name="firstName" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Last Name</label>
            <input className="form-control" name="lastName" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name="dateOfBirth" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Gender</label>
            <select className="form-select" name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Mobile Number</label>
            <input className="form-control" name="contactNo" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} />
          </div>
        </div>

        {/* Contact & Identity */}
        <h6 className="mb-3">Contact & Identity</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Aadhar Number</label>
            <input className="form-control" name="aadharNo" onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">PAN Number</label>
            <input className="form-control" name="panNo" onChange={handleChange} />
          </div>
        </div>

        {/* Address */}
        <h6 className="mb-3">Address</h6>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Complete Address</label>
            <input className="form-control" name="completeAddress" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">City</label>
            <input className="form-control" name="city" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <input className="form-control" name="state" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Pin Code</label>
            <input className="form-control" name="pincode" onChange={handleChange} />
          </div>
        </div>

        <div className="mt-4 text-end">
          <button className="btn btn-dark" onClick={handleSubmit}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
