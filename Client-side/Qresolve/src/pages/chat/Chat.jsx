import { useEffect, useRef, useState } from "react";

const Chat = ({ receiverId = "68563e320dae45a7f650a0af", senderId = "685a41d99a22f26dfdcc3a49" }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    if (!receiverId || !senderId) {
      console.warn("❗ receiverId or senderId is missing");
      return;
    }

    // Create WebSocket connection
    const socket = new WebSocket(
      `ws://localhost:8000/ws/chat/${receiverId}/${senderId}`
    );

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket disconnected");
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [receiverId, senderId]);

  const sendMessage = () => {
    if (ws.current && input.trim()) {
      ws.current.send(input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat with {receiverId}</h2>
      <div
        style={{
          border: "1px solid black",
          padding: "1rem",
          height: "200px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
