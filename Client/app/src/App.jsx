import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./Pages/Public/HomePage";
import { Home } from "./Pages/Public/Home";
import { About } from "./Pages/Public/About";
import { Services } from "./Pages/Public/Services";
import { ContactUs } from "./Pages/Public/ContactUs";
import LoginLogoutPage from "./Pages/Login & Register/LoginLogoutPage";
import Login from "./Pages/Login & Register/Login";
import Register from "./Pages/Login & Register/Register";
import AdminHome from "./Pages/Admin/components/AdminHome";
import Dashboard from "./Pages/Admin/pages/Dashboard/Dashboard";
import Customers from "./Pages/Admin/pages/Customers/Customers";
import Managers from "./Pages/Admin/pages/Managers/Managers";
import Loans from "./Pages/Admin/pages/Loans/Loans";
import { PrivacyPolicy } from "./Pages/Public/PrivacyPolicy";
import { TermsAndServices } from "./Pages/Public/TermsAndServices";
import DashboardUI from "./Pages/Customer/components/DashBoard/DashBoard";
import TransactionHistory from "./Pages/Customer/components/TransactionHistory/TransactionHistory";
import ReceivePayment from "./Pages/Customer/components/ReceivePayment/ReceivePayment";
import FundTransferUI from "./Pages/Customer/components/FundTransfer/FundTransfer";
import CurrentLoansUI from "./Pages/Customer/components/LoanHistory/LoanPage";
import LoanApplicationUI from "./Pages/Customer/components/ApplyForLoan/ApplyForLoan";
import NavBar from "./Pages/Customer/components/NavBar/NavBar";
import { ManagerHome } from "./Pages/Manager/pages/ManagerHome";
import CreateAccount from './Pages/Manager/pages/CreateAccount';
import ApproveReject from './Pages/Manager/pages/ApproveReject';
import Transactions from './Pages/Manager/pages/Transactions';
import Users from './Pages/Manager/pages/Users';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms-and-services" element={<TermsAndServices />} />
          </Route>
          <Route path="loginlogoutpage" element={<LoginLogoutPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
          </Route>
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<AdminHome />}>
            <Route path="" element={<Dashboard />} />
            <Route path="customers" element={<Customers />}></Route>
            <Route path="managers" element={<Managers />}></Route>
            <Route path="loans" element={<Loans />}></Route>
          </Route>
          <Route path="/customer" element={<NavBar />}>
            <Route path="" element={<DashboardUI />} />
            <Route path="transaction" element={<TransactionHistory />} />
            <Route path="payment" element={<ReceivePayment />} />
            <Route path="fund-transfer" element={<FundTransferUI />} />
            <Route path="loan" element={<CurrentLoansUI />} />
            <Route path="loandepartment" element={<LoanApplicationUI />} />
          </Route>
          <Route path="manager" element={<ManagerHome />}>
            <Route path="" element={<CreateAccount />} />
            <Route path="dashboard" element={<ApproveReject />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
