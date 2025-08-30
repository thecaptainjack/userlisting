import React, { useEffect, useState } from "react";
import UserDetailModal from "./UserDetailModal";

const API = "https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users";

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const perPage = 10;
 const filtered = users
  .filter(
    (u) =>
      (u.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email ?? "").toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "name") return (a.name ?? "").localeCompare(b.name ?? "");
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        User List
      </h2>

     
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u) => (
              <tr
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className="hover:bg-blue-50 cursor-pointer border-b"
              >
                <td className="px-4 py-2">
                  <img
                    src={u.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full border transition-transform duration-200 hover:scale-110"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-gray-700">
                  {u.name}
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(filtered.length / perPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              page === i + 1
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default UserList;
