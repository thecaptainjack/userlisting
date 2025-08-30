import React from "react";

function UserDetailModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-md mb-4"
        />

        <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
        <p className="text-gray-600 mt-1">{user.email}</p>
        <p className="text-sm text-gray-500 mt-2">
          Joined: {new Date(user.createdAt).toLocaleString()}
        </p>

        <button
          onClick={onClose}
          className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UserDetailModal;
