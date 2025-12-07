import React from "react";
import bankIcon from "../../../images/bank-account.png";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            className="navbar bg-body-tertiary d-flex flex-column p-3"
            style={{ width: "300px", minHeight: "100vh" }}
        >
            <div className="container-fluid flex-column align-items-start p-0">
                <div className="d-flex mb-3">
                    <div>
                        <img src={bankIcon} alt="" width={45} height={45} />
                    </div>
                    <div className="fs-6 ms-3">
                        Bankify Admin
                        <div className="fs-6 opacity-50">
                            Management Portal
                        </div>
                    </div>
                </div>

                <ul className="navbar-nav flex-column w-100 mb-3">
                    <li className="nav-item">
                       <Link className="nav-link" to="/admin" >
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
                        <Link className="nav-link" to="/admin/loans ">
                            Loan Accounts
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="card-footer text-body-secondary ">
                Admin v1.0
            </div>
        </nav>
    );
}

export default Navbar;
