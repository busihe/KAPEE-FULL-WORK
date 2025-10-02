import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function SubscribePage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch subscribers
  const fetchSubscribers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/subscribe");
      if (!res.ok) throw new Error("Failed to fetch subscribers");
      const data = await res.json();
      setSubscribers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch subscribers.");
    }
    setLoading(false);
  };

  // Delete subscriber
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/subscribe/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
        setSuccessMsg("Subscriber deleted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        alert("Failed to delete subscriber");
      }
    } catch (err) {
      alert("Error connecting to server");
      console.error(err);
    }
    setDeletingId(null);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black text-center sm:text-left">
        Subscribers
      </h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {successMsg && <p className="text-center text-green-600">{successMsg}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded shadow-sm border border-gray-200">
          <table className="min-w-full border-collapse text-black table-auto">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-3 sm:px-4 py-2 text-left text-yellow-600 text-sm sm:text-base whitespace-nowrap">
                  Email
                </th>
                <th className="px-3 sm:px-4 py-2 text-left text-yellow-600 text-sm sm:text-base whitespace-nowrap">
                  Subscribed At
                </th>
                <th className="px-3 sm:px-4 py-2 text-center text-yellow-600 text-sm sm:text-base whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length > 0 ? (
                subscribers.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-t hover:bg-yellow-50 transition duration-150"
                  >
                    <td className="px-3 sm:px-4 py-2 break-words max-w-xs sm:max-w-none">
                      {sub.email}
                    </td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50 transition"
                        disabled={deletingId === sub._id}
                        title="Delete Subscriber"
                        aria-label={`Delete subscriber ${sub.email}`}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-gray-500 text-sm sm:text-base"
                  >
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
