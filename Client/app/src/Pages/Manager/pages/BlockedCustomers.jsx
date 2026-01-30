import { useEffect, useState } from "react";
import { getBlockedCustomers, unblockCustomer } from "../../../services/manager";

export default function BlockedCustomers() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadBlockedCustomers = async () => {
    try {
      setLoading(true);
      const res = await getBlockedCustomers();
      setBlockedUsers(res.data);
    } catch (err) {
      alert("Failed to load blocked customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlockedCustomers();
  }, []);

  const handleUnblock = async (userId) => {
    try {
      await unblockCustomer(userId);
      alert("Customer unblocked successfully!");
      loadBlockedCustomers(); // refresh list
    } catch (err) {
      alert("Failed to unblock customer");
    }
  };

  // FILTER BLOCKED USERS BY SEARCH TERM
  const filteredUsers = blockedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <h5 className="mb-4">Blocked / Rejected Customers</h5>

      <div className="card shadow-sm rounded-4 border-0">
        {/* HEADER WITH SEARCH */}
        <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white rounded-top-4">
          <h6 className="mb-0">Blocked Customers</h6>
          <input
            type="text"
            className="form-control form-control-sm w-25"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="card-body p-0">
          <div className="table-responsive">
            {loading ? (
              <p className="text-center py-4">Loading...</p>
            ) : filteredUsers.length === 0 ? (
              <p className="text-center text-muted py-4">No blocked users found.</p>
            ) : (
              <table className="table align-middle mb-0">
                <thead className="table-primary text-white">
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.userId}
                      className="border-bottom"
                      style={{ transition: "all 0.2s ease-in-out" }}
                    >
                      {/* NAME + EMAIL */}
                      <td>
                        <div className="fw-semibold text-primary">{user.name}</div>
                        <small className="text-muted">{user.email}</small>
                      </td>

                      {/* CONTACT */}
                      <td className="fw-medium">{user.contactNo}</td>

                      {/* ACTION */}
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-success rounded-pill px-3"
                          onClick={() => handleUnblock(user.userId)}
                        >
                          Unblock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
