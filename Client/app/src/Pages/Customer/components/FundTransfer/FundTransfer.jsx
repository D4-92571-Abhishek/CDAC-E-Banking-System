import React, { useEffect, useState } from "react";
import "./FundTransfer.css";
import { Send, ArrowRight, History, DollarSign, User, FileText, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FundTransferUI() {
  const [activeTab, setActiveTab] = useState("new");
 
  const [submitted, setSubmitted] = useState(false);

  const [transferHistory, setTransferHistory]= useState();

  const [selfAccountNo,setSelfAccountNo]= useState();
  const [destinationAccountNo,setDestinationAccountNo]= useState();
  const [amount, setAmount]= useState();  
  const [message,setMessage]= useState();

  const handleTransferFunds = async() => {
    const body = {
      selfAccountNo: selfAccountNo,
      destinationAccountNo: destinationAccountNo,
      amount: amount,
      message: message
    };
    const response = await axios.post(`http://localhost:8080/bankify/customers/transfer/${sessionStorage.getItem("userId")}`, body,{
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
    });

    const data = await response.data;
    if(data.status!=="Success"){
      toast.error("Transfer Failed! Please try again.");
      return;
    }
    else{
      setSubmitted(true);
      setTimeout(() => {
      setSubmitted(false);
    }, 3000);
    }
    return;
    console.log("Transferring funds...");
  }

  
  const fetchTransferHistory = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/bankify/customers/transaction-history-debited/${sessionStorage.getItem("userId")}`,{
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
      });
      setTransferHistory(data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    } 
  };
 
  useEffect(()=>{
    fetchTransferHistory();
  },[])
  console.log(transferHistory)

  if (submitted) {

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
    return (
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "400px" }}>
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
            <p className="text-muted mb-0">₹ {amount} has been transferred successfully.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="mb-4 mt-4">
        <h3 className="fw-bold text-dark mb-1">Fund Transfer</h3>
        <p className="text-muted">Send money to your accounts or beneficiaries</p>
      </div>

      <div className="row g-4">
        {/* Main Form - Full Width */}
        <div className="col-12">
          {/* Tabs */}
          <div className="mb-4" >
            <div className="btn-group w-100"  role="group">
              <input
                type="radio"
                className="btn-check"
                name="tab"
                id="newTransfer"
                checked={activeTab === "new"}
                onChange={() => setActiveTab("new")}
              />
              <label className="btn fw-semibold rounded-start-2" htmlFor="newTransfer" style={{
                background: activeTab === "new" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f0f0f0",
                color: activeTab === "new" ? "white" : "#666",
                border: "none"
              }}>
                <Send size={18} className="me-2" style={{ marginBottom: "2px" }} />
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
              <label className="btn fw-semibold rounded-end-2" htmlFor="history" style={{
                background: activeTab === "history" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f0f0f0",
                color: activeTab === "history" ? "white" : "#666",
                border: "none"
              }}>
                <History size={18} className="me-2" style={{ marginBottom: "2px" }} />
                Transfer History
              </label>
            </div>
          </div>

          {/* New Transfer Form */}
          {activeTab === "new" && (
            <div className="card border-0 rounded-3 p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <h5 className="fw-bold mb-4">Transfer Details</h5>

              
                {/* From Account */}
                <div>
                  <label className="form-label fw-semibold mb-2">
                    <User size={16} className="me-2" style={{ marginBottom: "2px" }} />
                    From Account
                  </label>
                  <input type="text" name="fromAccount" className="form-control rounded-2" placeholder="Enter destination account number" defaultValue={selfAccountNo} onChange={(e)=>setSelfAccountNo(e.target.value)} style={{ borderColor: "#e0e0e0", padding: "10px 12px" }} required />
                </div>


                {/* To Account */}
                <div>
                  <label className="form-label fw-semibold mb-2">
                    <User size={16} className="me-2" style={{ marginBottom: "2px" }} />
                    To Account
                  </label>
                  <input type="text" name="toAccount" className="form-control rounded-2" placeholder="Enter destination account number" value={destinationAccountNo}
                   onChange={(e)=>setDestinationAccountNo(e.target.value)} style={{ borderColor: "#e0e0e0", padding: "10px 12px" }} required />
                </div>

                {/* Amount */}
                <div>
                  <label className="form-label fw-semibold mb-2">
                    <DollarSign size={16} className="me-2" style={{ marginBottom: "2px" }} />
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control rounded-2"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                    required
                  />
                </div>

                {/* Memo */}
                <div>
                  <label className="form-label fw-semibold mb-2">
                    <FileText size={16} className="me-2" style={{ marginBottom: "2px" }} />
                    Message (Optional)
                  </label>
                  <input
                    type="text"
                    name="memo"
                    className="form-control rounded-2"
                    placeholder="Enter transfer description"
                    value={message}
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
                      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none" }}
                      onClick={handleTransferFunds}
                    >
                      <Send size={18} className="me-2" style={{ marginBottom: "2px" ,textAlign:""}} />
                      Transfer Now
                    </button>
                  </div>
                  <div className="col-md-5">
                    <button type="reset" className="btn btn-outline-secondary w-100 py-3 rounded-2 fw-semibold">
                      Clear
                    </button>
                  </div>
                </div>
            </div>
          )}

          {/* Transfer History */}
          {activeTab === "history" && (
            <div className="card border-0 rounded-3 overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead style={{ backgroundColor: "rgba(102, 126, 234, 0.05)" }}>
                    <tr>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark">Transaction Time</th>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark">Transaction Type</th>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark text-end">Amount</th>
                      <th className="border-0 py-4 px-4 fw-semibold fs-5 text-dark">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transferHistory.length > 0 ? (
                      transferHistory.map((transfer) => (
                        <tr key={transfer.id} style={{ borderBottom: "1px solid #e9ecef" }}>
                          <td className="py-4 px-4 fw-semibold">{new Date(transfer.transactionTime).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}</td>
                          <td className="py-4 px-4 fw-semibold">{transfer.transactionType}</td>
                          <td className="py-4 px-4 fw-semibold text-end">₹ {transfer.amount}</td>
                          <td className="py-4 px-4 fw-semibold">{transfer.transactionDescription}</td>
                          <td className="py-4 px-4">
                            <span className="badge bg-success-subtle text-success">
                              <CheckCircle size={14} className="me-1" style={{ marginBottom: "2px" }} />
                              {transfer.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-5 px-4 text-center text-muted">
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