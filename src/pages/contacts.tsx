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
    <div className="text-slate-800 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-amber-500 text-white rounded-t-md">
              <th className="border-b-2 px-4 py-3 text-left">Sender</th>
              <th className="border-b-2 px-4 py-3 text-left">Email</th>
              <th className="border-b-2 px-4 py-3 text-left">Message</th>
              <th className="border-b-2 px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className="hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors"
              >
                <td className="border-b px-4 py-3">{msg.sender}</td>
                <td className="border-b px-4 py-3">{msg.email}</td>
                <td className="border-b px-4 py-3">{msg.message}</td>
                <td className="border-b px-4 py-3 space-x-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {messages.length === 0 && (
          <p className="text-center text-slate-500 mt-4">No messages available.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
