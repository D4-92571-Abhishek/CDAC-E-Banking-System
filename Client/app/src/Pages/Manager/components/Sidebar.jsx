 import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../images/bank-account.png";
import axios from "../../../services/axios";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  Wallet,
  LogOut,
} from "lucide-react";

export default function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
      console.log("LOGOUT CLICKED");

    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/loginlogoutpage/login");
  };

  return (
    <nav
      className="bg-body-tertiary d-flex flex-column p-4 shadow"
      style={{
        width: "280px",
        minHeight: "100vh",
        flexShrink: 0, // 🔴 VERY IMPORTANT: prevents layout shifting
      }}
    >
      {/* Logo Section */}
      <div className="d-flex align-items-center mb-4">
        <img src={logo} alt="Logo" width="42" />
        <div className="ms-3">
          <h6 className="mb-0 fw-bold">Bankify Manager</h6>
          <small className="text-muted">Management Portal</small>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="navbar-nav flex-column gap-2">
        <li className="nav-item">
          <NavLink
            to=""
            end
            className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
          >
            <LayoutDashboard size={18} />
            Create Account
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="dashboard"
            className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
          >
            <CheckCircle size={18} />
            Approve / Reject
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="transactions"
            className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
          >
            <Wallet size={18} />
            Transactions
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="users"
            className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
          >
            <Users size={18} />
            Manage Users
          </NavLink>
        </li>
      </ul>

      {/* Logout Button */}
      <button className="btn btn-outline-danger mt-auto d-flex align-items justify-content-center gap-2"
      style={{
    position: "fixed",
    bottom: "20px",
    left: "20px",
    width: "220px",
    zIndex: 1000
  }}

  onClick={logout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </nav>
  );
}
