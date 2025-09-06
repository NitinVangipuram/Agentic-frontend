import React, { useState, useEffect } from "react";

function AnalysisClient() {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  // Form fields
  const [action, setAction] = useState("run");
  const [threadId, setThreadId] = useState("1");
  const [userRequest, setUserRequest] = useState("give me highest selling drug");
  const [datasetPath, setDatasetPath] = useState("/Users/hrishikesh.ravindra/Desktop/next-service/agent/agentic-fastapi-backend/2ea4787a-43d1-596e-8a27-8a68f5536225.csv");
  const [code, setCode] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    setWs(socket);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, JSON.stringify(data, null, 2)]);
      } catch {
        setMessages((prev) => [...prev, event.data]);
      }
    };

    socket.onclose = () => console.warn("WebSocket closed");
    socket.onerror = (err) => console.error("WebSocket error:", err);

    return () => socket.close();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!ws) return;

    const payload = {
      action,
      thread_id: threadId,
      user_request: userRequest,
      dataset_path: datasetPath,
      code,
    };

    ws.send(JSON.stringify(payload));
    setMessages((prev) => [...prev, `➡️ Sent: ${JSON.stringify(payload)}`]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📊 Analysis WebSocket Client
        </h2>

        {/* Form */}
        <form onSubmit={sendMessage} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Action</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            >
              <option value="run">Run Analysis</option>
              <option value="human-input">Human Input</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Thread ID</label>
            <input
              type="text"
              value={threadId}
              onChange={(e) => setThreadId(e.target.value)}
              placeholder="Enter thread ID"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">User Request</label>
            <input
              type="text"
              value={userRequest}
              onChange={(e) => setUserRequest(e.target.value)}
              placeholder="Enter user request"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Dataset Path</label>
            <input
              type="text"
              value={datasetPath}
              onChange={(e) => setDatasetPath(e.target.value)}
              placeholder="/path/to/dataset.csv"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
          >
            🚀 Send
          </button>
        </form>

        {/* Messages */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6">📥 Messages</h3>
        <div className="bg-black text-green-400 font-mono text-sm rounded-lg p-3 mt-2 max-h-64 overflow-y-auto">
          {messages.map((msg, i) => (
            <pre key={i} className="whitespace-pre-wrap">
              {msg}
            </pre>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalysisClient;
