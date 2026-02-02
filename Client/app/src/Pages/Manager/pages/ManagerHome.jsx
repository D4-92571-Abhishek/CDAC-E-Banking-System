import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


export default function ManagerHome() {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "280px", 
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
