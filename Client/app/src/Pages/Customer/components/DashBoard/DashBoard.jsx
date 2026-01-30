import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";
import axios from "axios";
import { Eye, EyeOff, CreditCard, TrendingUp, Send, ArrowDownLeft, ArrowUpRight, MoreVertical, Wallet } from "lucide-react";

export default function DashboardUI() {
  const [cust, setCust] = useState();
  const [showBalance, setShowBalance] = useState(true);
  const [transDetails, setTransDetails] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/bankify/customers/${sessionStorage.getItem("userId")}`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } }
      );
      setCust(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const fetchTransData = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/bankify/customers/get-transaction-details/${sessionStorage.getItem("userId")}`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } }
      );
      setTransDetails(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };

  useEffect(() => {
    if(sessionStorage.getItem("token")===null||sessionStorage.getItem("token")===""){
      navigate("/");
    }
    fetchData();
    fetchTransData();
  }, []);


  console.log(transDetails)


  return (
    <div className="container-fluid">
      <div className="mb-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h3 className="fw-bold text-dark mb-1">Welcome back, {cust?.name || "Customer"}!</h3>
            <p className="text-muted small mb-0">Here's your financial overview</p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div
            className="card border-0 rounded-4 p-5 text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              minHeight: "280px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "150px",
                height: "150px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
              }}
            ></div>

            <div className="position-relative z-1">
              <div className="d-flex justify-content-between align-items-start mb-5">
                <div>
                  <p className="mb-1 opacity-75 small">Savings Account</p>
                  <h6 className="fw-bold mb-0">{cust?.accountNo || "XXXX XXXX XXXX"}</h6>
                </div>
                <CreditCard size={32} />
              </div>

              <div className="mb-5">
                <p className="opacity-75 small mb-2">Current Balance</p>
                <div className="d-flex align-items-center gap-3">
                  <h2 className="fw-bold mb-0">
                    {showBalance ? `₹ ${cust?.currentBalance ? parseInt(cust?.currentBalance).toLocaleString() : "0"}` : "•••••••"}
                  </h2>
                  <button
                    className="btn btn-light btn-sm rounded-circle p-0"
                    onClick={() => setShowBalance(!showBalance)}
                    style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {showBalance ? <EyeOff size={18} className="text-dark" /> : <Eye size={18} className="text-dark" />}
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-end">
                <div>
                  <p className="mb-0 fw-semibold">{cust?.name || "Your Name"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-6">
              <div className="card border-0 rounded-3 p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small mb-1">Total In-Coming Funds</p>
                    <h5 className="fw-bold text-dark mb-0">{transDetails?.totalIncomingAmount || "₹ 0"}</h5>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(40, 167, 69, 0.1)",
                    }}
                  >
                    <ArrowDownLeft size={24} className="text-success" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card border-0 rounded-3 p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small mb-1">Total Out-Going Funds</p>
                    <h5 className="fw-bold text-dark mb-0">{transDetails?.totalOutGoingAmount || "₹ 0"}</h5>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(220, 53, 69, 0.1)",
                    }}
                  >
                    <ArrowUpRight size={24} className="text-danger" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-12">
              <div className="card border-0 rounded-3 p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small mb-1">Available Balance</p>
                    <h5 className="fw-bold text-dark mb-0">{transDetails?.currentBalance || "₹ 0"}</h5>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(102, 126, 234, 0.1)",
                    }}
                  >
                    <Wallet size={24} className="text-primary" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>



    </div>
  );
}
