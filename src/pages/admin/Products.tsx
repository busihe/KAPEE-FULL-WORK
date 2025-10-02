import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // Heroicons

interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image?: string;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const targetProduct = editingProductId ? editingProduct : newProduct;
    const setTarget = editingProductId ? setEditingProduct : setNewProduct;
    setTarget({ ...targetProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

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

  const handleEdit = (product: Product) => {
    setEditingProductId(product._id || null);
    setEditingProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || "",
    });
  };

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
    <div className="bg-gray-50 min-h-screen py-8 pl-0 pr-4">
      <div className="max-w-xl mr-0">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
          🛒 Products Page
        </h1>

        {/* Product Table */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-10 overflow-x-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Products List
          </h2>
          <table className="w-full table-auto border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                <th className="border px-3 py-1 text-left">Image</th>
                <th className="border px-3 py-1 text-left">Name</th>
                <th className="border px-3 py-1 text-left">Price</th>
                <th className="border px-3 py-1 text-left">Description</th>
                <th className="border px-3 py-1 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-100 transition text-gray-800"
                >
                  <td className="border px-2 py-1 text-center">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded mx-auto"
                      />
                    )}
                  </td>
                  <td className="border px-2 py-1 break-words max-w-[120px] sm:max-w-none">
                    {product.name}
                  </td>
                  <td className="border px-2 py-1">${product.price}</td>
                  <td className="border px-2 py-1 max-w-[200px] break-words">
                    {product.description}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-transform hover:scale-105 w-full sm:w-auto text-xs"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => product._id && handleDelete(product._id)}
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-transform hover:scale-105 w-full sm:w-auto text-xs"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Product Form */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            {editingProductId ? "Edit Product" : "Add New Product"}
          </h2>
          <form
            onSubmit={editingProductId ? handleUpdate : handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium text-gray-800 mb-1">Name</label>
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
              <label className="block font-medium text-gray-800 mb-1">Price</label>
              <input
                type="number"
                name="price"
                min={0}
                step={0.01}
                value={editingProductId ? editingProduct.price : newProduct.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-1">Description</label>
              <textarea
                name="description"
                rows={2} 
                /* Reduced row size */
                value={editingProductId ? editingProduct.description : newProduct.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg transition-transform hover:bg-indigo-700 hover:scale-105 w-full sm:w-auto text-xs"
              >
                {editingProductId ? "Update Product" : "Add Product"}
              </button>

              {editingProductId && (
                <button
                  type="button"
                  onClick={() => setEditingProductId(null)}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg transition-transform hover:bg-gray-500 hover:scale-105 w-full sm:w-auto text-xs"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Products;
