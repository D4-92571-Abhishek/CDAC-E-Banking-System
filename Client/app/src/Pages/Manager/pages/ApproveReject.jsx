import { useEffect, useState } from "react";
import "./ApproveReject.css";
import { CheckCircle, XCircle, UserCheck, Home } from "lucide-react";
import { toast } from "react-toastify";
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingCustomers();
  }, []);

  return (
    <div>
      <h5>Dashboard Overview</h5>

      <div className="mt-4 mb-4">
        <h2 className="fw-bold text-dark mb-2">Customer Approvals</h2>
        <p className="text-muted">Verify KYC and approve or reject customers</p>
      </div>

      <div className="card border-0 shadow-sm rounded-3 overflow-hidden mt-4">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead style={{ backgroundColor: "rgba(102, 126, 234, 0.05)" }}>
              <tr>
                <th className="border-0 py-4 px-4 fw-semibold">Name</th>
                <th className="border-0 py-4 px-4 fw-semibold">Email</th>
                <th className="border-0 py-4 px-4 fw-semibold">Mobile</th>
                <th className="border-0 py-4 px-4 fw-semibold">Customer KYC</th>
                <th className="border-0 py-4 px-4 fw-semibold">Address</th>
                <th className="border-0 py-4 px-4 fw-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="6" className="py-5 text-center text-muted">
                    Loading pending customers...
                  </td>
                </tr>
              )}

              {!loading && customers.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-5 text-center text-muted">
                    No pending customers
                  </td>
                </tr>
              )}

              {customers.map((user) => (
                <tr key={user.id} className="border-bottom hover-row">
                  <td className="py-4 px-4 fw-semibold">{user.name}</td>
                  <td className="py-4 px-4 text-muted">{user.email}</td>
                  <td className="py-4 px-4">{user.contactNo}</td>

                  {/* Customer Verified */}
                  <td className="py-4 px-4">
                    {user.customerVerified ? (
                      <span
                        className="badge text-success"
                        style={{ backgroundColor: "rgba(40,167,69,0.1)" }}
                      >
                        <UserCheck size={14} className="me-1" />
                        Verified
                      </span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-primary rounded-2"
                        onClick={async () => {
                          try {
                            await verifyCustomer(user.id);
                            toast.success("Customer verified successfully ✅");
                            loadPendingCustomers();
                          } catch {
                            toast.error("Failed to verify customer");
                          }
                        }}
                      >
                        Verify
                      </button>
                    )}
                  </td>

                  {/* Address Verified */}
                  <td className="py-4 px-4">
                    {user.addressVerified ? (
                      <span
                        className="badge text-success"
                        style={{ backgroundColor: "rgba(40,167,69,0.1)" }}
                      >
                        <Home size={14} className="me-1" />
                        Verified
                      </span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-primary rounded-2"
                        onClick={async () => {
                          try {
                            await verifyAddress(user.id);
                            toast.success("Address verified successfully 🏠");
                            loadPendingCustomers();
                          } catch {
                            toast.error("Failed to verify address");
                          }
                        }}
                      >
                        Verify
                      </button>
                    )}
                  </td>

                  {/* Approve / Reject */}
                  <td className="py-4 px-4 text-center">
                    <button
                      className="btn btn-sm btn-success me-2 rounded-2"
                      disabled={
                        !user.customerVerified || !user.addressVerified
                      }
                      onClick={async () => {
                        try {
                          await approveCustomer(user.id);
                          toast.success("Customer approved successfully 🎉");
                          loadPendingCustomers();
                        } catch {
                          toast.error("Failed to approve customer");
                        }
                      }}
                    >
                      <CheckCircle size={14} className="me-1" />
                      Approve
                    </button>

                    <button
                      className="btn btn-sm btn-danger rounded-2"
                      onClick={async () => {
                        try {
                          await rejectCustomer(user.id);
                          toast.success("Customer rejected ❌");
                          loadPendingCustomers();
                        } catch {
                          toast.error("Failed to reject customer");
                        }
                      }}
                    >
                      <XCircle size={14} className="me-1" />
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
