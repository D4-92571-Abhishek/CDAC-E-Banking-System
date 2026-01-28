import { Phone, Mail, Edit, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../../services/axios";

export default function Header() {
  const [user, setUser] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userId = sessionStorage.getItem("userId"); // 👈 SAME AS HIS

  // edit profile
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");

  // password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    axios
      .get("/manager/me")
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setContactNo(res.data.contactNo);
      })
      .catch(() => console.error("Profile load failed"));
  }, []);

  // ===== UPDATE PROFILE =====
  const updateProfile = async () => {
    try {
      await axios.put(`/manager/edit-details/${userId}`, {
        name,
        contactNo,
      });

      setUser({ ...user, name, contactNo });
      setShowEdit(false);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  // ===== CHANGE PASSWORD =====
  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(`/manager/update-password/${userId}`, {
        currentPassword: oldPassword, // 👈 backend expects this
        newPassword,
      });

      alert("Password changed successfully");
      setShowPassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert("Password change failed");
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="card p-3 mb-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-bold mb-1">Welcome back, {user.name} 👋</h5>
            <div className="text-muted small d-flex gap-3">
              <span className="d-flex align-items-center gap-1">
                <Phone size={14} /> {user.contactNo}
              </span>
              <span className="d-flex align-items-center gap-1">
                <Mail size={14} /> {user.email}
              </span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm rounded-circle"
              onClick={() => setShowEdit(true)}
            >
              <Edit size={16} />
            </button>

            <button
              className="btn btn-outline-warning btn-sm rounded-circle"
              onClick={() => setShowPassword(true)}
            >
              <KeyRound size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Profile</h5>
                <button className="btn-close" onClick={() => setShowEdit(false)} />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />

                <input
                  className="form-control"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  placeholder="Contact No"
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEdit(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={updateProfile}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPassword && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Change Password</h5>
                <button className="btn-close" onClick={() => setShowPassword(false)} />
              </div>

              <div className="modal-body">
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Current Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowPassword(false)}>
                  Cancel
                </button>
                <button className="btn btn-warning" onClick={changePassword}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
