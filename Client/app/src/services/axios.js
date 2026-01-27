import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/bankify",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;