import { useEffect, useState } from "react";

const API = "http://localhost:5100/api/tickets";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTickets(data.data || []);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResult(null);

    const res = await fetch(`${API}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setResult(data.data);
    setMessage("");
    setLoading(false);
    fetchTickets();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "P0":
        return "bg-red-100 text-red-700";
      case "P1":
        return "bg-orange-100 text-orange-700";
      case "P2":
        return "bg-yellow-100 text-yellow-700";
      case "P3":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5100/api/tickets/${id}`, {
      method: "DELETE"
    });
    
    fetchTickets();
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-black px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold mb-2">
          AI Ticket Triage
        </h1>
        <p className="text-gray-600 mb-8">
          Smart support ticket classification dashboard
        </p>

        {/* Input Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
          <textarea
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            rows="4"
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition font-medium"
          >
            {loading ? "Analyzing..." : "Analyze Ticket"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border">
            <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>

            <div className="grid grid-cols-2 gap-4 text-lg">
              <p><strong>Category:</strong> {result.category}</p>
              <p>
                <strong>Priority:</strong>{" "}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(result.priority)}`}>
                  {result.priority}
                </span>
              </p>
              <p><strong>Urgent:</strong> {result.urgency ? "Yes" : "No"}</p>
              <p><strong>Confidence:</strong> {result.confidence}</p>
            </div>

            <div className="mt-4">
              <strong>Keywords:</strong>{" "}
              <span className="text-gray-700">
                {result.keywords.join(", ")}
              </span>
            </div>
          </div>
        )}

        {/* Tickets Table */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Previous Tickets</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-3">Message</th>
                <th className="px-1">Category</th>
                <th className="px-1">Priority</th>
                <th>Confidence</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((t) => (
                <tr key={t._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{t.message}</td>
                  <td>{t.category}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(t.priority)}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-7">{t.confidence}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:opacity-80"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default App;