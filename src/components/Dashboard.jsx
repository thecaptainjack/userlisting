import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const API = "https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Total Users
  const totalUsers = users.length;

  // Users per day (last 30 days)
  const perDay = {};
  users.forEach((u) => {
    const date = new Date(u.createdAt).toLocaleDateString();
    perDay[date] = (perDay[date] || 0) + 1;
  });
  const perDayData = Object.keys(perDay).map((d) => ({
    date: d,
    count: perDay[d],
  }));

  // Avatar Distribution
  const withAvatar = users.filter((u) => u.avatar).length;
  const withoutAvatar = totalUsers - withAvatar;
  const avatarData = [
    { name: "With Avatar", value: withAvatar },
    { name: "No Avatar", value: withoutAvatar },
  ];

  // Recent Users
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl text-center font-extrabold text-indigo-700 mb-6">
        📊 Dashboard
      </h2>

      {/* Total Users */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-fit mx-auto">
        <p className="text-xl font-semibold text-gray-700">
          Total Users: <span className="text-indigo-600">{totalUsers}</span>
        </p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Users Created Per Day */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Users Created Per Day
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={perDayData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Avatar Distribution */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Avatar Distribution
          </h3>
          <PieChart width={250} height={250}>
            <Pie
              data={avatarData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              <Cell fill="#34d399" />
              <Cell fill="#d1d5db" />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Recently Joined */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-96 mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-indigo-700">
          Recently Joined
        </h3>
        <ul className="space-y-3">
          {recentUsers.map((u) => (
            <li
              key={u.id}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition"
            >
              <img
                src={u.avatar}
                alt={u.name}
                className="w-10 h-10 rounded-full border hover:scale-110 transition"
              />
              <span className="font-medium text-gray-800">{u.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
