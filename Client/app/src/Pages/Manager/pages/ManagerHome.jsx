import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function ManagerHome() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar - Fixed position */}
      <Sidebar />

      {/* Main Content - Uses remaining space */}
      <div className="flex-grow-1" style={{ backgroundColor: "#f8f9fa", overflow: "auto" }}>
        <Header />   {/* manager info + buttons */}
        <div className="p-4">
          <Outlet /> {/* pages load here */}
        </div>
      </div>
    </div>
  );
}
