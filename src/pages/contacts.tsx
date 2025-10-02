import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  email: string;
  message: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "Byishimo", email: "byishimo@mail.com", message: "I need help with my order." },
    { id: "2", sender: "Kevin", email: "kevin@mail.com", message: "Can I get a discount?" },
    { id: "3", sender: "John", email: "john@mail.com", message: "My product is damaged." },
  ]);

  const handleReply = (email: string) => {
    alert(`Reply to: ${email}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-800 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Messages</h1>

      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-amber-500 text-white">
              <th className="text-left px-4 py-3 whitespace-nowrap">Sender</th>
              <th className="text-left px-4 py-3 whitespace-nowrap">Email</th>
              <th className="text-left px-4 py-3 whitespace-nowrap">Message</th>
              <th className="text-left px-4 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className="border-t hover:bg-amber-50 dark:hover:bg-slate-700 transition"
              >
                <td className="px-4 py-3 whitespace-nowrap">{msg.sender}</td>
                <td className="px-4 py-3 whitespace-nowrap">{msg.email}</td>
                <td className="px-4 py-3">{msg.message}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleReply(msg.email)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md transition"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {messages.length === 0 && (
          <p className="text-center text-slate-500 py-6">No messages available.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
