import axios from "./axios";

export const getDashboardStats = () => {
  return axios.get("/dashboard/stats");
};