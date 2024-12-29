import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io(import.meta.env.VITE_API_BASE_URL);

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("critical-notification", (notification) => {
      toast(notification.message);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      socket.off("critical-notification");
    };
  }, []);

  const markAsRead = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="notification-panel">
      <h2>Notification Panel</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <div>
              <p>{notification.message}</p>
              <span>{new Date(notification.timestamp).toLocaleString()}</span>
              <button onClick={() => markAsRead(index)}>Dismiss</button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default NotificationPanel;
