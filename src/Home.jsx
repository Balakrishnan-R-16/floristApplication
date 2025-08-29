import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [florists, setFlorists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch florists from backend
  const fetchFlorists = async (query = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://backened-hgph.onrender.com/api/searchFlorists?query=${query}`
      );
      const data = await response.json();
      if (data.success) {
        setFlorists(data.data);
      } else {
        setFlorists([]);
      }
    } catch (err) {
      console.error("Error fetching florists:", err);
      setFlorists([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchFlorists();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 2 || value.length === 0) {
      fetchFlorists(value);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section 
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-28 md:py-40 px-4 text-center"
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            Your Perfect Blooms, Delivered
          </h1>
          <p className="text-lg md:text-xl mb-8 font-light drop-shadow-sm">
            Discover exquisite arrangements from local florists or showcase your talent to a global audience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#find-florist" className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
              Find Florists
            </a>
            <Link
              to="/apply"
              className="px-8 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
            >
              Apply as Florist
            </Link>
          </div>
        </div>
      </section>

      {/* Find Florist Section */}
      <section id="find-florist" className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Discover Local Florists</h2>
          <p className="text-gray-600 mt-2">Search for florists near you or browse by category.</p>
        </div>
        
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by city, store, or flower type..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 pl-12 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Categories Section */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
            <button className="px-6 py-2 bg-pink-100 text-pink-700 font-medium rounded-full hover:bg-pink-200 transition">Bouquets</button>
            <button className="px-6 py-2 bg-pink-100 text-pink-700 font-medium rounded-full hover:bg-pink-200 transition">Arrangements</button>
            <button className="px-6 py-2 bg-pink-100 text-pink-700 font-medium rounded-full hover:bg-pink-200 transition">Weddings</button>
            <button className="px-6 py-2 bg-pink-100 text-pink-700 font-medium rounded-full hover:bg-pink-200 transition">Gifts</button>
        </div>

        {/* Florists List */}
        {loading ? (
          <p className="mt-4 text-center text-gray-600">Loading florists...</p>
        ) : florists.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {florists.map((f) => (
              <div key={f.id} className="p-8 bg-white shadow-lg rounded-2xl border border-gray-100 transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{f.name}</h3>
                <p className="text-gray-600 flex items-center mb-1">
                  <span className="mr-2 text-pink-500">📍</span>{f.storeLocation}
                </p>
                <p className="text-gray-600 flex items-center mb-1">
                  <span className="mr-2 text-pink-500">🌸</span>{f.flowerSpecialties}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-gray-600">No florists found. Try a different search term!</p>
        )}
      </section>

      {/* Footer or other sections can be added here */}
    </div>
  );
};

export default Home;