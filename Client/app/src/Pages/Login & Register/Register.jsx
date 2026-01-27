import React, { useState } from "react";
import lock from "../../images/lock.png";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCnf, setShowPasswordCnf] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [aadhaarNo, setAadhaar] = useState("");
  const [panNo, setPan] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const navigate = useNavigate();

  const validation = () => {
   
    if(firstName === "" || lastName === "" || email === "" || contactNo === "" || dob === "" || gender === "" || address === "" || state === "" || city === "" || pincode === "" || aadhaarNo === "" || panNo === "" || password === "") {
      toast.warning("Please fill all the fields");
      return false;
    }
     if (password !== cnfPassword) {
      toast.warning("Passwords do not match");
      return false;
    }
  };

  const handleRegister = async () => {
    console.log(validation())
    if(!validation()===false) return;

    const body = {
      name: firstName + " " + lastName,
      email: email,
      contactNo: contactNo,
      dob: dob,
      gender: gender,
      completeAddress: address,
      state: state,
      city: city,
      pincode: pincode,
      aadharNo: aadhaarNo,
      panNo: panNo,
      password: password,
    };
    console.log(body);

    const response = await axios.post(
      "http://localhost:8080/bankify/customers/signup",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);
    if (response.data.status === "Success") {
      toast.success("Registered Successfully! Please Login to continue.");
      setTimeout(() => {
        navigate("/loginlogoutpage/login");
      }, 2000);
    } else {
      toast.error("Registration Failed! Please try again.");
    }
  };

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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setContactNo(e.target.value)}
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
                onChange={(e) => setDob(e.target.value)}
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
                
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled selected>
                  Select Gender
                </option>
                <option value="MALE" style={{ backgroundColor: "white" }} >
                  Male
                </option>
                <option value="FEMALE" style={{ backgroundColor: "white" }}>
                  Female
                </option>
                <option value="OTHER" style={{ backgroundColor: "white" }}>
                  Other
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
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <div className="row bL mt-2">
              <div className="col bL">
                <label htmlFor="state" className="form-label bL ms-1">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  className="form-control"
                  placeholder="State"
                  style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="col bL">
                <label htmlFor="city" className="form-label bL ms-1">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="form-control"
                  placeholder="City"
                  style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="bL mt-2">
              <label htmlFor="pincode" className="form-label bL ms-1">
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                className="form-control"
                placeholder="6-digit Pincode"
                style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                onChange={(e) => setPincode(e.target.value)}
              />
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
                  onChange={(e) => setAadhaar(e.target.value)}
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
                  onChange={(e) => setPan(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setCnfPassword(e.target.value)}
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
                onClick={handleRegister}
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
