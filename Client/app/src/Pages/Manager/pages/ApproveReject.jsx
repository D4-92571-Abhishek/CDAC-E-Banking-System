import { useEffect, useState } from "react";
import Header from "../components/Header";
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

  const handleReject = async (id) => {
    await rejectCustomer(id);
    alert("Customer rejected");
    loadPendingCustomers();
  };

  return (
    <div className="content">
      <Header />
      <h5>Dashboard Overview</h5>
      <StatsCards />

      <div className="card p-4 mt-4">
        <h6>Account Approval & Rejection</h6>

        {loading && <p>Loading...</p>}

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Customer KYC</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contactNo}</td>

                <td>
                  {user.customerVerified ? (
                    <span className="badge bg-success">Verified</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-warning"
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
                      className="btn btn-sm btn-warning"
                      onClick={() => handleVerifyAddress(user.id)}
                    >
                      Verify
                    </button>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    disabled={!user.customerVerified || !user.addressVerified}
                    onClick={() => handleApprove(user.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleReject(user.id)}
                  >
                    Reject
                  </button>
                </td>

    
              </tr>
            ))}

            {customers.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="text-center">
                  No pending customers
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


/*
      <td>
                  CV: {String(user.customerVerified)} <br />
                  AV: {String(user.addressVerified)}
                </td>
*/