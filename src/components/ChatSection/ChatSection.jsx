import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatSection.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatSection = () => {
  const [messages, setMessages] = useState([
    { type: "agent", subtype: "info", text: "Hello! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const [action, setAction] = useState("run");
  const [threadId, setThreadId] = useState("1");
  const [datasetPath, setDatasetPath] = useState(
    "/Users/hrishikesh.ravindra/Desktop/next-service/agent/agentic-fastapi-backend/2ea4787a-43d1-596e-8a27-8a68f5536225.csv"
  );
  const [code, setCode] = useState("");

  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8000/ws");

    wsRef.current.onopen = () => console.log("WebSocket connected");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      let msg = { type: "agent", subtype: "info", text: "" };

      switch (data.type) {
        case "info":
        case "success":
        case "error":
          msg.subtype = data.type;
          msg.text = `[${data.node || "Agent"}] ${data.message || data.payload?.message}`;
          break;
        case "code":
          msg.subtype = "code";
          msg.text = data.content;
          break;
        default:
          msg.text = JSON.stringify(data);
      }

      setMessages((prev) => [...prev, msg]);
    };

    wsRef.current.onclose = () => console.log("WebSocket disconnected");

    return () => wsRef.current?.close();
  }, []);

  const call_agent = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const payload = { action, thread_id: threadId, user_request: userInput, dataset_path: datasetPath, code };
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { type: "human", text: userInput }]);
    call_agent();
    setUserInput("");
  };

  const renderMessage = (msg, idx) => {
    switch (msg.subtype) {
      case "status":
        return (
          <div key={idx} className={`${styles.message} ${styles.agent} ${styles.infoMessage}`}>
            {msg.payload && Object.entries(msg.payload).map(([key, val])=>(
              <span key={key}><strong>{key}:</strong> {val}</span>
            ))}
          </div>
        )
      case "step_started" || "step_completed":
        return (
          <div key={idx} className={`${styles.message} ${styles.agent} ${styles.infoMessage}`}>
            {msg && Object.entries(msg).map(([key, val])=>(
              <span key={key}><strong>{key}:</strong> {val}</span>
            ))}
          </div>
        )
      case "info":
        return (
          <div key={idx} className={`${styles.message} ${styles.agent} ${styles.infoMessage}`}>
            {msg.text}
          </div>
        );
      case "success":
        return (
          <div key={idx} className={`${styles.message} ${styles.agent} ${styles.successMessage}`}>
            {msg.text}
          </div>
        );
      case "error":
        return (
          <div key={idx} className={`${styles.message} ${styles.agent} ${styles.errorMessage}`}>
            {msg.text}
          </div>
        );
      case "code":
        return (
          <div key={idx} className={`${styles.message} ${styles.agent} ${styles.codeMessage}`}>
            <div className={styles.codeHeader}>Generated Code:</div>
            <SyntaxHighlighter
              language="python"
              style={materialDark}
              customStyle={{ margin: 0, padding: "10px", borderRadius: "6px" }}
            >
              {msg.text}
            </SyntaxHighlighter>
          </div>
        );
      default:
        return (
          <div key={idx} className={`${styles.message} ${styles.agent}`}>
            {msg.text}
          </div>
        );
    }
  };

  const addHumanMessage = (text) => {
    setMessages((prev) => [...prev, { type: "human", text }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    addHumanMessage(userInput);
    call_agent();
    setUserInput("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg, idx) => {
          if (msg.type === "human") {
            return (
              <div key={idx} className={`${styles.message} ${styles.human}`}>
                {msg.text}
              </div>
            );
          }
          return renderMessage(msg, idx);
        })}
      </div>

      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatSection;
          <div key={idx} className={`${styles.message} ${styles.agent}`}>
            {msg.text}
          </div>
        );
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map(renderMessage)}
      </div>

      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatSection;
