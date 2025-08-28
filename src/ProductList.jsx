// src/ProductList.jsx
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://backened-hgph.onrender.com/api/products");
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.message || "Failed to fetch products");
        }
      } catch (err) {
        setError("Network error. Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (products.length === 0) return <p className="text-center text-gray-500">No products available.</p>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Florist Products</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/400x300?text=No+Image"}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 font-bold mb-2">₹{product.price}</p>
              <p className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <button
                disabled={!product.inStock}
                className={`mt-4 w-full py-2 rounded ${product.inStock ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"} transition`}
              >
                {product.inStock ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;