import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserForm = ({ fetchUsers, editUser, setShowForm }) => {
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });

  useEffect(() => {
    if (editUser) setFormData(editUser);
  }, [editUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await axios.put(`https://crud-sever-ten.vercel.app/api/update/user/${editUser._id}`, formData);
        toast.success("User updated successfully!");
      } else {
        await axios.post("https://crud-sever-ten.vercel.app/api/user", formData);
        toast.success("User added successfully!");
      }
      fetchUsers();
      setShowForm(false);
      setFormData({ name: "", email: "", address: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full bg-white/40 backdrop-blur-md p-2 sm:p-4 md:p-6 rounded-lg">
      <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-950 mb-2 sm:mb-4 text-center">
        {editUser ? "Edit User" : "Add User"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-semibold text-gray-950">Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter full name" 
            onChange={handleChange} 
            value={formData.name}
            className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-100 focus:bg-gray-200 text-gray-950 font-medium rounded-md focus:outline-none transition-all duration-200 ease-in-out"
            required
          />
        </div>
        
        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-semibold text-gray-950">Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Enter email address" 
            onChange={handleChange} 
            value={formData.email}
            className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-100 focus:bg-gray-200 text-gray-950 font-medium rounded-md focus:outline-none transition-all duration-200 ease-in-out"
            required
          />
        </div>
        
        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-semibold text-gray-950">Address</label>
          <textarea 
            name="address" 
            placeholder="Enter complete address" 
            onChange={handleChange} 
            value={formData.address}
            rows={2}
            className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-100 focus:bg-gray-200 text-gray-950 font-medium rounded-md focus:outline-none transition-all duration-200 ease-in-out"
            required
          />
        </div>
        
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-0.5">
          <button 
            type="submit"
            className="w-full text-xs sm:text-sm bg-gray-950 hover:bg-gray-800 text-white py-1.5 px-3 rounded-md font-medium cursor-pointer transition-colors"
          >
            {editUser ? "Update User" : "Add User"}
          </button>
          <button 
            type="button"
            onClick={() => setShowForm(false)}
            className="w-full text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 px-3 rounded-md font-medium cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;