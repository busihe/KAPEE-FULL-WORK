import React, { useState, useEffect } from "react";

interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image?: string; // base64 string from MongoDB
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const targetProduct = editingProductId ? editingProduct : newProduct;
    const setTarget = editingProductId ? setEditingProduct : setNewProduct;
    setTarget({ ...targetProduct, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Add new product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price.toString());
      formData.append("description", newProduct.description);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setNewProduct({ name: "", price: 0, description: "", image: "" });
        setImageFile(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Start editing
  const handleEdit = (product: Product) => {
    setEditingProductId(product._id || null);
    setEditingProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || "",
    });
  };

  // Update product
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;

    try {
      const formData = new FormData();
      formData.append("name", editingProduct.name);
      formData.append("price", editingProduct.price.toString());
      formData.append("description", editingProduct.description);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch(
        `http://localhost:5000/api/products/${editingProductId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        setEditingProductId(null);
        setEditingProduct({ name: "", price: 0, description: "", image: "" });
        setImageFile(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products Page</h1>

      {/* Product Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Products List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <th className="border px-6 py-3">Image</th>
              <th className="border px-6 py-3">Name</th>
              <th className="border px-6 py-3">Price</th>
              <th className="border px-6 py-3">Description</th>
              <th className="border px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="border px-4 py-3">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </td>
                <td className="border px-4 py-3 text-gray-800">{product.name}</td>
                <td className="border px-4 py-3 text-gray-600">${product.price}</td>
                <td className="border px-4 py-3 text-gray-600">{product.description}</td>
                <td className="border px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700 transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => product._id && handleDelete(product._id!)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-red-700 transform hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Form */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {editingProductId ? "Edit Product" : "Add New Product"}
        </h2>
        <form
          onSubmit={editingProductId ? handleUpdate : handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block font-medium text-gray-800">Name</label>
            <input
              type="text"
              name="name"
              value={editingProductId ? editingProduct.name : newProduct.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-800">Price</label>
            <input
              type="number"
              name="price"
              value={editingProductId ? editingProduct.price : newProduct.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-800">Description</label>
            <textarea
              name="description"
              value={editingProductId ? editingProduct.description : newProduct.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-800">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-indigo-700 transform hover:scale-105"
            >
              {editingProductId ? "Update Product" : "Add Product"}
            </button>

            {editingProductId && (
              <button
                type="button"
                onClick={() => setEditingProductId(null)}
                className="bg-gray-400 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:bg-gray-500 transform hover:scale-105"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Products;
