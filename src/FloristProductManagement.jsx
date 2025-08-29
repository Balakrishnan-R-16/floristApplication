// src/FloristProductManagement.jsx
import React, { useState, useEffect } from "react";

const FloristProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",     // Correct field for the `image_url` column
    subCategory: "",  // Correct field for the `sub_category` column
    inStock: true,
    available: true,  // Correct field for the `available` column
  });
  const [editingId, setEditingId] = useState(null);

  // Get florist username from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const floristUsername = user ? user.username : null;

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://backened-hgph.onrender.com/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || "Failed to fetch products.");
      }
    } catch (err) {
      setError("Network error. Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      // The price needs to be parsed from a string to a number
      price: parseFloat(formData.price),
      // Add the required floristUsername from the logged-in user
      floristUsername: floristUsername,
    };
    
    let url = "https://backened-hgph.onrender.com/api/products/ad";
    let method = "POST";

    if (editingId) {
      url = `https://backened-hgph.onrender.com/api/products/${editingId}`;
      method = "PUT";
    }
    
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (data.success) {
        fetchProducts(); // Refresh the list
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          imageUrl: "",
          subCategory: "",
          inStock: true,
          available: true,
        });
        setEditingId(null);
      } else {
        alert(data.message || "Failed to save product.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`https://backened-hgph.onrender.com/api/products/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          setProducts(products.filter((p) => p.id !== id));
        } else {
          alert(data.message || "Failed to delete product.");
        }
      } catch (err) {
        alert("Network error. Please try again.");
      }
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      subCategory: product.subCategory,
      inStock: product.inStock,
      available: product.available,
    });
    setEditingId(product.id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Your Products</h1>

      {/* Product Management Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            step="0.01"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Bouquet)"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
          {/* New field for Sub-Category */}
          <input
            type="text"
            name="subCategory"
            placeholder="Sub-Category (e.g., Anniversary)"
            value={formData.subCategory}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          {/* New field for Image URL */}
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          {/* Checkboxes for In Stock and Available */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="inStock"
              id="inStock"
              checked={formData.inStock}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-pink-600 rounded"
            />
            <label htmlFor="inStock">In Stock</label>
            <input
              type="checkbox"
              name="available"
              id="available"
              checked={formData.available}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-pink-600 rounded"
            />
            <label htmlFor="available">Available</label>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                  imageUrl: "",
                  subCategory: "",
                  inStock: true,
                  available: true,
                });
              }}
              className="w-full mt-2 py-2 text-gray-600 rounded hover:bg-gray-200 transition"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* Products List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Current Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">You have not added any products yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
                <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloristProductManagement;