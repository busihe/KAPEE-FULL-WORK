import React from "react";
import { Heart } from "lucide-react";

// Types
interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  image: string;
  featured?: boolean;
}

// Dummy Data
const hotDeal = {
  id: 1,
  title: "Apple Watch Series 5",
  category: "Electronics",
  price: "$499.00 - $599.00",
  discount: "17% OFF",
  sold: 50,
  available: 75,
  image: "../Apple-Watch.jpg",
};

const featuredProducts: Product[] = [
  {
    id: 2,
    title: "Apple iPhone 11 Pro Max",
    category: "Electronics",
    price: "$199.00",
    oldPrice: "$254.00",
    discount: "22% OFF",
    image: "../Apple-iPhone-11-Pro.jpg",
  },
  {
    id: 3,
    title: "Apple Watch Series 5",
    category: "Electronics",
    price: "$499.00 - $599.00",
    discount: "17% OFF",
    image: "../Apple-Watch-Series-5.jpg",
  },
  {
    id: 4,
    title: "JBL Wireless Bluetooth Speaker",
    category: "Electronics",
    price: "$96.00",
    featured: true,
    image: "../JBL-Wireless.jpg",
  },
  {
    id: 5,
    title: "JBL On-Ear Headphones",
    category: "Electronics",
    price: "$124.00",
    featured: true,
    image: "../JBL-On-Ear.jpg",
  },
  {
    id: 6,
    title: "Apple AirPods with Wireless Case",
    category: "Electronics",
    price: "$85.00",
    featured: true,
    image: "../Apple-AirPods.jpg",
  },
  {
    id: 7,
    title: "Samsung Galaxy S20 8GB RAM",
    category: "Electronics",
    price: "$250.00",
    image: "../Samsung-Galaxy-S20.jpg",
  },
  {
    id: 8,
    title: "Samsung Gear 360 Camera",
    category: "Electronics",
    price: "$29.00",
    oldPrice: "$48.00",
    discount: "40% OFF",
    image: "../Samsung-Gear-360-Camera.jpg",
  },
  {
    id: 9,
    title: "Apple Watch Series 5 Black",
    category: "Electronics",
    price: "$599.00",
    image: "../Apple-Watch-Series-5.jpg",
  },
];

// Components
const HotDealCard: React.FC = () => (
  <div className="border rounded-2xl p-4 shadow-md w-full border-yellow-500">
    <div className="relative">
      <img
        src={hotDeal.image}
        alt={hotDeal.title}
        className="rounded-xl w-full h-auto object-contain"
      />
      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
        {hotDeal.discount}
      </span>
      <Heart className="absolute top-2 right-2 text-gray-500 w-5 h-5" />
    </div>
    <div className="mt-3">
      <p className="text-sm text-gray-500 uppercase">{hotDeal.category}</p>
      <h3 className="text-lg font-semibold">{hotDeal.title}</h3>
      <p className="text-yellow-600 font-bold">{hotDeal.price}</p>
      <div className="mt-3">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-yellow-500"
            style={{
              width: `${
                (hotDeal.sold / (hotDeal.sold + hotDeal.available)) * 100
              }%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Already Sold: {hotDeal.sold}</span>
          <span>Available: {hotDeal.available}</span>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedProductsCard: React.FC = () => (
  <div className="border rounded-2xl p-4 shadow-md w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold underline">Featured Products</h2>
      <button className="text-lg text-yellow-600 font-semibold">
        VIEW ALL
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {featuredProducts.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-3 shadow-sm relative bg-white"
        >
          {product.discount && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              {product.discount}
            </span>
          )}
          {product.featured && (
            <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
              FEATURED
            </span>
          )}
          <Heart className="absolute top-2 right-2 text-gray-400 w-4 h-4" />

          <img
            src={product.image}
            alt={product.title}
            className="rounded-md mb-2 w-full h-auto object-contain"
          />
          <p className="text-xs text-gray-500 uppercase">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold leading-tight">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-yellow-600 font-bold text-sm">
              {product.price}
            </p>
            {product.oldPrice && (
              <p className="line-through text-gray-400 text-xs">
                {product.oldPrice}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main Component
const ProductCard: React.FC = () => {
  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <HotDealCard />
        <FeaturedProductsCard />
      </div>
    </div>
  );
};

export default ProductCard;
