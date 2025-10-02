import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiMail,
  FiBarChart2,
  FiSettings,
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiSend,
  FiMenu,
  FiX,
} from "react-icons/fi";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState<string>("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAdminName(data.name || "Admin");
        }
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FiHome /> },
    { path: "/admin/products", label: "Products", icon: <FiBox /> },
    { path: "/admin/users", label: "Users", icon: <FiUsers /> },
    { path: "/admin/orders", label: "Orders", icon: <FiShoppingCart /> },
    { path: "/admin/contacts", label: "Messages", icon: <FiMail /> },
    { path: "/admin/subscribe", label: "Subscribe", icon: <FiSend /> },
    { path: "/admin/reports", label: "Reports", icon: <FiBarChart2 /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl text-gray-700 focus:outline-none"
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold border-b border-yellow-500 flex justify-between items-center">
          DASHBOARD
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl lg:hidden"
          >
            <FiX />
          </button>
        </div>
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)} // close on mobile
              className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
                isActive(link.path) ? "bg-yellow-500" : ""
              }`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-yellow-500">
          <Link
            to="/admin/settings"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 p-3 rounded font-semibold hover:bg-yellow-500 ${
              isActive("/admin/settings") ? "bg-yellow-500" : ""
            }`}
          >
            <FiSettings /> Settings
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Navbar */}
        <header className="fixed top-0 left-0 lg:left-64 right-0 bg-white shadow px-4 py-3 z-30 flex items-center justify-between flex-wrap gap-3">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full max-w-xs sm:max-w-md flex-1 min-w-0">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1 text-sm sm:text-base"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button className="relative">
              <FiBell className="text-2xl text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 px-2 sm:px-3 py-2 rounded-lg text-sm sm:text-base overflow-hidden max-w-full">
              <FiUser className="text-gray-600 text-xl flex-shrink-0" />
              <span className="font-semibold truncate max-w-[90px] sm:max-w-[150px]">
                Welcome, {adminName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 font-semibold hover:underline"
              >
                <FiLogOut className="text-base" /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 mt-20 p-4 sm:p-6 overflow-y-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
