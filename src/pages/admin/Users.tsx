import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // Heroicons

interface User {
  _id?: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, "_id">>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<Omit<User, "_id">>({
    username: "",
    email: "",
    role: "user",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");
      const res = await fetch("http://localhost:5000/api/auth/login", {
        headers: { Authorization: `Bearer ${token}` },
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const targetUser = editingUserId ? editingUser : newUser;
    const setTarget = editingUserId ? setEditingUser : setNewUser;
    setTarget({ ...targetUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");
      const res = await fetch("http://localhost:5000/api/auth/register", {
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
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login.");
        const res = await fetch(`http://localhost:5000/api/auth/login/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) fetchUsers();
      }
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");
      const res = await fetch(`http://localhost:5000/api/auth/login/${editingUserId}`, {
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
    <div className="bg-gray-50 min-h-screen py-8 pl-0 pr-4">
      <div className="max-w-xl mr-0">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
          👥 Users Page
        </h1>

        {/* Users Table */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-10 overflow-x-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Users List
          </h2>
          <table className="w-full table-auto border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                <th className="border px-3 py-1 text-left">Username</th>
                <th className="border px-3 py-1 text-left">Email</th>
                <th className="border px-3 py-1 text-left">Role</th>
                <th className="border px-3 py-1 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition text-gray-800"
                >
                  <td className="border px-2 py-1">{user.username}</td>
                  <td className="border px-2 py-1">{user.email}</td>
                  <td className="border px-2 py-1 capitalize">{user.role}</td>
                  <td className="border px-2 py-1 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-transform hover:scale-105 w-full sm:w-auto text-xs"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => user._id && handleDelete(user._id)}
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-transform hover:scale-105 w-full sm:w-auto text-xs"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit User Form */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            {editingUserId ? "Edit User" : "Add New User"}
          </h2>
          <form
            onSubmit={editingUserId ? handleUpdate : handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium text-gray-800 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={editingUserId ? editingUser.username : newUser.username}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editingUserId ? editingUser.email : newUser.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={editingUserId ? editingUser.password : newUser.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required={!editingUserId}
                placeholder={editingUserId ? "Leave blank to keep current password" : ""}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-1">Role</label>
              <select
                name="role"
                value={editingUserId ? editingUser.role : newUser.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
              >
                {editingUserId ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
