import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [clientInfo, setClientInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClientInfo({ ...clientInfo, [name]: value });
  };

  const handlePlaceOrder = async () => {
    if (!clientInfo.fullName || !clientInfo.email || !clientInfo.address) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    if (cart.length === 0) {
      alert("⚠️ Your cart is empty!");
      return;
    }

    const orderData = {
      clientInfo,
      cartItems: cart,
      paymentMethod,
      totalAmount: total,
      status: "pending",
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to place order");
      }

      const result = await response.json();
      setOrderId(result.order._id);
      clearCart();
      setClientInfo({
        fullName: "",
        email: "",
        phone: "",
        address: "",
      });
      setPaymentMethod("cash_on_delivery");
      setOrderComplete(true);

      setTimeout(() => {
        navigate("/shop");
      }, 5000);
    } catch (error: unknown) {
      let message = "An unknown error occurred";
      if (error instanceof Error) message = error.message;
      alert(`❌ Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show success message
  if (orderComplete) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center animate-fade-in">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Order Complete!</h2>
          <p className="text-gray-600">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          {orderId && (
            <p className="mt-2 text-sm text-gray-500">
              <strong>Order ID:</strong> {orderId}
            </p>
          )}
          <button
            onClick={() => navigate("/shop")}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Continue Shopping
          </button>
          <p className="text-xs text-gray-400 mt-3">Redirecting in 5 seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Cart Items */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded shadow gap-4"
              >
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">${item.price}</p>
                    <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline self-end sm:self-auto"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
          </div>
        )}
      </div>

      {/* Right: Client Information */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={clientInfo.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={clientInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={clientInfo.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="address"
            value={clientInfo.address}
            onChange={handleInputChange}
            placeholder="Delivery Address"
            className="w-full border px-3 py-2 rounded"
            required
          />

          {/* Payment Method */}
          <div>
            <label className="block font-semibold mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="credit_card">Credit/Debit Card</option>
              <option value="paypal">Paypal</option>
            </select>
          </div>
        </form>

        <button
          onClick={handlePlaceOrder}
          disabled={cart.length === 0 || loading}
          className="mt-6 w-full bg-yellow-400 text-black font-semibold py-3 rounded hover:bg-yellow-500 transition"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
