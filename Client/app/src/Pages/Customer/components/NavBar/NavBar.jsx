import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import {
  CircleUser,
  LogOut,
  Home,
  Send,
  FileText,
  CreditCard,
  Bell,
  Settings,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState();

  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [name, setName] = useState();
  const [contactNo, setContactNo] = useState();
  const [dob, setDob] = useState();
  const [aadharNo, setAadharNo] = useState();
  const [panNo, setPanNo] = useState();
  const [completeAddress, setCompleteAddress] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.warn("New Password and Confirm Password do not match!");
      return;
    }

    const body = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    const responseData = await axios.put(
      `http://localhost:8080/bankify/customers/update-password/${sessionStorage.getItem("userId")}`,
      body,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      },
    );

   

    if (responseData.data) {
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Close the modal
      const closeButton =
        document
          .querySelector('[data-bs-target="#changePasswordModal"]')
          ?.parentElement?.querySelector(".btn-close") ||
        document.querySelector("#changePasswordModal .btn-close");
      if (closeButton) closeButton.click();
      // Alternative: use Bootstrap's modal API
      const modal = document.getElementById("changePasswordModal");
      if (modal) {
        const bsModal = new window.bootstrap.Modal(modal);
        bsModal.hide();
      }
    }
    console.log(responseData);
  };

   const editDetails = async () => {
      const body = {
        name: name,
        contactNo: contactNo,
        dob: dob,
        aadharNo: aadharNo,
        panNo: panNo,
        completeAddress: completeAddress,
        state: state,
        city: city,
        pincode: pincode,
      };

      const responseEdit = await axios.put(
        `http://localhost:8080/bankify/customers/edit-customer/${sessionStorage.getItem("userId")}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      if(responseEdit.data.status==="Success"){
        toast.success("Profile updated successfully!");
        const modal = document.getElementById("editProfileModal");
        if (modal) {
          const closeButton = modal.querySelector(".btn-close");
          if (closeButton) {
            closeButton.click();
          }
        }
        // Refresh the data
        fetchData();
      }
    };
  const fetchData = async () => {
    const data = await axios.get(
      `http://localhost:8080/bankify/customers/get-customer/${sessionStorage.getItem("userId")}`,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      },
    );
    setResponseData(data.data);
  };

  useEffect(() => {
    if(sessionStorage.getItem("token")===null||sessionStorage.getItem("token")===""){
      navigate("/");
    } else {
      fetchData();
    }
  }, []);

  const logoutHandler = () => {
    sessionStorage.clear();
    navigate("/");
  };
  // Initialize form fields when responseData changes
  useEffect(() => {
    if (responseData) {
      setName(responseData.name || "");
      setContactNo(responseData.contactNo || "");
      setDob(responseData.dob || "");
      setAadharNo(responseData.aadharNo || "");
      setPanNo(responseData.panNo || "");
      setCompleteAddress(responseData.completeAddress || "");
      setState(responseData.state || "");
      setCity(responseData.city || "");
      setPincode(responseData.pincode || "");
    }
  }, [responseData]);

  console.log(responseData);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      {/* Sidebar - Fixed */}
      <div
        className="sidebar bg-white border-end d-flex flex-column"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: "260px",
          boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        {/* Logo Section */}
        <div className="d-flex align-items-center p-4 border-bottom">
          <div
            className="rounded-circle d-flex justify-content-center align-items-center text-white me-3"
            style={{
              width: "45px",
              height: "45px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <span className="fw-bold fs-5">B</span>
          </div>
          <div>
            <h6 className="fw-bold mb-0 text-dark">Bankify</h6>
            <small className="text-muted">Banking Portal</small>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="nav flex-column p-3 gap-2 flex-grow-1">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `nav-link d-flex align-items-center px-3 py-2 rounded-2 text-decoration-none ${
                isActive ? "active" : "text-secondary"
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? "rgba(102, 126, 234, 0.1)" : "transparent",
              color: isActive ? "#667eea" : "#6c757d",
            })}
          >
            <Home size={18} className="me-2" />
            Dashboard
          </NavLink>

          <NavLink
            to="transaction"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center px-3 py-2 rounded-2 text-decoration-none ${
                isActive ? "active" : "text-secondary"
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? "rgba(102, 126, 234, 0.1)" : "transparent",
              color: isActive ? "#667eea" : "#6c757d",
            })}
          >
            <FileText size={18} className="me-2" />
            Transactions
          </NavLink>

          <NavLink
            to="fund-transfer"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center px-3 py-2 rounded-2 text-decoration-none ${
                isActive ? "active" : "text-secondary"
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? "rgba(102, 126, 234, 0.1)" : "transparent",
              color: isActive ? "#667eea" : "#6c757d",
            })}
          >
            <Send size={18} className="me-2" />
            Fund Transfer
          </NavLink>

          <NavLink
            to="loan"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center px-3 py-2 rounded-2 text-decoration-none ${
                isActive ? "active" : "text-secondary"
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? "rgba(102, 126, 234, 0.1)" : "transparent",
              color: isActive ? "#667eea" : "#6c757d",
            })}
          >
            <CreditCard size={18} className="me-2" />
            Loans
          </NavLink>
        </nav>

        <div className="p-3 mb-3 border-top">
          <button
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center rounded-2 py-2"
            onClick={logoutHandler}
          >
            <LogOut size={18} className="me-2" />
            Logout
          </button>
        </div>
      </div>

      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ marginLeft: "260px" }}
      >
        <div
          className="bg-white border-bottom p-4"
          style={{
            position: "fixed",
            top: 0,
            left: "260px",
            right: 0,
            zIndex: 999,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1 fw-bold text-dark">
                Welcome back! {responseData?.name}
              </h5>
              <small className="text-muted">{dateStr}</small>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-light rounded-circle p-2"
                style={{ width: "45px", height: "45px" }}
              >
                <Bell size={20} className="text-secondary" />
              </button>

              <button
                className="btn btn-light rounded-circle p-2"
                style={{ width: "45px", height: "45px" }}
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                <Settings size={20} className="text-secondary" />
              </button>

              <button
                className="btn btn-light rounded-circle p-2"
                style={{ width: "45px", height: "45px" }}
                data-bs-toggle="modal"
                data-bs-target="#viewProfileModal"
              >
                <CircleUser size={20} className="text-secondary" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="flex-grow-1 p-4"
          style={{
            marginTop: "80px",
            overflowY: "auto",
            height: "calc(100vh - 80px)",
          }}
        >
          <Outlet />
        </div>
      </div>

      <div>
        <div
          className="modal fade"
          id="viewProfileModal"
          tabIndex="-1"
          aria-labelledby="viewProfileLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3 overflow-hidden">
              <div
                className="modal-header border-0 py-4 px-4"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <div className="w-100">
                  <h5
                    className="modal-title text-white fw-bold mb-1"
                    id="viewProfileLabel"
                  >
                    <i className="bi bi-person-circle me-2"></i>Profile
                    Information
                  </h5>
                  <small className="text-white-50">
                    View your account details
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label text-muted small fw-semibold">
                        Full Name
                      </label>
                      <p className="fw-semibold text-dark mb-0">
                        {responseData?.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label text-muted small fw-semibold">
                        Email
                      </label>
                      <p className="fw-semibold text-dark mb-0">
                        {responseData?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label text-muted small fw-semibold">
                        Date of Birth
                      </label>
                      <p className="fw-semibold text-dark mb-0">
                        {responseData?.dob}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label text-muted small fw-semibold">
                        Contact Number
                      </label>
                      <p className="fw-semibold text-dark mb-0">
                        {responseData?.contactNo}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label text-muted small fw-semibold">
                        Aadhar Number
                      </label>
                      <p className="fw-semibold text-dark mb-0">
                        {responseData?.aadharNo}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-0">
                      <label className="form-label text-muted small fw-semibold">
                        PAN Number
                      </label>
                      <p className="fw-semibold text-dark mb-0">
                        {responseData?.panNo}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-0">
                      <label className="form-label text-muted small fw-semibold">
                        Account Number
                      </label>
                      <p className="fw-semibold text-dark mb-0">
                        {responseData?.accountNo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-top-0 p-4 bg-light">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  data-bs-dismiss="modal"
                  style={{ borderRadius: "8px", fontWeight: "500" }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn text-white px-4"
                  data-bs-toggle="modal"
                  data-bs-target="#changePasswordModal"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "8px",
                    fontWeight: "500",
                    border: "none",
                  }}
                >
                  <i className="bi bi-lock me-2"></i>Update Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Modal */}
        <div
          className="modal fade"
          id="changePasswordModal"
          tabIndex="-1"
          aria-labelledby="changePasswordLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3 overflow-hidden">
              <div
                className="modal-header border-0 py-4 px-4"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <div className="w-100">
                  <h5
                    className="modal-title text-white fw-bold mb-1"
                    id="changePasswordLabel"
                  >
                    <i className="bi bi-shield-lock me-2"></i>Update Password
                  </h5>
                  <small className="text-white-50">
                    Update your password securely
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-4">
                  <label
                    htmlFor="oldPassword"
                    className="form-label fw-semibold text-dark"
                  >
                    <i className="bi bi-lock me-2"></i>Current Password
                  </label>
                  <input
                    id="oldPassword"
                    type="password"
                    className="form-control border-1"
                    placeholder="Enter your current password"
                    style={{ borderRadius: "8px", padding: "10px 12px" }}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <small className="text-muted d-block mt-2">
                    Your password must be at least 8 characters
                  </small>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="form-label fw-semibold text-dark"
                  >
                    <i className="bi bi-lock-fill me-2"></i>New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="form-control border-1"
                    placeholder="Enter your new password"
                    style={{ borderRadius: "8px", padding: "10px 12px" }}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <small className="text-muted d-block mt-2">
                    Must contain uppercase, lowercase, numbers and special
                    characters
                  </small>
                </div>

                <div className="mb-0">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label fw-semibold text-dark"
                  >
                    <i className="bi bi-check-circle me-2"></i>Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="form-control border-1"
                    placeholder="Confirm your new password"
                    style={{ borderRadius: "8px", padding: "10px 12px" }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer border-top-0 p-4 bg-light">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  data-bs-dismiss="modal"
                  style={{ borderRadius: "8px", fontWeight: "500" }}
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  <i className="bi bi-x me-2"></i>Cancel
                </button>
                <button
                  type="button"
                  className="btn text-white px-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "8px",
                    fontWeight: "500",
                    border: "none",
                  }}
                  onClick={updatePassword}
                >
                  <i className="bi bi-check-circle me-2"></i>Update Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="editProfileModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg"
            style={{ maxWidth: "800px", margin: "50px auto" }}
          >
            <div className="modal-content border-0 shadow-lg">
              <div
                className="modal-header border-0 py-3 px-4"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="d-flex flex-column">
                  <h5 className="mb-1 text-white fw-bold">Edit Profile</h5>
                  <small className="text-white-50">
                    Update your personal information
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ filter: "brightness(0) invert(1)" }}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="fullName"
                        className="form-label fw-500 text-dark"
                      >
                        <i className="bi bi-person me-2"></i>Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        className="form-control edit-input border-1"
                        name="fullName"
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="contactNo"
                        className="form-label fw-500 text-dark"
                      >
                        <i className="bi bi-telephone me-2"></i>Contact Number
                      </label>
                      <input
                        id="contactNo"
                        type="number"
                        className="form-control edit-input border-1"
                        name="contactNo"
                        value={contactNo || ""}
                        onChange={(e) => setContactNo(e.target.value)}
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="dob"
                        className="form-label fw-500 text-dark"
                      >
                        <i className="bi bi-calendar me-2"></i>Date Of Birth
                      </label>
                      <input
                        id="dob"
                        type="date"
                        className="form-control edit-input border-1"
                        name="dob"
                        value={dob || ""}
                        onChange={(e) => setDob(e.target.value)}
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="aadharNo"
                        className="form-label fw-500 text-dark"
                      >
                        <i className="bi bi-card-text me-2"></i>Aadhar Number
                      </label>
                      <input
                        id="aadharNo"
                        type="text"
                        className="form-control edit-input border-1"
                        name="aadharNo"
                        value={aadharNo || ""}
                        onChange={(e) => setAadharNo(e.target.value)}
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="panNo"
                        className="form-label fw-500 text-dark"
                      >
                        <i className="bi bi-file-earmark me-2"></i>PAN Number
                      </label>
                      <input
                        id="panNo"
                        type="text"
                        className="form-control edit-input border-1"
                        name="panNo"
                        value={panNo || ""}
                        onChange={(e) => setPanNo(e.target.value)}
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="address"
                    className="form-label fw-500 text-dark"
                  >
                    <i className="bi bi-geo-alt me-2"></i>Address
                  </label>
                  <textarea
                    className="form-control edit-input border-1"
                    id="address"
                    rows="3"
                    name="address"
                    value={completeAddress || ""}
                    onChange={(e) => setCompleteAddress(e.target.value)}
                    style={{ borderRadius: "8px", padding: "10px 12px" }}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="state"
                        className="form-label fw-500 text-dark"
                      >
                        <i className="bi bi-map me-2"></i>State
                      </label>
                      <input
                        id="state"
                        type="text"
                        className="form-control edit-input border-1"
                        value={state || ""}
                        onChange={(e) => setState(e.target.value)}
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="city"
                        className="form-label fw-500 text-dark"
                      >
                        <i className="bi bi-building me-2"></i>City
                      </label>
                      <input
                        id="city"
                        type="text"
                        className="form-control edit-input border-1"
                        value={city || ""}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="pincode"
                    className="form-label fw-500 text-dark"
                  >
                    <i className="bi bi-pin me-2"></i>Pincode
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    className="form-control edit-input border-1"
                    value={pincode || ""}
                    onChange={(e) => setPincode(e.target.value)}
                    style={{ borderRadius: "8px", padding: "10px 12px" }}
                  />
                </div>
              </div>

              <div className="modal-footer border-top-0 pt-0 p-4 bg-light">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  data-bs-dismiss="modal"
                  style={{ borderRadius: "8px", fontWeight: "500" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary px-4"
                  style={{
                    borderRadius: "8px",
                    fontWeight: "500",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                  onClick={editDetails}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
