import { useState } from "react";
import { FiHeart, FiEye, FiShoppingCart, FiStar } from "react-icons/fi";
import Modal from "./Modal";
import type { Product } from "../data/products";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="card relative overflow-hidden rounded-xl shadow-md bg-white transition hover:shadow-lg w-full max-w-sm mx-auto">
      {/* Badge */}
      {product.badge && (
        <span
          className="absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: product.badge.color }}
        >
          {product.badge.label}
        </span>
      )}

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 rounded-t-xl">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs uppercase text-slate-400 tracking-wide">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="mt-1 line-clamp-2 font-semibold text-slate-800 hover:text-indigo-600 transition-colors duration-200">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar
              key={i}
              className={i < (product.rating ?? 0) ? "text-amber-400" : "text-slate-300"}
            />
          ))}
          <span className="ml-1 text-xs text-slate-500">
            ({product.reviews ?? 0})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-rose-600">
            ${product.price.toFixed(2)}
          </span>
          {product.compareAt && (
            <span className="text-sm text-slate-400 line-through">
              ${product.compareAt.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            className="border border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition rounded-lg p-2 flex items-center justify-center"
            title="Wishlist"
          >
            <FiHeart />
          </button>
          <button
            className="border border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition rounded-lg p-2 flex items-center justify-center"
            onClick={() => setOpen(true)}
            title="Quick View"
          >
            <FiEye />
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center px-2 py-2 text-sm sm:text-base transition"
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
          >
            <FiShoppingCart className="mr-1" /> Add
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Quick View">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg border border-slate-200 object-cover"
          />
          <div>
            <h4 className="text-lg font-semibold text-slate-800">{product.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{product.description}</p>
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-bold text-rose-600">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAt && (
                <span className="text-slate-400 line-through">
                  ${product.compareAt.toFixed(2)}
                </span>
              )}
            </div>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 mt-4 w-full transition"
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
