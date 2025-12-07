import React, { useState } from "react";
import lock from "../images/lock.png";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCnf, setShowPasswordCnf] = useState(false);
  return (
    <div>
      <div
        className="container bL rounded-4 p-4 mt-3"
        style={{ padding: "1.5rem", width: "34rem" }}
      >
        <div className="bL">
          <div className="bL d-flex align-items-center mb-2">
            <User className="bL me-2" />
            <span className="bL fs-5 fw-semibold">Sign Up</span>
          </div>
        </div>
        <p className="bL text-start text-muted">
          Join us today and start banking with confidence
        </p>
        <div>
          <div className="mb-3 mt-3 bL">
            <div className="row bL mb-2">
              <div className="col bL">
                <label htmlFor="fName" className=" form-label bL ms-1">
                  First Name
                </label>
                <input
                  id="fName"
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                />
              </div>
              <div className="col bL">
                <label htmlFor="lName" className=" form-label bL ms-1">
                  Last Name
                </label>
                <input
                  id="lName"
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                />
              </div>
            </div>

            <div className="bL">
              <label htmlFor="email" className=" form-label bL ms-1">
                Email address
              </label>
              <input
                type="email"
                className="form-control bL"
                id="email"
                placeholder="john@email.com"
                style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
              />
            </div>
            <div className="bL mt-2">
              <label htmlFor="phone" className=" form-label bL ms-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control bL"
                id="phone"
                placeholder="+91 1234567890"
                style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
              />
            </div>
            <div className="bL mt-2">
              <label htmlFor="dob" className=" form-label bL ms-1">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control bL"
                id="dob"
                style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
              />
            </div>
            <div className="bL mt-2">
              <label htmlFor="gender" className=" form-label bL ms-1">
                Gender
              </label>
              <select
                id="gender"
                className="form-select"
                aria-label="Default select example"
                style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
              >
                <option value="" disabled hidden>
                  Select Gender
                </option>
                <option value="male" style={{ backgroundColor: "white" }}>
                  Male
                </option>
                <option value="female" style={{ backgroundColor: "white" }}>
                  Female
                </option>
                <option value="other" style={{ backgroundColor: "white" }}>
                  Other
                </option>
                <option value="noSay" style={{ backgroundColor: "white" }}>
                  Prefer Not to Say
                </option>
              </select>
            </div>
            <div className="bL mt-2">
              <label htmlFor="address" className=" form-label bL ms-1">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                rows="3"
                placeholder="Enter your Address"
                style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
              ></textarea>
            </div>
            <div className="row bL mb-2 mt-2">
              <div className="col bL">
                <label htmlFor="aadhaar" className=" form-label bL ms-1 S">
                  Aadhaar Number
                </label>
                <input
                  id="aadhaar"
                  type="text"
                  className="form-control"
                  placeholder="1234 5678 9012"
                  style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                />
              </div>
              <div className="col bL">
                <label htmlFor="pan" className=" form-label bL ms-1">
                  PAN Number
                </label>
                <input
                  id="pan"
                  type="text"
                  className="form-control"
                  placeholder="ABCDE1234G"
                  style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                />
              </div>
            </div>
            <div className="bL">
              <div className="bL mt-2">
                <label className="bL mb-2" htmlFor="password">
                  Password
                </label>
                <div className="d-flex rounded bL">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="form-control bL"
                    style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ms-1"
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    {showPassword ? (
                      <EyeOff
                        className=""
                        style={{ backgroundColor: "white" }}
                      />
                    ) : (
                      <Eye className="" style={{ backgroundColor: "white" }} />
                    )}
                  </button>
                </div>
                <div className="bL d-flex"></div>
              </div>
              <div className="bL mt-2">
                <label className="bL mb-2" htmlFor="cnfPassword">
                  Confirm Password
                </label>
                <div className="d-flex rounded bL">
                  <input
                    id="cnfPassword"
                    type={showPasswordCnf ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="form-control bL"
                    style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPasswordCnf(!showPasswordCnf)}
                    className="ms-1"
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    {showPasswordCnf ? (
                      <EyeOff
                        className=""
                        style={{ backgroundColor: "white" }}
                      />
                    ) : (
                      <Eye className="" style={{ backgroundColor: "white" }} />
                    )}
                  </button>
                </div>
                <div className="bL d-flex"></div>
              </div>
            </div>
            <div className="mt-4 bL">
              <button
                className="btn btn-dark w-100"
                style={{ marginBottom: "-1rem" }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
