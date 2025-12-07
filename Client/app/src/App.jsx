import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./Pages/Default Home Page/HomePage";
import { DefaultHomePage } from "./Pages/Default Home Page/DefaultHomePage";
import { About } from "./Pages/Default Home Page/About";
import { Services } from "./Pages/Default Home Page/Services";
import { ContactUs } from "./Pages/Default Home Page/ContactUs";
import LoginLogoutPage from "./Pages/Login & Register/LoginLogoutPage";
import Login from "./Pages/Login & Register/Login";
import Register from "./Pages/Login & Register/Register";

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
          </Route>
          <Route path="loginlogoutpage" element={<LoginLogoutPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
