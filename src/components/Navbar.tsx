import { Link, NavLink } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.length;
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <TopBar />

      {/* Main Navbar */}
      <div className="w-full border-b">
        <div className="container-max flex flex-wrap items-center justify-between gap-4 py-4">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-yellow-500 hover:text-yellow-600 transition">
            KAPEE
          </Link>

          {/* Search (Hidden on mobile) */}
          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          {/* Auth + Cart */}
          <nav className="flex items-center gap-2 sm:gap-4 ml-auto flex-wrap justify-end w-full sm:w-auto">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3 px-3 py-1 rounded-full border border-green-400 bg-green-50">
                <span className="relative flex items-center text-sm text-green-600">
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <FiUser className="text-xl mr-1" />
                  <span className="hidden sm:inline">Hi, {user.username}</span>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm border border-red-500 text-red-500 px-2 sm:px-3 py-1 rounded hover:bg-red-50 transition"
                >
                  <FiLogOut />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <NavLink
                to="/account"
                className="flex items-center gap-1 sm:gap-2 border border-gray-300 px-2 sm:px-3 py-1 rounded-full hover:bg-gray-100 transition text-sm"
              >
                <FiUser />
                <span className="hidden sm:inline">Hello, Sign In</span>
              </NavLink>
            )}

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative flex items-center gap-1 sm:gap-2 border border-yellow-400 text-yellow-600 px-2 sm:px-3 py-1 rounded-full hover:bg-yellow-50 transition text-sm"
            >
              <FiShoppingCart />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Navigation Menu + Mobile Search */}
      <div className="w-full border-t bg-white">
        <div className="container-max flex flex-wrap items-center gap-3 py-3">

          {/* Category Dropdown */}
          <CategoryMenu />

          {/* Page Links */}
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-500 font-semibold'
                  : 'hover:text-yellow-500 transition'
              }
            >
              Home
            </NavLink>
            <NavLink to="/shop" className="hover:text-yellow-500 transition">
              Shop
            </NavLink>
            <NavLink to="/deals" className="hover:text-yellow-500 transition">
              Sure Deals
            </NavLink>
            {/* Remove or add more links as needed */}
          </nav>

          {/* Mobile Search */}
          <div className="md:hidden w-full mt-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
