import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  Phone,
  FileText,
  ArrowRightLeft,
  XCircle,
} from "lucide-react";
// import StatsCards from "../components/StatsCards";
import {
  getActiveCustomers,
  getCustomerTransactions,
} from "../../../services/transaction";
import "./Transactions.css";

export default function TransactionsUI() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadActiveCustomers();
  }, []);

  const loadActiveCustomers = async () => {
    const res = await getActiveCustomers();
    setCustomers(res.data);
  };

  const handleViewTransactions = async (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
    setLoading(true);

    const res = await getCustomerTransactions(customer.userId);
    setTransactions(res.data);

    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setTransactions([]);
    setSelectedCustomer(null);
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      
      <h5>Dashboard Overview</h5>
       {/* <StatsCards /> */}
      <div className="mb-4 mt-4">
        <h3 className="fw-bold text-dark mb-1">Customer Transactions</h3>
        <p className="text-muted">
          View and manage transaction history of active customers
        </p>
      </div>

     

      {/* Active Customers */}
      <div
        className="card border-0 rounded-3 overflow-hidden mt-4"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
      >
        <div className="table-responsive">
          <table className="table mb-0">
            <thead style={{ backgroundColor: "rgba(102, 126, 234, 0.05)" }}>
              <tr>
                <th className="border-0 py-4 px-4 fw-semibold">
                  <Users size={16} className="me-2" />
                  Name
                </th>
                <th className="border-0 py-4 px-4 fw-semibold">
                  <Mail size={16} className="me-2" />
                  Email
                </th>
                <th className="border-0 py-4 px-4 fw-semibold">
                  <Phone size={16} className="me-2" />
                  Mobile
                </th>
                <th className="border-0 py-4 px-4 fw-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-5 text-center text-muted">
                    No active customers found
                  </td>
                </tr>
              )}

              {customers.map((cust) => (
                <tr key={cust.userId} style={{ borderBottom: "1px solid #e9ecef" }}>
                  <td className="py-4 px-4 fw-semibold">{cust.name}</td>
                  <td className="py-4 px-4 text-muted">{cust.email}</td>
                  <td className="py-4 px-4">{cust.contactNo}</td>
                  <td className="py-4 px-4 text-center">
                    <button
  className="btn text-white rounded-2 fw-semibold"
  style={{
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
  }}
  onClick={() => handleViewTransactions(cust)}
>
  <ArrowRightLeft size={16} className="me-1" />
  View Transactions
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content border-0 rounded-3">
                <div
                  className="modal-header border-0 p-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                  }}
                >
                  <div>
                    <h5 className="fw-bold mb-0">Transaction History</h5>
                    <small style={{ opacity: 0.9 }}>
                      {selectedCustomer?.name}
                    </small>
                  </div>
                  <button
                    className="btn-close btn-close-white"
                    onClick={closeModal}
                  ></button>
                </div>

                <div className="modal-body p-4">
                  {loading ? (
                    <p className="text-center text-muted">
                      Loading transactions...
                    </p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.length === 0 && (
                            <tr>
                              <td colSpan="5" className="text-center text-muted">
                                No transactions found
                              </td>
                            </tr>
                          )}

                          {transactions.map((tx) => (
                            <tr key={tx.transactionId}>
                              <td>{tx.transactionId}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    tx.transactionType === "CREDITED"
                                      ? "bg-success-subtle text-success"
                                      : "bg-danger-subtle text-danger"
                                  }`}
                                >
                                  {tx.transactionType}
                                </span>
                              </td>
                              <td className="fw-semibold">₹ {tx.amount}</td>
                              <td>{tx.transactionDescription}</td>
                              <td>
                                {new Date(
                                  tx.transactionTime,
                                ).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="modal-footer border-0">
                  <button
                    className="btn btn-outline-secondary rounded-2"
                    onClick={closeModal}
                  >
                    <XCircle size={16} className="me-1" />
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
