import { useEffect, useState, useRef } from "react";
import StatsCards from "../components/StatsCards";
import api from "../services/axios";
import { sendLog } from "../../../services/loggerService";

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

  const loggedRef = useRef(false);

  useEffect(() => {
    if (!loggedRef.current) {
      sendLog(
        "MANAGER_DASHBOARD_ACCESSED",
        sessionStorage.getItem("userId") || "Unknown Admin"
      );
      loggedRef.current = true;
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* 🔹 SIMPLE VALIDATION */
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

    if (
      !firstName ||
      !lastName ||
      !email ||
      !contactNo ||
      !password ||
      !dateOfBirth ||
      !gender ||
      !aadharNo ||
      !panNo ||
      !completeAddress ||
      !city ||
      !state ||
      !pincode
    ) {
      alert("All fields are required");
      return false;
    }

    if (!email.includes("@")) {
      alert("Invalid email address");
      return false;
    }

    if (contactNo.length !== 10) {
      alert("Mobile number must be 10 digits");
      return false;
    }

    if (aadharNo.length !== 12) {
      alert("Aadhar number must be 12 digits");
      return false;
    }

    if (panNo.length !== 10) {
      alert("PAN number must be 10 characters");
      return false;
    }

    if (pincode.length !== 6) {
      alert("Pincode must be 6 digits");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

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
    } catch (error) {
      console.error(error);
      alert("Failed to create customer account");
    }
  };

  return (
    <div className="container mt-4">
      <h5>Dashboard Overview</h5>
      <StatsCards />

      <div className="card mt-4 p-4 shadow-sm">
        <h4 className="mb-3">Create Customer Account</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile Number</label>
            <input
              className="form-control"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Aadhar Number</label>
            <input
              className="form-control"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              maxLength="12"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">PAN Number</label>
            <input
              className="form-control"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              maxLength="10"
              style={{ textTransform: "uppercase" }}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Complete Address</label>
            <textarea
              className="form-control"
              name="completeAddress"
              value={formData.completeAddress}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">City</label>
            <input
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <input
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Pincode</label>
            <input
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength="6"
            />
          </div>

          <div className="col-12 text-end mt-3">
            <button className="btn btn-success" onClick={handleSubmit}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
