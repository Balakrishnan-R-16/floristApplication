import React, { useState, useEffect } from "react";

const FloristList = () => {
  const [florists, setFlorists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFlorists();
  }, []);

  const fetchFlorists = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/getAllFlorists");
      const data = await response.json();
      if (data.success) {
        setFlorists(data.data);
      } else {
        setError(data.message || "Failed to fetch florists");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this florist?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/florist/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          setFlorists(florists.filter((f) => f.id !== id));
        } else {
          alert("Failed to delete florist: " + data.message);
        }
      } catch (err) {
        alert("Network error. Please try again.");
      }
    }
  };

  const filteredFlorists = florists.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.storeLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.flowerSpecialties.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return <p className="text-center text-gray-600">Loading applications...</p>;
  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchFlorists}
          className="mt-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Florist Applications</h1>
        <p>Total: {florists.length}</p>
      </div>

      <input
        type="text"
        placeholder="Search by name, location, or specialties..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
      />

      {filteredFlorists.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlorists.map((florist) => (
            <div
              key={florist.id}
              className="bg-white p-6 rounded-xl shadow relative"
            >
              <button
                onClick={() => handleDelete(florist.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
              <h3 className="text-xl font-semibold mb-2">{florist.name}</h3>
              <p className="text-gray-600 mb-1">📍 {florist.storeLocation}</p>
              <p className="text-gray-600 mb-1">📞 {florist.phoneNumber}</p>
              <p className="text-gray-600 mb-1">⏰ {florist.experience}</p>
              <p className="text-gray-700 mt-2">
                🌸 {florist.flowerSpecialties}
              </p>
              <small className="text-gray-400">ID: {florist.id}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloristList;
