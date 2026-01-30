import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function ManagerHome() {
  return (
    <>
      {/* FIXED SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div
        style={{
          marginLeft: "280px", // 👈 same as sidebar width
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Header />

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
