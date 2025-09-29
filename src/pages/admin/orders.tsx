import { useEffect, useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa"; // Importing icons

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type ClientInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

type Order = {
  _id?: string;
  clientInfo: ClientInfo;
  cartItems: CartItem[];
  paymentMethod: string;
  totalAmount: number;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Handle status update
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update order");

      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status } : order))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle delete order
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "processing":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left border-b">Product ID</th>
                <th className="p-4 text-left border-b">Name</th>
                <th className="p-4 text-left border-b">Email</th>
                <th className="p-4 text-left border-b">Phone</th>
                <th className="p-4 text-left border-b">Address</th>
                <th className="p-4 text-left border-b">Payment</th>
                <th className="p-4 text-left border-b">Total</th>
                <th className="p-4 text-left border-b">Status</th>
                <th className="p-4 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{order._id}</td>
                  <td className="p-4 border-b">{order.clientInfo.fullName}</td>
                  <td className="p-4 border-b">{order.clientInfo.email}</td>
                  <td className="p-4 border-b">{order.clientInfo.phone}</td>
                  <td className="p-4 border-b">{order.clientInfo.address}</td>
                  <td className="p-4 border-b">{order.paymentMethod}</td>
                  <td className="p-4 border-b font-semibold text-green-700">
                    ${order.totalAmount}
                  </td>
                  <td className={`p-4 border-b text-center font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="p-4 border-b flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id as string, e.target.value)
                      }
                      className="border p-2 rounded-md w-32"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => setViewOrder(order)}
                      className="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
                    >
                      <FaEye /> View
                    </button>
                    <button
                      onClick={() => handleDelete(order._id as string)}
                      className="bg-red-500 text-white p-2 rounded-md flex items-center gap-2 hover:bg-red-600"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal to view products */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 sm:w-2/3 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">
              Products in order by {viewOrder.clientInfo.fullName}
            </h2>
            {viewOrder.cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b p-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm">Product ID: {item.id}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                  <p>Total: ${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setViewOrder(null)}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
