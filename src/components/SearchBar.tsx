// components/SearchBar.tsx
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getProducts } from "../utils/api"; // your product fetching function
import type { Product } from "../data/products";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    );
  }, [query, products]);

  return (
    <div className="relative w-full px-4 sm:px-0 max-w-full sm:max-w-2xl mx-auto">
      {/* Search Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="
          flex
          overflow-hidden
          rounded-xl
          bg-white
          border-2 border-gray-300
          shadow-sm
          focus-within:border-yellow-400
          focus-within:shadow-md
          transition duration-300 ease-in-out
        "
        aria-label="site search"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            px-4
            py-3
            text-sm
            text-gray-700
            placeholder-gray-400
            outline-none
            transition duration-200 ease-in-out
          "
          placeholder="Search products..."
          aria-label="Search products"
          autoComplete="off"
        />
        <button
          className="
            px-4 sm:px-5
            flex
            items-center
            justify-center
            text-yellow-500
            hover:text-yellow-600
            transition duration-200 ease-in-out
            focus:outline-none
          "
          aria-label="search"
        >
          <FiSearch className="text-xl sm:text-2xl" />
        </button>
      </form>

      {/* Search Dropdown Results */}
      {results.length > 0 && (
        <ul
          className="
            absolute
            left-0 right-0
            mt-2
            max-h-64
            overflow-y-auto
            rounded-xl
            bg-white
            border border-gray-300
            shadow-lg
            z-50
          "
        >
          {results.map((p) => (
            <li key={p.id} className="border-b last:border-none">
              <Link
                to={`/product/${p.id}`}
                className="
                  flex
                  items-center
                  gap-3
                  p-3
                  hover:bg-yellow-50
                  transition duration-200 ease-in-out
                "
                onClick={() => setQuery("")}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded object-cover flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <p className="font-medium text-gray-900 text-sm truncate">{p.title}</p>
                  <p className="text-xs sm:text-sm text-yellow-600 font-semibold truncate">
                    ${p.price}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
