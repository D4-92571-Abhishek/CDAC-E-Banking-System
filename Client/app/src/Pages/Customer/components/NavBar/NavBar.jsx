import { Outlet, NavLink, useNavigate } from "react-router-dom";
import './NavBar.css';

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="d-flex">

      <div className="sidebar bg-white border-end p-3" style={{ minHeight: "100vh" }}>
        <div className="d-flex align-items-center mb-4">
          <div
            className="rounded-circle bg-dark d-flex justify-content-center align-items-center text-white me-2"
            style={{ width: "38px", height: "38px" }}
          >
            B
          </div>
          <div>
            <h6 className="fw-semibold mb-0">Bankify</h6>
            <small className="text-secondary">Customer Portal</small>
          </div>
        </div>

        <nav className="nav flex-column gap-2">

          <NavLink to="/dashboard" className="nav-link px-3 py-2">
            Dashboard
          </NavLink>

          <NavLink to="/transaction" className="nav-link px-3 py-2">
            Transactions
          </NavLink>

          <NavLink to="/fund-transfer" className="nav-link px-3 py-2">
            Fund Transfer
          </NavLink>

          <NavLink to="/payment" className="nav-link px-3 py-2">
            Receive Payment
          </NavLink>

          <NavLink to="/loan" className="nav-link px-3 py-2">
            Loan Department
          </NavLink>

          <button className="btn3 btn-dark rounded-0" onClick={() => navigate("/")}>
            Logout
          </button>
        </nav>
      </div>

      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>

    </div>
  );
}
