import React,{useEffect} from 'react'
import "./home.css"
import { Link, useNavigate } from 'react-router-dom'

export const DefaultHomePage = () => {
  useEffect(() => {
        // Apply page-specific background
        document.body.style.backgroundColor = "#e0e7ff";
    
        // Cleanup when leaving the page
        return () => {
          document.body.style.backgroundColor = "";
        };
      }, []);
   
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
    <div className='home-page'>
         <div className="ms-4" >
            <div>
              <h1
                className=""
                style={{ fontSize: "100px", marginLeft: "8rem",marginTop:"5rem" }}
              >
                Bankify
              </h1>
              <div className="mt-4" style={{ marginLeft: "4rem" }}>
                <button 
                  className="btn btn-outline-dark fs-4 me-3"
                  onClick={login}
                  style={{ width: "15%" }}
                >
                  Login
                </button>
                <button 
                  className="btn btn-outline-dark fs-4"
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
