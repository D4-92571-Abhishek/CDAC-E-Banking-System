import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";
import {
  Eye,
  EyeOff,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { useRef } from "react";
import { sendLog } from "../../../../services/loggerService";
import {
  fetchTransactionSanpleData,
  fetchCustomerSampleDetails,
  addFundsToAccount
} from "../../Service/apiCall";

export default function DashboardUI() {
  const [cust, setCust] = useState();
  const [showBalance, setShowBalance] = useState(true);
  const [transDetails, setTransDetails] = useState();
  const [amount,setAmount]= useState(0.0)

  const navigate = useNavigate();
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!loggedRef.current) {
      sendLog(
        "CUSTOMER_DASHBOARD_ACCESSED",
        sessionStorage.getItem("userId") || "Unknown Customer",
      );
      loggedRef.current = true;
    }
  }, []);


  const fetchData = async () => {
    try {
      // const data = await axios.get(`http://localhost:8080/bankify/customers/${sessionStorage.getItem("userId")}`,
      //   { headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } }
      // );
      const data = await fetchCustomerSampleDetails();
      setCust(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTransData = async () => {
    try {
      // const data = await axios.get(`http://localhost:8080/bankify/customers/get-transaction-details/${sessionStorage.getItem("userId")}`,
      //   { headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } }
      // );
      const data = await fetchTransactionSanpleData();
      setTransDetails(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("token") === ""
    ) {
      navigate("/");
    }
    fetchData();
    fetchTransData();
  }, []);

  // console.log(transDetails)

  const addFunds= async ()=>{
    try{
      const response = await addFundsToAccount(amount);

      if(response.data.status=="Success"){
        toast.success("Funds Transfer Successfully")
        fetchData();
        fetchTransData();
        const modal = document.getElementById("addFundsModel");
        if (modal) {
          const closeButton = modal.querySelector(".btn-close");
          if (closeButton) {
            closeButton.click();
          }
        }
      }else{
        toast.warn(response.message)
      }
    }catch(e){
      toast.error("Some error Occurred..")
    }
  }

  return (
    <div className="container-fluid">
      <div className="mb-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h3 className="fw-bold text-dark mb-1">
              Welcome back, {cust?.name || "Customer"}!
            </h3>
            <p className="text-muted small mb-0">
              Here's your financial overview
            </p>
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
                  <h6 className="fw-bold mb-0">
                    {cust?.accountNo || "XXXX XXXX XXXX"}
                  </h6>
                </div>
                <CreditCard size={32} />
              </div>

              <div className="mb-5">
                <p className="opacity-75 small mb-2">Current Balance</p>
                <div className="d-flex align-items-center gap-3">
                  <h2 className="fw-bold mb-0">
                    {showBalance
                      ? `₹ ${cust?.currentBalance ? parseInt(cust?.currentBalance).toLocaleString() : "0"}`
                      : "•••••••"}
                  </h2>
                  <button
                    className="btn btn-light btn-sm rounded-circle p-0"
                    onClick={() => setShowBalance(!showBalance)}
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {showBalance ? (
                      <EyeOff size={18} className="text-dark" />
                    ) : (
                      <Eye size={18} className="text-dark" />
                    )}
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-end">
                <div>
                  <p className="mb-0 fw-semibold">
                    {cust?.name || "Your Name"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-6">
              <div
                className="card border-0 rounded-3 p-4"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small mb-1">
                      Total In-Coming Funds
                    </p>
                    <h5 className="fw-bold text-dark mb-0">
                      {transDetails?.totalIncomingAmount.toFixed(2) || "₹ 0"}
                    </h5>
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
              <div
                className="card border-0 rounded-3 p-4"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small mb-1">
                      Total Out-Going Funds
                    </p>
                    <h5 className="fw-bold text-dark mb-0">
                      {transDetails?.totalOutGoingAmount.toFixed(2) || "₹ 0"}
                    </h5>
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
      <button
        className="btn btn-dark p-2"
        data-bs-toggle="modal"
        data-bs-target="#addFundsModel"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "8px",
          fontWeight: "500",
          border: "none",
        }}
      >
        Add Funds
      </button>

      <div>
        <div
          className="modal fade"
          id="addFundsModel"
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
                    <i className="bi bi-person-circle me-2"></i>Add Funds
                  </h5>
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
                    <div className="">
                      <label className="form-label text-muted small fw-semibold">
                        Enter Funds
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="">
                      <input
                        id="amount"
                        type="number"
                        className="form-control edit-input border-1"
                        name="fullName"
                        value={amount || ""}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ borderRadius: "8px", padding: "10px 12px" }}
                      />
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
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "8px",
                    fontWeight: "500",
                    border: "none",
                  }}
                  onClick={()=>{addFunds()}}
                >
                  <i className="bi bi-lock me-2"></i>Add Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
