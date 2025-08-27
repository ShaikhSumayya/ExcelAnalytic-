// UserTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  };

 const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    alert("User deleted successfully");
    fetchUsers(); // Refresh the user list
  } catch (error) {
    console.error("Delete error:", error);
    alert("Delete failed: " + (error.response?.data?.message || error.message));
  }
};


  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${editUser._id}`,
        formData
      );
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#4E73DF]">User List</h2>
      <table className="min-w-full text-left border">
        <thead className="bg-[#f1f5f9] text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 capitalize">{user.role}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[400px] shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                className="w-full border p-2 mt-1"
                value={formData.name}
                onChange={handleEditChange}
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                className="w-full border p-2 mt-1"
                value={formData.email}
                onChange={handleEditChange}
              />
            </label>
            <label className="block mb-4">
              Role:
              <select
                name="role"
                className="w-full border p-2 mt-1"
                value={formData.role}
                onChange={handleEditChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditUser(null)}
                className="bg-gray-400 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitEdit}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
