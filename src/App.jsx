import React, { useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
// import io from "socket.io-client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Logs from "./pages/admin/Logs";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProfileDetail from "./pages/user/ProfileDetails";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Header from "./components/Header";
import ResetPassword from "./pages/auth/ResetPassword";
// import NotificationPanel from "./components/admin/NotificationPanel";

const App = () => {
  const { user } = useAuth();

  // const socket = useMemo(() => {
  //   return io(import.meta.env.REACT_APP_SOCKET_URL || "http://localhost:5000");
  // }, []);
  // useEffect(() => {
  //   if (user?.role === "admin") {
  //     socket.emit("admin_login", { role: user.role });
  //     socket.on("critical-notification", (data) => {
  //       toast.info(`${data.message} - ${data.timestamp}`);
  //     });
  //   }

  //   return () => {
  //     socket.off("critical-notification");
  //   };
  // }, [user]);

  const Home = () => {
    return user?.role === "admin" ? <Logs /> : <ProfileDetail />;
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Header />
              <Home />
              {/* {user?.role === "admin" && <NotificationPanel />} */}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
