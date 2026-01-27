import { Link } from "react-router-dom";
import logo from "../../../images/bank-account.png";

export default function Sidebar() {
  return (
    <nav
      className="navbar bg-body-tertiary d-flex flex-column p-3 shadow"
      style={{ width: "300px", minHeight: "100vh" }}
    >
      <div className="container-fluid flex-column align-items-start p-0">


        <div className="d-flex mb-4 align-items-center">
          <img src={logo} alt="Logo" width="45" height="45" />
          <div className="fs-6 ms-3">
            <strong>Bankify Manager</strong>
            <div className="fs-6 opacity-50">Management Portal</div>
          </div>
        </div>

        <ul className="navbar-nav flex-column w-100 mb-3">

          <li className="nav-item">
            <Link className="nav-link" to="">
              Create Account
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="dashboard">
              Approve / Reject
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="transactions">
              Transactions
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="users">
              Manage Users
            </Link>
          </li>

        </ul>
      </div>
             <button className="btn btn-outline-dark btn3 mt-auto"
  style={{ position: "sticky", bottom: "20px" }}
             >

                Logout
            </button>

      <div className="card-footer text-body-secondary w-100 text-center" 
        style={{ position: "sticky", bottom: "20px" }}

      >
      </div>
    </nav>
  );
}
