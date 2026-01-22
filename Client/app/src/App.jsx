import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/Default Home Page/HomePage";
import { DefaultHomePage } from "./Pages/Default Home Page/DefaultHomePage";
import { About } from "./Pages/Default Home Page/About";
import { Services } from "./Pages/Default Home Page/Services";
import { ContactUs } from "./Pages/Default Home Page/ContactUs";
import LoginLogoutPage from "./Pages/Login & Register/LoginLogoutPage";
import Login from "./Pages/Login & Register/Login";
import Register from "./Pages/Login & Register/Register";
import AdminHome from './Pages/Admin/components/AdminHome';
import Dashboard from './Pages/Admin/pages/Dashboard/Dashboard';
import Customers from './Pages/Admin/pages/Customers/Customers';
import Managers from './Pages/Admin/pages/Managers/Managers';
import Loans from './Pages/Admin/pages/Loans/Loans';
import DashboardUI from "./Pages/Customer/components/DashBoard/DashBoard";
import TransactionHistory from './Pages/Customer/components/TransactionHistory/TransactionHistory';
import ReceivePayment from './Pages/Customer/components/ReceivePayment/ReceivePayment';
import CurrentLoansUI from './Pages/Customer/components/LoanHistory/LoanPage';
import LoanApplicationUI from './Pages/Customer/components/ApplyForLoan/ApplyForLoan';
import NavBar from './Pages/Customer/components/NavBar/NavBar';
import FundTransferUI from './Pages/Customer/components/FundTransfer/FundTransfer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="home" element={<DefaultHomePage />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>
          <Route path="loginlogoutpage" element={<LoginLogoutPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path='/admin' element={<AdminHome />}>
            <Route path='' element={<Dashboard />} />

            <Route path='customers' element={<Customers />}></Route>
            <Route path='managers' element={<Managers />}></Route>
            <Route path='loans' element={<Loans />}></Route>
          </Route>
          <Route path="/customer" element={<NavBar />}>
            <Route path="dashboard" element={<DashboardUI />} />
            <Route path="transaction" element={<TransactionHistory />} />
            <Route path="payment" element={<ReceivePayment />} />
            <Route path="fund-transfer" element={<FundTransferUI />} />
            <Route path="loan" element={<CurrentLoansUI />} />
            <Route path="loandepartment" element={<LoanApplicationUI />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
