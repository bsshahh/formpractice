import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {});
      navigate("/login");
    } catch (err) {
      console.error("logout failed ", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/login-check");
        setUser(res.data.user);
      } catch (err) {
        console.error("Not authenticated:", err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-700">
        Dashboard
      </h2>
      {user ? (
        <>
          <p className="text-xl mb-4 text-center">
            Welcome, {user.firstname} {user.lastname}!
          </p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-center">Loading user info...</p>
      )}
    </div>
  );
};
export default Dashboard;