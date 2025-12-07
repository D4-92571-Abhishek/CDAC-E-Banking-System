import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const DefaultHomePage = () => {
  const navigate = useNavigate();
  const login =() =>{
    navigate("/loginlogoutpage/login", {
      state: { from: "loginbtn" }  // ← send from where navigation happened
    });
  }
  const register=()=>{
    navigate("/loginlogoutpage/register", {
      state: { from: "registerbtn" }  // ← send from where navigation happened
    });
  }
  return (
    <div>
         <div className="">
            <div>
              <h1
                className="mt-5"
                style={{ fontSize: "100px", marginLeft: "8rem" }}
              >
                Bankify
              </h1>
              <div className="mt-4" style={{ marginLeft: "4rem" }}>
                <button 
                  className="btn fs-4"
                  onClick={login}
                  style={{ width: "15%" }}
                >
                  Login
                </button>
                <button 
                  className="btn fs-4"
                  onClick={register}
                  style={{ width: "15%" }}
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
    </div>
  )
}
