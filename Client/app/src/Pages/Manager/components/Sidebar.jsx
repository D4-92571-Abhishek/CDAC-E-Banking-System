import { IDLE_BLOCKER, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../images/bank-account.png";
import axios from "../../../services/axios";
import { LayoutDashboard, Users, CheckCircle, Wallet, LogOut, Blocks, Cross, X } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    console.log("LOGOUT CLICKED");
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/loginlogoutpage/login");
  };

  const navLinkClass = ({ isActive }) =>
    `d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-medium text-decoration-none ${
      isActive ? "bg-primary text-white shadow-sm" : "text-dark hover-bg-light"
    }`;

  return (
    <nav
      className="d-flex flex-column p-4 shadow-sm"
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#527ba3",
        zIndex: 1000,
      }}
    >
      {/* Logo Section */}
      <div className="d-flex align-items-center mb-5">
        <img src={logo} alt="Logo" width="50" className="shadow-sm rounded-circle" />
        <div className="ms-3">
          <h5 className="mb-0 fw-bold text-dark">Bankify Manager</h5>
          <small className="text-muted">Management Portal</small>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="navbar-nav flex-column gap-2">
        <li className="nav-item">
          <NavLink to="" end className={navLinkClass}>
            <LayoutDashboard size={20} />
            Create Account
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="dashboard" className={navLinkClass}>
            <CheckCircle size={20} />
            Approve / Reject
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="transactions" className={navLinkClass}>
            <Wallet size={20} />
            Transactions
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="blocked-customers" className={navLinkClass}>
            <X size={20} />
            Rejected Applications
          </NavLink>
        </li>
      </ul>

      {/* Logout Button */}
      <button
        className="btn btn-outline-danger mt-auto d-flex align-items-center justify-content-center gap-2 fw-semibold rounded-pill shadow-sm"
        style={{
          position: "absolute",
          bottom: "30px",
          width: "100px",
          left: "80px",
          transition: "all 0.3s",

        }}
        onClick={logout}
      >
        <LogOut size={20} />
        Logout
      </button>
    </nav>
  );
}
