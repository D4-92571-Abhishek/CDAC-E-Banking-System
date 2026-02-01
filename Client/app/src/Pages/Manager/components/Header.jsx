import { Phone, Mail, Edit, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../../services/axios";

export default function Header() {
  const [user, setUser] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userId = sessionStorage.getItem("userId");

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

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(`/manager/update-password/${userId}`, {
        currentPassword: oldPassword,
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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "280px", // leave space for sidebar
          width: "calc(100% - 280px)",
          height: "70px",
          backgroundColor: "#606462",
          color: "#fff",
          zIndex: 1050,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <div>
          <h5 className="fw-bold mb-0">Welcome back, {user.name} 👋</h5>
          <div className="d-flex gap-3 align-items-center mt-1">
            <span className="d-flex align-items-center gap-1">
              <Phone size={14} /> {user.contactNo}
            </span>
            <span className="d-flex align-items-center gap-1">
              <Mail size={14} /> {user.email}
            </span>
          </div>
        </div>

        {/* FIXED BUTTONS */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-light btn-sm fw-semibold shadow-sm"
            onClick={() => setShowEdit(true)}
            style={{ minWidth: "120px" }}
          >
            Edit Details
          </button>

          <button
            className="btn btn-warning btn-sm fw-semibold shadow-sm"
            onClick={() => setShowPassword(true)}
            style={{ minWidth: "140px" }}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* SPACING BELOW FIXED HEADER */}
      <div style={{ height: "70px" }} />

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg rounded-4">
              <div className="modal-header bg-primary text-white rounded-top-4">
                <h5 className="mb-0">Edit Profile</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowEdit(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    className="form-control form-control-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Contact No</label>
                  <input
                    className="form-control form-control-lg"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary rounded-pill"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary rounded-pill"
                  onClick={updateProfile}
                >
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
            <div className="modal-content shadow-lg rounded-4">
              <div className="modal-header bg-warning text-dark rounded-top-4">
                <h5 className="mb-0">Change Password</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowPassword(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Current Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">New Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary rounded-pill"
                  onClick={() => setShowPassword(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-warning rounded-pill"
                  onClick={changePassword}
                >
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
