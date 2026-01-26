import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { CircleUser } from "lucide-react";
import Customers from "./../../../Admin/pages/Customers/Customers";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const date = new window.Date().toLocaleDateString();

  return (
    <div className="d-flex">
      <div
        className="sidebar bg-white border-end p-3"
        style={{ minHeight: "100vh" }}
      >
        <div className="d-flex align-items-center mb-4">
          <div
            className="rounded-circle bg-dark d-flex justify-content-center align-items-center text-white me-3"
            style={{ width: "38px", height: "38px" }}
          >
            <span className="fs-4">B</span>
          </div>
          <div>
            <h6 className="fw-semibold mb-0 fs-3">Bankify</h6>
            <small className="text-secondary">Customer Portal</small>
          </div>
        </div>

        <nav className="nav flex-column gap-2">
          <NavLink to="" className="nav-link px-3 py-2">
            Dashboard
          </NavLink>

          <NavLink to="transaction" className="nav-link px-3 py-2">
            Transactions
          </NavLink>

          <NavLink to="fund-transfer" className="nav-link px-3 py-2">
            Fund Transfer
          </NavLink>

          {/* <NavLink to="payment" className="nav-link px-3 py-2">
            Receive Payment
          </NavLink> */}

          <NavLink to="loan" className="nav-link px-3 py-2">
            Loan Department
          </NavLink>

          <button
            className="btn btn-dark rounded-0 "
            style={{ marginTop: "20rem" }}
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </nav>
      </div>

      <div className="flex-grow-1 p-4">
        <div className="ps-3 pe-3" style={{ height: "3rem" }}>
          <div className="d-flex justify-content-between align-items-center gap-3">
            <h2>Welcome {} Customer</h2>
            <p>{date}</p>
            <button
              style={{
                background: "none",
                border: "none",
                borderRadius: "50%",
              }}
              data-bs-toggle="modal"
              data-bs-target="#viewProfileModal"
            >
              <CircleUser style={{ height: "3rem", width: "2rem" }} />
            </button>
          </div>
        </div>
        <hr />
        <Outlet />
      </div>

      <div>
        <div
          className="modal fade"
          id="viewProfileModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog d-flex align-items-center h-100 mt-0">
            <div className="modal-content ">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Profile
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Full Name :
                  </label>
                  {} Name
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    E-mail
                  </label>
                  {} Email
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Employee ID
                  </label>
                  {} Customer ID
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Date Of Birth :
                  </label>
                  {} DOB
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Contact Number :
                  </label>
                  {} Phone Number
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Aadhar Number :
                  </label>
                  {} Aadhar Number
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    PAN Number :
                  </label>
                  {} PAN Number
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Account Number :
                  </label>
                  {} Account Number
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#editProfileModal"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="editProfileModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" style={{ maxWidth: "800px", margin: "50px auto" }}>
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 py-3 px-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="d-flex flex-column">
                  <h5 className="mb-1 text-white fw-bold">
                    Edit Profile
                  </h5>
                  <small className="text-white-50">Update your personal information</small>
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
                      <label htmlFor="fullName" className="form-label fw-500 text-dark">
                        <i className="bi bi-person me-2"></i>Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        className="form-control edit-input border-1"
                        name="fullName"
                        value="Abhishek"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="contactNo" className="form-label fw-500 text-dark">
                        <i className="bi bi-telephone me-2"></i>Contact Number
                      </label>
                      <input
                        id="contactNo"
                        type="number"
                        className="form-control edit-input border-1"
                        name="contactNo"
                        value="9988556644"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label fw-500 text-dark">
                        <i className="bi bi-calendar me-2"></i>Date Of Birth
                      </label>
                      <input
                        id="dob"
                        type="date"
                        className="form-control edit-input border-1"
                        name="dob"
                        value="1999-10-10"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="aadharNo" className="form-label fw-500 text-dark">
                        <i className="bi bi-card-text me-2"></i>Aadhar Number
                      </label>
                      <input
                        id="aadharNo"
                        type="text"
                        className="form-control edit-input border-1"
                        name="aadharNo"
                        value="1122 3333 4444"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="panNo" className="form-label fw-500 text-dark">
                        <i className="bi bi-file-earmark me-2"></i>PAN Number
                      </label>
                      <input
                        id="panNo"
                        type="text"
                        className="form-control edit-input border-1"
                        name="panNo"
                        value="ABCD123456"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-500 text-dark">
                    <i className="bi bi-geo-alt me-2"></i>Address
                  </label>
                  <textarea
                    className="form-control edit-input border-1"
                    id="address"
                    rows="3"
                    name="address"
                    value="address"
                    style={{ borderRadius: "8px", padding: "10px 12px" }}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label fw-500 text-dark">
                        <i className="bi bi-map me-2"></i>State
                      </label>
                      <input
                        id="state"
                        type="text"
                        className="form-control edit-input border-1"
                        placeholder="Enter state"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label fw-500 text-dark">
                        <i className="bi bi-building me-2"></i>City
                      </label>
                      <input
                        id="city"
                        type="text"
                        className="form-control edit-input border-1"
                        placeholder="Enter city"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="pincode" className="form-label fw-500 text-dark">
                    <i className="bi bi-pin me-2"></i>Pincode
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    className="form-control edit-input border-1"
                    placeholder="6-digit Pincode"
                    style={{ borderRadius: "8px", padding: "10px 12px" }}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label fw-500 text-dark">
                        <i className="bi bi-map me-2"></i>Current Password
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        className="form-control edit-input border-1"
                        placeholder="Enter current password"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label fw-500 text-dark">
                        <i className="bi bi-building me-2"></i>New Password
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        className="form-control edit-input border-1"
                        placeholder="Enter new password"
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
                    </div>
                  </div>
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
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none"
                  }}
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
