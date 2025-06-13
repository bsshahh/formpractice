import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editedUser, setEditedUser] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {});
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axiosInstance.delete(`/user/udelete/${userId}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleEdit = async (user) => {
    setEditing(user._id);
    setEditedUser({
      firstname: user.firstname,
      lastname: user.lastname,
      mobile: user.mobile,
    });
  };

  const handleSave = async (userId) => {
    try {
      const res = await axiosInstance.put(`/user/updatedetail/${userId}`,editedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, ...editedUser } : user
        )
      );
      setEditing(null);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setEditedUser({ firstname: "", lastname: "", mobile: "" });
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axiosInstance.get("/auth/login-check");
        console.log(res.data.user.role);
        if (res.data.user.role !== "admin") {
          navigate("/dashboard"); // Not an admin? Redirect to user dashboard
        } else {
          setAdmin(res.data.user);
        }
      } catch (err) {
        console.error("Not authenticated:", err);
        navigate("/login");
      }
    };
    fetchAdmin();
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/user/fetchuser");
        setUsers(res.data.userDetails);
      } catch (err) {
        console.error("failed to fetch users : ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-pink-100 to-rose-200 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-pink-200 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 tracking-wide drop-shadow">
            🌟 Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="mt-5 sm:mt-0 bg-gradient-to-r from-pink-500 via-red-500 to-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            🔓 Logout
          </button>
        </div>

        {/* Welcome */}
        {admin ? (
          <>
            <div className="mb-10">
              <p className="text-2xl font-medium text-gray-800 mb-1">
                👋 Welcome back,{" "}
                <span className="font-bold text-purple-800">
                  {admin.firstname} {admin.lastname}
                </span>
              </p>
              <p className="text-md text-gray-600">
                You're logged in with{" "}
                <span className="text-green-600 font-semibold">
                  admin privileges
                </span>
                .
              </p>
            </div>

            {/* Users Title */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-purple-700 border-b pb-2">
                📋 All Registered Users
              </h2>
            </div>

            {/* Users */}
            {loading ? (
              <p className="text-center text-purple-500 text-lg font-medium animate-pulse">
                Loading users...
              </p>
            ) : users.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                No users found.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-gradient-to-br from-white via-pink-50 to-purple-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="mb-4">
                      {editing === user._id ? (
                        <>
                          <input
                            type="text"
                            value={editedUser.firstname}
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                firstname: e.target.value,
                              })
                            }
                            className="w-full mb-2 border px-3 py-1 rounded"
                            placeholder="Firstname"
                          />
                          <input
                            type="text"
                            value={editedUser.lastname}
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                lastname: e.target.value,
                              })
                            }
                            className="w-full mb-2 border px-3 py-1 rounded"
                            placeholder="Lastname"
                          />
                          <input
                            type="text"
                            value={editedUser.mobile}
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                mobile: e.target.value,
                              })
                            }
                            className="w-full mb-2 border px-3 py-1 rounded"
                            placeholder="Mobile"
                          />
                          <p className="text-sm text-gray-700 mb-1">
                            📧 {user.email}
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-bold text-purple-800 mb-1">
                            {user.firstname} {user.lastname}
                          </h3>
                          <p className="text-sm text-gray-700 mb-1">
                            📧 {user.email}
                          </p>
                          <p className="text-sm text-gray-700">
                            📱 {user.mobile}
                          </p>
                        </>
                      )}
                    </div>

                    {editing === user._id ? (
                      <>
                        <button
                          onClick={() => handleSave(user._id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-all duration-200 shadow"
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-medium transition-all duration-200 shadow"
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all duration-200 shadow"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-all duration-200 shadow"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-lg text-gray-500 animate-pulse">
            Loading admin info...
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
