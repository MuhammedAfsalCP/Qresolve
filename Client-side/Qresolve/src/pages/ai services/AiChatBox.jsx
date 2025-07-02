import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Nav from '../../components/Nav'
const AiChat = () => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const isDark = useSelector((state) => state.dark.is_Dark);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    socketRef.current = socket;

    socket.onopen = () => console.log("✅ Connected to Gemini AI WebSocket");

    socket.onmessage = (event) => {
      const cleaned = sanitizeText(event.data);
      setMessages((prev) => [...prev, { sender: "ai", text: cleaned }]);
    };

    socket.onerror = (error) => console.error("❌ WebSocket error:", error);
    socket.onclose = () => console.log("🔌 WebSocket connection closed");

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !socketRef.current) return;
    socketRef.current.send(input);
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sanitizeText = (text) => {
    return text
      .replace(/"color:\s*#[0-9a-fA-F]{6}">/g, "")
      .replace(/<\/?span[^>]*>/g, "");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => alert("Code copied to clipboard!"));
  };

  const highlightCode = (code) => {
    const escapeHTML = (str) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    let highlighted = escapeHTML(code);

    const keywords = ["def", "if", "else", "return", "for", "while", "import", "class"];
    const builtins = ["print", "len", "range", "input"];

    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "g");
      highlighted = highlighted.replace(regex, `<span style="color: #00ff00">${kw}</span>`);
    });

    builtins.forEach((fn) => {
      const regex = new RegExp(`\\b${fn}\\b(?=\\()`, "g");
      highlighted = highlighted.replace(regex, `<span style="color: #00ffff">${fn}</span>`);
    });

    highlighted = highlighted.replace(
      /(&quot;[^&]*?&quot;|&#039;[^&]*?&#039;)/g,
      (match) => `<span style="color: #ffff00">${match}</span>`
    );

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  const renderMessage = (text) => {
    const lines = text.split("\n");
    let result = [];
    let isCodeBlock = false;
    let codeBuffer = [];

    const flushCode = (key) => {
      if (codeBuffer.length === 0) return;
      let code = codeBuffer.join("\n");

      // 🧹 Sanitize junk inside code blocks
      code = code
        .replace(/"color:\s*#[0-9a-fA-F]{6}">/g, "")
        .replace(/<\/?span[^>]*>/g, "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      result.push(
        <div key={`code-${key}`} className="bg-black text-white p-4 rounded-lg mt-2 relative">
          <button
            onClick={() => copyToClipboard(code)}
            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
          >
            Copy
          </button>
          <pre className="whitespace-pre-wrap overflow-x-auto">{highlightCode(code)}</pre>
        </div>
      );
      codeBuffer = [];
    };

    lines.forEach((line, index) => {
      if (line.trim().startsWith("```")) {
        isCodeBlock = !isCodeBlock;
        if (!isCodeBlock) flushCode(index);
      } else if (
        isCodeBlock ||
        /^[ \t]*(def |class |if |else|import|print|return|for |while|try|except)/.test(line)
      ) {
        codeBuffer.push(line);
      } else if (/^ {2,}/.test(line)) {
        codeBuffer.push(line);
      } else {
        flushCode(index);
        const trimmed = line.trim();

        // ✅ Handle bullet points with bold text: * **text**
        const bulletMatch = /^\*\s+\*\*(.*?)\*\*:?\s*$/.exec(trimmed);
        if (bulletMatch) {
          result.push(
            <div key={`bullet-${index}`} className="pl-4 list-disc list-inside font-semibold">
              • {bulletMatch[1]}
            </div>
          );
          return;
        }

        // ✅ Handle numbered bold items: 1. **text**
        const numberedMatch = /^\d+\.\s+\*\*(.*?)\*\*:?\s*$/.exec(trimmed);
        if (numberedMatch) {
          result.push(
            <div key={`numbered-${index}`} className="pl-4 list-decimal list-inside font-semibold">
              {`${trimmed.split(".")[0]}. ${numberedMatch[1]}`}
            </div>
          );
          return;
        }

        // ✅ Handle just bold text (not part of list)
        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          result.push(
            <strong key={`bold-${index}`} className="text-lg font-bold">
              {trimmed.slice(2, -2)}
            </strong>
          );
        } else {
          // ✅ Default plain line
          result.push(
            <pre key={`text-${index}`} className="whitespace-pre-wrap">
              {line}
            </pre>
          );
        }
      }
    });



    flushCode("end");
    return result;
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-4 ${isDark ? "bg-[#000] text-white" : "bg-gray-100 text-black"}`}>
      <Nav/>
      <div className="w-full max-w-6xl flex flex-col h-[80vh] shadow-lg overflow-hidden">
        {/* Header */}
        <div className={`p-4`}>
          <h2 className="text-xl font-bold">💬 AI Chat</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg shadow-2xl 
          ${msg.sender === "user"
                    ? "bg-[#595959] text-white"
                    : "bg-[#2a292a] text-white border border-gray-300"}`
                }
              >
                {renderMessage(msg.text)}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>


        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or code..."
            className={`flex-1 p-2 rounded-l-lg border ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-400"} focus:outline-none resize-none`}
            rows="1"
          ></textarea>
          <button
            type="submit"
            className={`px-4 py-2 rounded-r-lg ${isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiChat;
