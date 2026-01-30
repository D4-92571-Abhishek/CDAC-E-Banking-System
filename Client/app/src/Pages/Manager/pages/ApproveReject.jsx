import { useEffect, useState } from "react";
import StatsCards from "../components/StatsCards";
import {
  getPendingCustomers,
  verifyCustomer,
  verifyAddress,
  approveCustomer,
  rejectCustomer,
} from "../../../services/manager";

export default function ApproveReject() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  /* SEARCH + FILTER STATE */
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const loadPendingCustomers = async () => {
    try {
      setLoading(true);
      const res = await getPendingCustomers();
      setCustomers(res.data);
    } catch (err) {
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingCustomers();
  }, []);

  const handleVerifyCustomer = async (id) => {
    await verifyCustomer(id);
    alert("Customer verified");
    loadPendingCustomers();
  };

  const handleVerifyAddress = async (id) => {
    await verifyAddress(id);
    alert("Address verified");
    loadPendingCustomers();
  };

  const handleApprove = async (id) => {
    await approveCustomer(id);
    alert("Customer approved");
    loadPendingCustomers();
  };

  // OPEN MODAL (no API call here)
  const openRejectModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  // CONFIRM REJECT
  const confirmReject = async () => {
    if (!selectedCustomer) return;

    await rejectCustomer(selectedCustomer.id);
    alert("Customer rejected");

    setShowModal(false);
    setSelectedCustomer(null);
    loadPendingCustomers();
  };

  /* FILTER LOGIC */
  const filteredCustomers = customers.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (statusFilter === "VERIFIED") {
      return matchesSearch && user.customerVerified;
    }

    if (statusFilter === "UNVERIFIED") {
      return matchesSearch && !user.customerVerified;
    }

    return matchesSearch;
  });

  return (
   <div className="content">
  <h5 className="mb-4">Dashboard Overview</h5>
  <StatsCards />

  <div className="card shadow-sm rounded-4 border-0 mt-4">
    {/* HEADER WITH SEARCH & FILTER */}
    <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white rounded-top-4">
      <h6 className="mb-0">Account Approval & Rejection</h6>

      <div className="d-flex gap-2">
        {/* Status Filter */}
        <select
          className="form-select form-select-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="VERIFIED">Verified</option>
          <option value="UNVERIFIED">Unverified</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    {/* TABLE */}
    <div className="table-responsive p-3">
      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : filteredCustomers.length === 0 ? (
        <p className="text-center text-muted py-4">No pending customers</p>
      ) : (
        <table className="table align-middle mb-0">
          <thead className="table-primary text-white">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Customer KYC</th>
              <th>Address</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((user) => (
              <tr key={user.id} className="border-bottom">
                <td>
                  <div className="fw-semibold text-primary">{user.name}</div>
                  <small className="text-muted">{user.email}</small>
                </td>

                <td>{user.contactNo}</td>

                <td>
                  {user.customerVerified ? (
                    <span className="badge bg-success">Verified</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleVerifyCustomer(user.id)}
                    >
                      Verify
                    </button>
                  )}
                </td>

                <td>
                  {user.addressVerified ? (
                    <span className="badge bg-success">Verified</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleVerifyAddress(user.id)}
                    >
                      Verify
                    </button>
                  )}
                </td>

                <td className="text-center">
                  <button
                    className="btn btn-sm btn-success me-2"
                    disabled={!user.customerVerified || !user.addressVerified}
                    onClick={() => handleApprove(user.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-sm btn-danger rounded-pill px-3"
                    onClick={() => openRejectModal(user)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>

  {/* REJECT MODAL */}
  {showModal && (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Reject Customer</h5>
            <button
              className="btn-close"
              onClick={() => setShowModal(false)}
            />
          </div>

          <div className="modal-body">
            Are you sure you want to reject{" "}
            <strong>{selectedCustomer?.name}</strong>?
            <br />
            This will block the account.
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button className="btn btn-danger" onClick={confirmReject}>
              Confirm Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

  );
}
