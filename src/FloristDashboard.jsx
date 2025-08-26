import React from "react";
import FloristForm from "./FloristForm";
import FloristList from "./FloristList";

const FloristDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Florist Applicant Dashboard</h1>
      <FloristForm />
      <FloristList />
    </div>
  );
};

export default FloristDashboard;
