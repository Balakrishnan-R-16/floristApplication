import React from "react";
import FloristList from "./FloristList";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administrator Dashboard</h1>
      <FloristList />
      {/* Admin can manage all applications here */}
    </div>
  );
};

export default AdminDashboard;
