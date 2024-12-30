import axios from "axios";

const baseURL =
  "https://useractivitylogs-backend.onrender.com" || "http://localhost:5000";
// const baseURL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
