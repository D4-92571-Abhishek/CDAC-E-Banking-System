import React, { useEffect, useState } from "react";
import "./FundTransfer.css";
import {
  Send,
  ArrowRight,
  History,
  DollarSign,
  User,
  FileText,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { sendLog } from "../../../../services/loggerService";
import {
  customerAccountDetails,
  customerSendOtp,
  customerValidateOtpApi,
  fetchTransferHistoryDebited,
  cancelFundstransferApi
} from "../../Service/apiCall";

export default function FundTransferUI() {
  const [activeTab, setActiveTab] = useState("new");

  const [submitted, setSubmitted] = useState(false);

  const [transferHistory, setTransferHistory] = useState();

  const [selfAccountNo, setSelfAccountNo] = useState();
  const [destinationAccountNo, setDestinationAccountNo] = useState();
  const [amount, setAmount] = useState();
  const [message, setMessage] = useState();
  const [currentInputOtp, setCurrentInputOtp] = useState();
  const [otpResult, setOtpResult] = useState();
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [accountNo, setAccountNo] = useState();

  const navigate = useNavigate();
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!loggedRef.current) {
        sendLog("CUSTOMER_FUND_TRANSFER_PAGE_ACCESSED", sessionStorage.getItem("userId") || "Unknown Customer");
        loggedRef.current = true;
    }
  }, []);

  const fetchAccountNos = async () => {
    try {
      // const data = await axios.get(
      //   `http://localhost:8080/bankify/customers/get-account-nos/${sessionStorage.getItem("userId")}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      //     },
      //   },
      // );

      const data = await customerAccountDetails();

      setAccountNo(data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const generateOtp = async () => {
    const body = {
      selfAccountNo: selfAccountNo,
      destinationAccountNo: destinationAccountNo,
      amount: amount,
      message: message,
    };

    // console.log(body);
    // const response = await axios.post(`http://localhost:8080/bankify/customers/transfer/send-otp/${sessionStorage.getItem("userId")}`, body,{
    //   headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
    // });

    const response = await customerSendOtp(body);

    const data = await response.data;
    if (data.status !== "Success") {
      toast.error("Transfer Failed! Please try again.");
      return;
    } else {
      setOtpResult(data);
      setShowOtpModal(true);
    }
    return;
  };
  const handleTransferFunds = async () => {
    try {
      const body = {
        selfAccountNo: selfAccountNo,
        destinationAccountNo: destinationAccountNo,
        amount: amount,
        message: message,
        transactionId: otpResult.transId,
        otpId: otpResult.otpId,
        inputOTP: currentInputOtp,
        cancelTransaction: "FALSE",
      };

      // console.log(body);

      // const response = await axios.post(`http://localhost:8080/bankify/customers/transfer/validate-otp/${sessionStorage.getItem("userId")}`, body,{
      //   headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
      // });
      const response = await customerValidateOtpApi(body);
      const data = await response.data;
      if (data.status !== "Success") {
        toast.error("Transfer Failed! Please try again.");

        return;
      } else {
        setShowOtpModal(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
        // Reset form
        setSelfAccountNo("");
        setDestinationAccountNo("");
        setAmount("");
        setMessage("");
        setCurrentInputOtp("");
        toast.success("Transfer successful!");
      }
      fetchTransferHistory();
      return;
    } catch (error) {
      console.error("Error during fund transfer:", error);
      toast.error(
        error.response?.data?.message || "Transfer Failed! Please try again.",
      );
      setShowOtpModal(false);
    }
  };

  // console.log(accountNo)

  const fetchTransferHistory = async () => {
    try {
      // const data = await axios.get(
      //   `http://localhost:8080/bankify/customers/transaction-history-debited/${sessionStorage.getItem("userId")}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      //     },
      //   },
      // );
      const data = await fetchTransferHistoryDebited();
      setTransferHistory(data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const cancelTransferFunds = async () => {
    const body = {
      selfAccountNo: selfAccountNo,
      destinationAccountNo: destinationAccountNo,
      amount: amount,
      message: message,
      transactionId: otpResult.transId,
      otpId: otpResult.otpId,
      inputOTP: currentInputOtp,
      cancelTransaction: "TRUE",
    };

    // console.log(body);
    // const response = await axios.post(`http://localhost:8080/bankify/customers/transfer/validate-otp/${sessionStorage.getItem("userId")}`, body,{
    //   headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
    // });

    const response = await cancelFundstransferApi(body);

    const data = await response.data;
    if (data.status !== "Success") {
      toast.error("Transfer Failed! Please try again.");
      return;
    } else {
      setShowOtpModal(false);
      setSubmitted(false);

      // Reset form
      setSelfAccountNo("");
      setDestinationAccountNo("");
      setAmount("");
      setMessage("");
      setCurrentInputOtp("");
      toast.success("Transfer Cancelled successfully!");
      fetchTransferHistory();
    }
    return;
  };

  useEffect(() => {
    fetchTransferHistory();
    fetchAccountNos();
    if (
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("token") === ""
    ) {
      navigate("/");
    }
  }, []);
  // console.log(transferHistory);

  if (submitted) {
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
    return (
      <div className="container-fluid">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <CheckCircle size={48} className="text-white" />
            </div>
            <h3 className="fw-bold text-dark mb-2">Transfer Successful!</h3>
            <p className="text-muted mb-0">
              ₹ {amount} has been transferred successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // console.log(currentInputOtp);
  // OTP Modal Component
  const OtpModal = () => {
    return (
      <>
        {/* Backdrop */}
        {showOtpModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={() => setShowOtpModal(false)}
          />
        )}

        {/* Modal */}
        <div
          className="position-fixed top-50 start-50 bg-white rounded-3 p-5 shadow-lg"
          style={{
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            width: "90%",
            maxWidth: "450px",
            display: showOtpModal ? "block" : "none",
          }}
        >
          {/* Modal Header */}
          <div className="text-center mb-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <span style={{ fontSize: "28px", color: "white" }}>🔐</span>
            </div>
            <h4 className="fw-bold text-dark">Enter OTP</h4>
            <p className="text-muted small">
              We've sent an OTP to your registered email
            </p>
          </div>

          {/* Transfer Summary */}
          <div
            className="bg-light rounded-2 p-3 mb-4"
            style={{ backgroundColor: "rgba(102, 126, 234, 0.05)" }}
          >
            <div className="row g-3">
              <div className="col-6">
                <small className="text-muted d-block mb-1">Amount</small>
                <strong className="text-dark">₹ {amount}</strong>
              </div>
              <div className="col-6">
                <small className="text-muted d-block mb-1">To Account</small>
                <strong className="text-dark">{destinationAccountNo}</strong>
              </div>
            </div>
          </div>

          {/* OTP Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold mb-2">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter 6-digit OTP"
              value={currentInputOtp || ""}
              onChange={(e) =>
                setCurrentInputOtp(
                  e.target.value.replace(/\D/g, "").slice(0, 6),
                )
              }
              maxLength="6"
              inputMode="numeric"
              style={{
                fontSize: "18px",
                padding: "12px 16px",
                borderColor: "#e0e0e0",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                textAlign: "center",
                letterSpacing: "4px",
                fontWeight: "600",
              }}
              autoFocus
            />
            <small className="text-muted d-block mt-2">
              Enter the 6-digit code sent to your registered contact
            </small>
          </div>

          {/* Buttons */}
          <div className="row g-2">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-outline-secondary w-100 py-2 rounded-2 fw-semibold"
                onClick={cancelTransferFunds}
              >
                Cancel
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn w-100 py-2 rounded-2 fw-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
                onClick={handleTransferFunds}
                disabled={!currentInputOtp || currentInputOtp.length !== 6}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container-fluid">
      {/* OTP Modal */}
      <OtpModal />
      {/* Header */}
      <div className="mb-4 mt-4">
        <h3 className="fw-bold text-dark mb-1">Fund Transfer</h3>
        <p className="text-muted">
          Send money to your accounts or beneficiaries
        </p>
      </div>

      <div className="row g-4">
        {/* Main Form - Full Width */}
        <div className="col-12">
          {/* Tabs */}
          <div className="mb-4">
            <div className="btn-group w-100" role="group">
              <input
                type="radio"
                className="btn-check"
                name="tab"
                id="newTransfer"
                checked={activeTab === "new"}
                onChange={() => setActiveTab("new")}
              />
              <label
                className="btn fw-semibold rounded-start-2"
                htmlFor="newTransfer"
                style={{
                  background:
                    activeTab === "new"
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "#f0f0f0",
                  color: activeTab === "new" ? "white" : "#666",
                  border: "none",
                }}
              >
                <Send
                  size={18}
                  className="me-2"
                  style={{ marginBottom: "2px" }}
                />
                New Transfer
              </label>

              <input
                type="radio"
                className="btn-check"
                name="tab"
                id="history"
                checked={activeTab === "history"}
                onChange={() => setActiveTab("history")}
              />
              <label
                className="btn fw-semibold rounded-end-2"
                htmlFor="history"
                style={{
                  background:
                    activeTab === "history"
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "#f0f0f0",
                  color: activeTab === "history" ? "white" : "#666",
                  border: "none",
                }}
              >
                <History
                  size={18}
                  className="me-2"
                  style={{ marginBottom: "2px" }}
                />
                Transfer History
              </label>
            </div>
          </div>

          {/* New Transfer Form */}
          {activeTab === "new" && (
            <div
              className="card border-0 rounded-3 p-5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
            >
              <h5 className="fw-bold mb-4">Transfer Details</h5>

              {/* From Account */}
              <div>
                <label className="form-label fw-semibold mb-2">
                  <User
                    size={16}
                    className="me-2"
                    style={{ marginBottom: "2px" }}
                  />
                  Select Account
                </label>
                <select
                  name="fromAccount"
                  className="form-select rounded-2"
                  value={selfAccountNo || ""}
                  onChange={(e) => setSelfAccountNo(e.target.value)}
                  style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                  required
                >
                  <option value="" disabled>
                    -- Select Account --
                  </option>

                  {accountNo?.accountNos?.map((acc) => (
                    <option key={acc} value={acc}>
                      {acc}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Account */}
              <div>
                <label className="form-label fw-semibold mb-2">
                  <User
                    size={16}
                    className="me-2"
                    style={{ marginBottom: "2px" }}
                  />
                  To Account
                </label>
                <input
                  type="text"
                  name="toAccount"
                  className="form-control rounded-2"
                  placeholder="Enter destination account number"
                  value={destinationAccountNo||""}
                  onChange={(e) => setDestinationAccountNo(e.target.value)}
                  style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label className="form-label fw-semibold mb-2">
                  <DollarSign
                    size={16}
                    className="me-2"
                    style={{ marginBottom: "2px" }}
                  />
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  className="form-control rounded-2"
                  placeholder="Enter amount"
                  value={amount||""}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                  required
                />
              </div>

              {/* Memo */}
              <div>
                <label className="form-label fw-semibold mb-2">
                  <FileText
                    size={16}
                    className="me-2"
                    style={{ marginBottom: "2px" }}
                  />
                  Message (Optional)
                </label>
                <input
                  type="text"
                  name="memo"
                  className="form-control rounded-2"
                  placeholder="Enter transfer description"
                  value={message||""}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                />
              </div>

              {/* Buttons */}
              <div className="row g-2 mt-4">
                <div className="col-md-7">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 rounded-2 fw-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                    }}
                    onClick={generateOtp}
                  >
                    <Send
                      size={18}
                      className="me-2"
                      style={{ marginBottom: "2px", textAlign: "" }}
                    />
                    Transfer Now
                  </button>
                </div>
                <div className="col-md-5">
                  <button
                    type="reset"
                    className="btn btn-outline-secondary w-100 py-3 rounded-2 fw-semibold"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transfer History */}
          {activeTab === "history" && (
            <div
              className="card border-0 rounded-3 overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
            >
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead
                    style={{ backgroundColor: "rgba(102, 126, 234, 0.05)" }}
                  >
                    <tr>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark">
                        Transaction Time
                      </th>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark">
                        Transaction Type
                      </th>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark">
                        Transaction Status
                      </th>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark text-end">
                        Amount
                      </th>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transferHistory.length > 0 ? (
                      transferHistory.map((transfer) => (
                        <tr
                          key={transfer.id}
                          style={{ borderBottom: "1px solid #e9ecef" }}
                        >
                          <td className="py-4 px-4 fw-semibold">
                            {new Date(
                              transfer.transactionTime,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-4 px-4 fw-semibold">
                            {transfer.transactionType}
                          </td>
                          <td className="py-4 px-4 fw-semibold">
                            {transfer.transactionStatus}
                          </td>
                          <td className="py-4 px-4 fw-semibold text-end">
                            ₹ {transfer.amount}
                          </td>
                          <td className="py-4 px-4 fw-semibold">
                            {transfer.transactionDescription}
                          </td>
                          <td className="py-4 px-4">
                            <span className="badge bg-success-subtle text-success">
                              <CheckCircle
                                size={14}
                                className="me-1"
                                style={{ marginBottom: "2px" }}
                              />
                              {transfer.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-5 px-4 text-center text-muted"
                        >
                          No transfers available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
