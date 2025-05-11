import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import UserForm from "./UserForm";
import { Dialog, DialogContent } from '@mui/material';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://crud-sever-ten.vercel.app/api/user");
      setUsers(res.data);
    } catch (err) {
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crud-sever-ten.vercel.app/api/delete/user/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      toast.error("Error deleting user.");
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowForm(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-4xl mx-auto absolute top-4 sm:top-8 md:top-12 lg:top-15 left-0 right-0 backdrop-blur-sm bg-white/60 rounded-lg shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-950">CRUD PROJECT</h2>
        <button 
          onClick={() => { setShowForm(true); setEditUser(null); }}
          className="w-full sm:w-auto bg-gray-950 hover:bg-gray-800 cursor-pointer text-white font-light py-1.5 px-4 rounded-lg shadow text-xs sm:text-sm transition duration-200 ease-in-out transform focus:outline-none focus:ring focus:ring-gray-900"
        >
          Add New User
        </button>
      </div>

      {/* Modal */}
      <Dialog 
        open={showForm} 
        onClose={() => setShowForm(false)} 
        className="bg-gray-50/5 backdrop-blur-xs"
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <UserForm
            fetchUsers={fetchUsers}
            editUser={editUser}
            setShowForm={setShowForm}
          />
        </DialogContent>
      </Dialog>

      {/* Table */}
      <div className="mt-4 overflow-x-auto bg-white/0 backdrop-blur-xs rounded-lg shadow">
        {users.length === 0 ? (
          <div className="p-4 text-center text-gray-950">
            <p className="text-sm md:text-base font-medium">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-500">
              <thead className="bg-gray-300/50 backdrop-blur-xs">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xxs xs:text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xxs xs:text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xxs xs:text-xs font-bold text-gray-900 uppercase tracking-wider hidden md:table-cell">Address</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xxs xs:text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-300/30 backdrop-blur-xs divide-y divide-gray-400">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-300/50 transition-colors">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[100px] sm:max-w-none">{u.name}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 truncate max-w-[100px] sm:max-w-none">{u.email}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 hidden md:table-cell truncate max-w-[200px] lg:max-w-none">{u.address}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                      <div className="flex justify-end space-x-1 sm:space-x-2">
                        <button
                          onClick={() => handleEdit(u)}
                          className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors p-1"
                          title="Edit User"
                        >
                          <FaEdit className="text-sm sm:text-base" />
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors p-1"
                          title="Delete User"
                        >
                          <FaTrash className="text-sm sm:text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;