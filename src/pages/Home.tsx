import React, { useState, useEffect, useMemo } from "react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from './product-card'; // Adjust the path based on where it's located

// Components
// import ProductCard from "./product-card";
// import Aftersell from "./aftersell";

// Product fetching utils
import { getProducts } from "../utils/api";
import type { Product } from "../data/products";

// Category interface
interface CategoryItem {
  name: string;
  hasSubmenu: boolean;
}

// Tabs for Top Products
const tabs = [
  { key: "featured", label: "Featured" },
  { key: "popular", label: "Popular" },
  { key: "new", label: "New Arrivals" },
] as const;

const HomePage: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isSidebarOpen] = useState(true);

  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: CategoryItem[] = [
    { name: "Men's Clothing", hasSubmenu: true },
    { name: "Women's Clothing", hasSubmenu: true },
    { name: "Accessories", hasSubmenu: true },
    { name: "Shoes", hasSubmenu: true },
    { name: "Jewellery", hasSubmenu: true },
    { name: "Bags & Backpacks", hasSubmenu: true },
    { name: "Watches", hasSubmenu: true },
    { name: "Dresses", hasSubmenu: false },
    { name: "Shirts", hasSubmenu: false },
  ];

  // const navigationItems = [
  //   // { name: "HOME", path: "/home1", hasDropdown: true },
  //   // { name: "SHOP", path: "/myshop", hasDropdown: true },
  //   // { name: "PAGES", path: "/page", hasDropdown: true },
  //   // { name: "BLOG", path: "/blog", hasDropdown: true },
  //   // {
  //   //   name: "ELEMENTS",
  //   //   path: "/elements",
  //   //   hasDropdown: true,
  //   //   children: [{ name: "Typography", path: "/elements/typography" }],
  //   // },
  //   // { name: "BUY NOW", path: "/buy", hasDropdown: false },
  // ];

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(categoryName)) {
        newExpanded.delete(categoryName);
      } else {
        newExpanded.add(categoryName);
      }
      return newExpanded;
    });
  };

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => products.filter((p) => p.tag === active),
    [products, active]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Categories Button */}
            <button
              onClick={() => {}}
              className="flex items-center gap-3 px-6 py-3 font-semibold text-gray-900 transition-colors bg-yellow-400"
            >
              <Menu className="w-5 h-5" />
              SHOP BY CATEGORIES
            </button>

            {/* Main Navigation */}
            {/* <div className="items-center hidden space-x-8 md:flex">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    to={item.path}
                    className="flex items-center gap-1 py-2 font-medium text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </nav>

      {/* Sidebar + Hero */}
      <div className="flex mx-auto max-w-7xl">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg transition-all duration-300 ${
            isSidebarOpen ? "w-80" : "w-0 overflow-hidden"
          }`}
        >
          <div className="p-6">
            <div className="space-y-1">
              {categories.map((category, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => category.hasSubmenu && toggleCategory(category.name)}
                    className="flex items-center justify-between w-full px-2 py-4 text-left text-gray-700 transition-colors rounded hover:text-gray-900 hover:bg-gray-50"
                  >
                    <span className="font-medium">{category.name}</span>
                    {category.hasSubmenu && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          expandedCategories.has(category.name) ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Submenu placeholder */}
                  {category.hasSubmenu && expandedCategories.has(category.name) && (
                    <div className="pb-2 pl-4">
                      <div className="py-1 text-sm text-gray-500">
                        Subcategories would appear here
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-white">
          <div className="relative flex items-center justify-between px-12 h-96">
            <div className="flex-1 max-w-lg">
              <div className="mb-4">
                <span className="text-lg font-bold tracking-wide text-yellow-500">
                  BEATS EP ON-EAR
                </span>
              </div>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
                PERSONALIZED <br />
                HEADPHONES
              </h1>
              <p className="mb-8 text-2xl font-medium text-gray-700">
                Min. 40-80% Off
              </p>
              <Link to="/shop">
                <button className="px-8 py-4 text-lg font-bold text-gray-900 transition-transform duration-200 bg-yellow-400 hover:bg-yellow-500 hover:scale-105">
                  BUY NOW
                </button>
              </Link>
            </div>

            {/* Headphones Image */}
            <div className="relative flex items-center justify-center flex-1">
              <div className="relative z-10 flex items-center justify-center w-80 h-80">
                <img
                  src="https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-slider-2.png"
                  alt="headset"
                  className="ml-10 w-96 animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speaker + Watch */}
      <section className="container grid grid-cols-1 gap-6 p-6 mx-auto mt-8 bg-gray-100 md:grid-cols-2">
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-white">
          <div className="relative flex items-center justify-between px-12 h-96">
            <div className="flex-1 max-w-lg">
              <span className="text-lg font-bold tracking-wide text-yellow-500">
                DIGITAL SMART
              </span>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
                WIRELESS SPEAKER
              </h1>
              <p className="mb-8 text-2xl font-medium text-gray-700">Min. 30-70% Off</p>
              <button className="px-8 py-4 text-lg font-bold text-gray-900 transition-transform duration-200 bg-yellow-400 hover:bg-yellow-500 hover:scale-105">
                BUY NOW
              </button>
            </div>
            <div className="relative flex items-center justify-center flex-1">
              <img
                src="https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-banner-1.jpg"
                alt="Speaker"
                className="ml-10 w-96"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-blue-50 to-white">
          <div className="relative flex items-center justify-between px-12 h-96">
            <div className="flex-1 max-w-lg">
              <span className="text-lg font-bold tracking-wide text-yellow-500">
                DIGITAL SMART
              </span>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
                WATCH CHARGER
              </h1>
              <p className="mb-8 text-2xl font-medium text-gray-700">Up to 70% Off</p>
              <button className="px-8 py-4 text-lg font-bold text-gray-900 transition-transform duration-200 bg-yellow-400 hover:bg-yellow-500 hover:scale-105">
                BUY NOW
              </button>
            </div>
            <div className="relative flex items-center justify-center flex-1">
              <img
                src="https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-banner-2.jpg"
                alt="Watch"
                className="ml-10 w-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product & Aftersell Section */}
      {/* <ProductCard />
      <Aftersell /> */}

      {/* 🆕 Top Products Section (Fetched) */}
      <section className="container-max px-4 mx-auto mt-12 mb-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Top Products</h2>
          <div className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`btn ${
                  active === t.key ? "bg-yellow-500 text-white" : "btn-outline"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} Product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
