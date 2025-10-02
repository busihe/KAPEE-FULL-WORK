import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiMail,
  FiDollarSign,
} from "react-icons/fi";

const monthlySales = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 600 },
  { name: "Apr", sales: 500 },
  { name: "May", sales: 700 },
];

const countrySales = [
  { name: "USA", value: 400 },
  { name: "UK", value: 300 },
  { name: "Canada", value: 250 },
  { name: "Germany", value: 200 },
  { name: "Rwanda", value: 150 },
];

const COLORS = ["#6366F1", "#F97316", "#10B981", "#EF4444", "#06B6D4"];

export default function Dashboard() {
  return (
    <div className="px-4 py-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-8 tracking-tight text-center sm:text-left">
        📊 Dashboard Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
        {[
          {
            icon: <FiBox />,
            label: "Products",
            value: "6",
            gradient: "from-indigo-500 to-blue-500",
          },
          {
            icon: <FiUsers />,
            label: "Users",
            value: "10",
            gradient: "from-pink-500 to-rose-500",
          },
          {
            icon: <FiShoppingCart />,
            label: "Orders",
            value: "0",
            gradient: "from-green-400 to-emerald-500",
          },
          {
            icon: <FiMail />,
            label: "Messages",
            value: "75",
            gradient: "from-yellow-400 to-amber-500",
          },
          {
            icon: <FiDollarSign />,
            label: "Revenue",
            value: "$0",
            gradient: "from-purple-500 to-fuchsia-500",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.gradient} text-white rounded-xl p-5 flex flex-col items-center justify-center transition-transform transform hover:scale-105 shadow-xl min-w-0 text-center`}
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-base sm:text-lg truncate">{stat.label}</p>
            <p className="text-xl sm:text-3xl font-bold truncate">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 truncate">
            📈 Monthly Sales
          </h2>
          <div className="w-full h-[300px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
                />
                <Bar dataKey="sales" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 truncate">
            🌍 Sales by Country
          </h2>
          <div className="w-full h-[300px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countrySales}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {countrySales.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
