import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import UserList from "./components/UserList";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">
    <header className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-md mb-6">
  <h1 className="text-2xl font-bold">User Management</h1>
  <nav className="space-x-2 ml">
    <button onClick={() => setPage("dashboard")} className="bg-white text-blue-600 px-3 py-1 rounded shadow hover:scale-105 mr-3">
      Dashboard
    </button>
    <button onClick={() => setPage("users")} className="bg-white text-blue-600 px-3 py-1 rounded shadow hover:scale-105">
      Users
    </button>
  </nav>
</header>


      {page === "dashboard" ? <Dashboard /> : <UserList />}
    </div>
  );
}

export default App;
