import { useEffect, useState, useRef } from "react";
import StatsCards from "../components/StatsCards";
import {
  getActiveCustomers,
  getCustomerTransactions,
} from "../../../services/transaction";
import { ListOrdered } from "lucide-react";

export default function Transactions() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("id");
  const [showSort, setShowSort] = useState(false);

  const [filterType, setFilterType] = useState("ALL");

  const dropdownRef = useRef(null);

  useEffect(() => {
    loadActiveCustomers();
  }, []);

  const loadActiveCustomers = async () => {
    const res = await getActiveCustomers();
    setCustomers(res.data);
  };

  const handleViewTransactions = async (customer) => {
    setLoading(true);
    setSelectedCustomer(customer);
    setShowModal(true);

    const res = await getCustomerTransactions(customer.userId);
    setTransactions(res.data);

    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setTransactions([]);
    setSelectedCustomer(null);
    setShowSort(false);
    setFilterType("ALL");
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSort(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* 🔹 FILTER TRANSACTIONS */
  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === "ALL") return true;
    return tx.transactionType === filterType;
  });

  /* 🔹 SORT TRANSACTIONS */
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case "id":
        return a.transactionId - b.transactionId;
      case "date":
        return new Date(b.transactionTime) - new Date(a.transactionTime);
      case "amount":
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

  const filteredCustomers = customers.filter((cust) =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content container py-4">
      {/* DASHBOARD STATS */}
      <h4 className="mb-4 fw-bold text-primary">Dashboard Overview</h4>
      <StatsCards />

      {/* ACTIVE CUSTOMERS */}
      <div className="card shadow-sm mb-5 rounded-4 border-0">
        <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Active Customers</h5>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
  <thead className="table-primary text-white">
    <tr>
      <th>Name</th>
      <th>Contact</th>
      <th className="text-center">Action</th>
    </tr>
  </thead>

  <tbody>
    {filteredCustomers.map((cust) => (
      <tr
        key={cust.userId}
        className="border-bottom"
        style={{ transition: "all 0.2s ease-in-out" }}
      >
        {/* NAME + EMAIL */}
        <td>
          <div className="fw-semibold text-primary">{cust.name}</div>
          <small className="text-muted">{cust.email}</small>
        </td>

        {/* MOBILE */}
        <td className="fw-medium">{cust.contactNo}</td>

        {/* ACTION */}
        <td className="text-center">
          <button
            className="btn btn-sm btn-outline-primary rounded-pill px-3"
            onClick={() => handleViewTransactions(cust)}
          >
            View Transactions
          </button>
        </td>
      </tr>
    ))}

    {filteredCustomers.length === 0 && (
      <tr>
        <td colSpan="3" className="text-center text-muted py-4">
          No matching customers found
        </td>
      </tr>
    )}
  </tbody>
</table>

          </div>
        </div>
      </div>

      {/* TRANSACTION MODAL */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content shadow-lg rounded-4">
                {/* HEADER */}
                <div className="modal-header bg-primary text-white rounded-top-4 d-flex justify-content-between">
                  <h5 className="modal-title">
                    Transaction History —{" "}
                    <span className="text-warning">
                      {selectedCustomer?.name}
                    </span>
                  </h5>

                  <div className="d-flex gap-2 align-items-center">
                    {/* FILTER */}
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "140px" }}
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="ALL">All</option>
                      <option value="CREDITED">Credited</option>
                      <option value="DEBITED">Debited</option>
                    </select>

                    {/* SORT */}
                    <div className="position-relative" ref={dropdownRef}>
                      <button
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
                        onClick={() => setShowSort(!showSort)}
                      >
                        <ListOrdered size={16} />
                        Sort
                      </button>

                      {showSort && (
                        <div className="dropdown-menu show shadow border-0 mt-2">
                          <button
                            className={`dropdown-item ${
                              sortBy === "id" && "active"
                            }`}
                            onClick={() => {
                              setSortBy("id");
                              setShowSort(false);
                            }}
                          >
                            Transaction ID
                          </button>
                          <button
                            className={`dropdown-item ${
                              sortBy === "date" && "active"
                            }`}
                            onClick={() => {
                              setSortBy("date");
                              setShowSort(false);
                            }}
                          >
                            Date & Time
                          </button>
                          <button
                            className={`dropdown-item ${
                              sortBy === "amount" && "active"
                            }`}
                            onClick={() => {
                              setSortBy("amount");
                              setShowSort(false);
                            }}
                          >
                            Amount
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="modal-body table-responsive p-3">
                  {loading ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      />
                    </div>
                  ) : (
                    <table className="table table-hover table-striped align-middle">
                      <thead className="table-secondary">
                        <tr>
                          <th>ID</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Description</th>
                          <th>Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedTransactions.map((tx) => (
                          <tr key={tx.transactionId}>
                            <td>{tx.transactionId}</td>
                            <td>
                              <span
                                className={`badge ${
                                  tx.transactionType === "CREDITED"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {tx.transactionType}
                              </span>
                            </td>
                            <td className="fw-bold">
                              ₹{tx.amount.toFixed(2)}
                            </td>
                            <td>{tx.transactionDescription}</td>
                            <td>
                              {new Date(
                                tx.transactionTime
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))}

                        {sortedTransactions.length === 0 && (
                          <tr>
                            <td
                              colSpan="5"
                              className="text-center py-3 text-muted"
                            >
                              No transactions found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* FOOTER */}
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
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
