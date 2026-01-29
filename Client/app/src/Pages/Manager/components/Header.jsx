import { Bell, Settings, CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Header.css";

export default function Header() {
  const [user, setUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/bankify/manager/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
    } catch {
      toast.error("Profile load failed");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* ================= EDIT PROFILE ================= */
  const editManagerDetails = async () => {
    try {
      const body = {
        name: user.name,
        contactNo: user.contactNo,
      };

      const res = await axios.put(
        `http://localhost:8080/bankify/manager/edit-details/${userId}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status === "Success") {
        toast.success("Profile updated successfully!");

        // Close modal
        const modal = document.getElementById("editProfileModal");
        if (modal) {
          const closeBtn = modal.querySelector(".btn-close");
          if (closeBtn) closeBtn.click();
        }

        // Refresh profile
        loadProfile();
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  /* ================= UPDATE PASSWORD ================= */
  const updatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warn("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8080/bankify/manager/update-password/${userId}`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status === "Success") {
        toast.success("Password updated successfully");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        const modal = document.getElementById("changePasswordModal");
        if (modal) {
          const closeBtn = modal.querySelector(".btn-close");
          if (closeBtn) closeBtn.click();
        }
      }
    } catch {
      toast.error("Password update failed");
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <div className="header-left">
          <h5 className="mb-1 fw-semibold">Welcome back, {user?.name}</h5>
          <small>{today}</small>
        </div>

        <div className="header-right">
          <button className="icon-btn">
            <Bell size={20} />
          </button>

          <button
            className="icon-btn"
            data-bs-toggle="modal"
            data-bs-target="#editProfileModal"
          >
            <Settings size={20} />
          </button>

          <button
            className="icon-btn"
            data-bs-toggle="modal"
            data-bs-target="#viewProfileModal"
          >
            <CircleUser size={20} />
          </button>
        </div>
      </div>

      <div className="content-offset" />

      {/* ================= VIEW PROFILE ================= */}
      <div className="modal fade" id="viewProfileModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header gradient-header">
              <h5 className="text-white mb-0">Profile</h5>
              <button
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Contact:</strong> {user?.contactNo}</p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-gradient"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#changePasswordModal"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE ================= */}
      <div className="modal fade" id="editProfileModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header gradient-header">
              <h5 className="text-white mb-0">Edit Profile</h5>
              <button
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                value={user.name || ""}
                placeholder="Name"
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control"
                value={user.contactNo || ""}
                placeholder="Contact Number"
                onChange={(e) =>
                  setUser({ ...user, contactNo: e.target.value })
                }
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-gradient"
                onClick={editManagerDetails}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CHANGE PASSWORD ================= */}
      <div className="modal fade" id="changePasswordModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header gradient-header">
              <h5 className="text-white mb-0">Change Password</h5>
              <button
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-gradient"
                onClick={updatePassword}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
