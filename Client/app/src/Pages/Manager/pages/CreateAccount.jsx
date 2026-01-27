import { useState } from "react";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import api from "../../../services/axios";
import { Services } from './../../Public/Services';

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
      <Header />
      <h5>Dashboard Overview</h5>
      <StatsCards />

      <div className="card p-4">
        <h5>Create New Account</h5>
        <small>Create a new customer account with complete KYC</small>
        <hr />

        <h6>Personal Information</h6>
        <div className="row mb-3">

          <div className="col-md-4 mb-3">
            <label>First Name</label>
            <input className="form-control" name="firstName" onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label>Last Name</label>
            <input className="form-control" name="lastName" onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label>Date of Birth</label>
            <input type="date" className="form-control" name="dateOfBirth" onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label>Gender</label>
            <select className="form-select" name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Mobile Number</label>
            <input className="form-control" name="contactNo" onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label>Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} />
          </div>
        </div>

        <h6>Contact & Identity</h6>
        <div className="row">
          <div className="col-md-4">
            <label>Email</label>
            <input className="form-control" name="email" onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label>Aadhar Number</label>
            <input className="form-control" name="aadharNo" onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label>PAN Number</label>
            <input className="form-control" name="panNo" onChange={handleChange} />
          </div>
        </div>

        <h6 className="mt-3">Address</h6>
        <div className="row">
          <div className="col-md-12 mb-2">
            <label>Complete Address</label>
            <input className="form-control" name="completeAddress" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label>City</label>
            <input className="form-control" name="city" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label>State</label>
            <input className="form-control" name="state" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label>Pin Code</label>
            <input className="form-control" name="pincode" onChange={handleChange} />
          </div>
        </div>

        <div className="mt-4 text-end">
          <button className="btn btn-dark ms-2" onClick={handleSubmit}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
