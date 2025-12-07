import "./Login.css";
import lock from "../../images/lock.png";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div
        className="container bL rounded-4 pt-4 mt-3"
        style={{ padding: "1.5rem", width: "30rem" }}
      >
        <div className="bL">
          <div className="bL d-flex align-items-center mb-2">
            <img
              src={lock}
              alt="lock"
              height={20}
              width={20}
              className="bL me-2"
            />
            <span className="bL  fs-5 fw-semibold">Sign In</span>
          </div>
        </div>
        <p className="bL text-start text-muted">
          Enter your credentials to access your account
        </p>
        <div>
          <div className="mb-3 mt-3 bL">
            <label htmlFor="exampleFormControlInput1" className=" form-label bL">
              Email address
            </label>
            <div className="d-flex bL">
              <Mail
                className="bL"
                style={{
                  height: "2rem",
                  width: "1.5rem",
                  marginTop: ".2rem",
                  marginRight: ".2rem",
                }}
              ></Mail>
              <input
                type="email"
                className="form-control bL ms-1"
                id="exampleFormControlInput1"
                placeholder="Enter your Email"
                style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
              />
            </div>
            <div>
              <div className="bL mt-2">
                <label className="bL" htmlFor="password">
                  Password
                </label>
                <div className="bL d-flex">
                  <Lock
                    className="bL mt-2 me-1"
                    style={{
                      height: "2rem",
                      width: "1.5rem",
                    }}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="form-control bL ms-1 mt-2"
                    style={{ backgroundColor: "#f2f2f2ff", border: "none" }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ms-1 mt-2"
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
              </div>
            </div>
            <div className="mt-3 bL">
              <button
                className="btn btn-dark w-100"
                style={{ marginBottom: "-1rem" }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
