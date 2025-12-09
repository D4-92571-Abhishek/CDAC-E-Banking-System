import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { PrivacyPolicy } from "./Pages/Default Home Page/PrivacyPolicy";
import { TermsAndServices } from './Pages/Default Home Page/TermsAndServices';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
          <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<DefaultHomePage />} />
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
          <Route path='/admin' element={<AdminHome />}>
            <Route path='' element={<Dashboard />} />
            <Route path='customers' element={<Customers />}></Route>
            <Route path='managers' element={<Managers />}></Route>
            <Route path='loans' element={<Loans />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
