import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";

export default function ManagerHome() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{ backgroundColor: "#f8f9fa", overflow: "auto" }}
      >
        {/* Top Header */}
        <Header />

        {/* 🔥 DASHBOARD HEADING (COMMON FOR ALL PAGES) */}
        <div className="px-4 pt-4">
          <h5 className="fw-bold mb-3">Dashboard Overview</h5>
        </div>

        {/* 🔥 STATS CARDS */}
        <div className="px-4">
          <StatsCards />
        </div>

        {/* Page-specific content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
