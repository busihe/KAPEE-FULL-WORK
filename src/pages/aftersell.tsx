import React from "react";

const products = [
  {
    id: 1,
    title: "Apple Watch Series 5",
    category: "Electronics",
    price: "$499.00 - $599.00",
    discount: "17% OFF",
    image: "/Apple-Watch.jpg",
  },
  {
    id: 2,
    title: "Microsoft Xbox One Wireless",
    category: "Electronics",
    price: "$25.00",
    oldPrice: "$45.00",
    discount: "44% OFF",
    image: "/gaming.jpg",
  },
  {
    id: 3,
    title: "JBL On-Ear Headphones",
    category: "Electronics",
    price: "$124.00",
    featured: true,
    image: "/virtual.jpg",
  },
  {
    id: 4,
    title: "Apple Watch Series 5",
    category: "Electronics",
    price: "$499.00 - $599.00",
    discount: "17% OFF",
    image: "/Apple-Watch.jpg",
  },
  {
    id: 5,
    title: "Microsoft Xbox One Wireless",
    category: "Electronics",
    price: "$25.00",
    oldPrice: "$45.00",
    discount: "44% OFF",
    image: "/gaming.jpg",
  },
  {
    id: 6,
    title: "JBL On-Ear Headphones",
    category: "Electronics",
    price: "$124.00",
    featured: true,
    image: "/virtual.jpg",
  },
];

const ProductList: React.FC = () => {
  return (
    <div className="flex justify-center p-4 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 shadow-md rounded-md w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="font-bold text-xl sm:text-2xl">Best Selling Products</h2>
          <button className="bg-black text-white px-5 py-2 text-sm rounded-md hover:bg-gray-900 transition">
            VIEW ALL
          </button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={`${product.id}-${product.title}`} // fixed duplicate id keys
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 md:h-48 object-cover rounded-md mb-3"
                loading="lazy"
              />
              <p className="text-sm text-gray-500">{product.category}</p>
              <h3 className="font-semibold text-base">{product.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-lg text-green-600">{product.price}</span>
                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-sm">{product.oldPrice}</span>
                )}
              </div>
              {product.discount && (
                <span className="text-red-500 text-sm font-medium">{product.discount}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
