// import React from "react";
// import bankIcon from "../../../images/bank-account.png";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//     const navigate = useNavigate();
//   return (
//     <nav
//       className="navbar bg-body-tertiary d-flex flex-column p-3"
//       style={{ width: "300px", minHeight: "100vh" }}
//     >
//       <div className="container-fluid flex-column align-items-start p-0">
//         <div className="d-flex mb-3">
//           <div>
//             <img src={bankIcon} alt="" width={45} height={45} />
//           </div>
//           <div className="fs-6 ms-3">
//             Bankify Admin
//             <div className="fs-6 opacity-50">Management Portal</div>
//           </div>
//         </div>

//         <ul className="navbar-nav flex-column w-100 mb-3">
//           <li className="nav-item">
//             <Link className="nav-link" to="/admin">
//               Dashboard
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/admin/customers">
//               Customers
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/admin/managers">
//               Managers
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/admin/loans ">
//               Loan Accounts
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <div>
//         <button
//           className="btn btn-dark rounded-0 "
//           style={{ marginTop: "20rem",width:"15rem" }}
//           onClick={() => navigate("/")}
//         >
//           Logout
//         </button>
//       </div>
//       <div className="card-footer text-body-secondary ">Admin v1.0</div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import bankIcon from "../../../images/bank-account.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav
      className="navbar bg-body-tertiary p-3"
      style={{
        width: "300px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="d-flex flex-column h-100 w-100">
        {/* Header */}
        <div className="d-flex mb-4">
          <img src={bankIcon} alt="Bank" width={45} height={45} />
          <div className="fs-6 ms-3">
            Bankify Admin
            <div className="fs-6 opacity-50">Management Portal</div>
          </div>
        </div>

        {/* Menu */}
        <ul className="navbar-nav flex-column w-100">
          <li className="nav-item">
            <Link className="nav-link" to="/admin">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin/customers">
              Customers
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin/managers">
              Managers
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin/loans">
              Loan Accounts
            </Link>
          </li>
        </ul>

        {/* Bottom Section */}
        <div className="mt-auto w-100">
          <button
            className="btn btn-dark w-100 rounded-0"
            onClick={handleLogout}
          >
            Logout
          </button>

          <div className="text-center text-body-secondary mt-2">
            Admin v1.0
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
