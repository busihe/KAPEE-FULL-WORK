import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import the icons

interface User {
  _id?: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User>({
    username: "",
    email: "",
    role: "user",
    password: "",
  });

  const API_URL = "http://localhost:5000/api/auth";

  // Get current logged-in user email from localStorage (adjust as needed)
  const currentUserEmail = localStorage.getItem("userEmail");

  // ✅ Fetch users with token
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // get token
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Export users to CSV
  const exportToCSV = () => {
    if (users.length === 0) return;

    const csvRows = [
      ["Username", "Email", "Role"],
      ...users.map((user) => [user.username, user.email, user.role]),
    ];
    const csvContent = csvRows.map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const targetUser = editingUserId ? editingUser : newUser;
    const setTarget = editingUserId ? setEditingUser : setNewUser;
    setTarget({ ...targetUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        setNewUser({ username: "", email: "", password: "", role: "user" });
        fetchUsers();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user._id || null);
    setEditingUser({
      username: user.username,
      email: user.email,
      role: user.role,
      password: "",
    });
  };

  // Update user
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(`${API_URL}/users/${editingUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingUser),
      });

      if (res.ok) {
        setEditingUserId(null);
        setEditingUser({ username: "", email: "", password: "", role: "user" });
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">Users Page</h1>

      <button
        onClick={exportToCSV}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
      >
        Export Users CSV
      </button>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4 text-black">Users List</h2>
        <table className="w-full table-auto border-collapse text-black">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className={`border-b ${
                  user.email === currentUserEmail
                    ? "bg-yellow-100 font-semibold"
                    : "bg-white"
                }`}
              >
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                  >
                    <FiEdit size={20} />
                  </button>
                  {user._id && (
                    <button
                      onClick={() => handleDelete(user._id!)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Form */}
      <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          {editingUserId ? "Edit User" : "Add New User"}
        </h2>
        <form
          onSubmit={editingUserId ? handleUpdate : handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block font-semibold mb-2 text-black">Username</label>
            <input
              type="text"
              name="username"
              value={editingUserId ? editingUser.username : newUser.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-black">Email</label>
            <input
              type="email"
              name="email"
              value={editingUserId ? editingUser.email : newUser.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-black">Password</label>
            <input
              type="password"
              name="password"
              value={editingUserId ? editingUser.password : newUser.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required={!editingUserId}
              placeholder={editingUserId ? "Leave blank to keep current password" : ""}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-black">Role</label>
            <select
              name="role"
              value={editingUserId ? editingUser.role : newUser.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded"
            >
              {editingUserId ? "Update User" : "Add User"}
            </button>
            {editingUserId && (
              <button
                type="button"
                onClick={() => setEditingUserId(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
