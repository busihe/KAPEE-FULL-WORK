import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  email: string;
  message: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Musa",
      email: "musa@mail.com",
      message: "I need help with my order.",
    },
    {
      id: "2",
      sender: "Alice",
      email: "alice@mail.com",
      message: "Can I get a discount?",
    },
    {
      id: "3",
      sender: "John",
      email: "john@mail.com",
      message: "My product is damaged.",
    },
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
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        📩 Messages
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] table-auto text-sm sm:text-base">
            <thead>
              <tr className="bg-yellow-400 text-white">
                <th className="border px-4 py-3 text-left">Sender</th>
                <th className="border px-4 py-3 text-left">Email</th>
                <th className="border px-4 py-3 text-left">Message</th>
                <th className="border px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border px-4 py-3 whitespace-nowrap">{msg.sender}</td>
                  <td className="border px-4 py-3 max-w-[180px] truncate whitespace-nowrap">
                    {msg.email}
                  </td>
                  <td className="border px-4 py-3 break-words">{msg.message}</td>
                  <td className="border px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleReply(msg.email)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Messages;
