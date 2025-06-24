// import React, { useEffect, useRef, useState } from "react"

// const AiChatBox = () => {
//   const [socket, setSocket] = useState(null)
//   const [input, setInput] = useState("")
//   const [messages, setMessages] = useState([])
//   const chatRef = useRef(null)

//   const token = localStorage.getItem("token")
//   const clientId = "ai-client" // can be anything

//   useEffect(() => {
//     const ws = new WebSocket(`ws://localhost:8000/ws/${clientId}?token=${token}`)
//     ws.onopen = () => console.log("✅ Connected to AI WebSocket")
//     ws.onmessage = (event) => {
//       setMessages((prev) => [...prev, { sender: "ai", text: event.data }])
//     }
//     ws.onerror = (err) => console.error("❌ WebSocket error:", err)
//     ws.onclose = () => console.log("🔌 WebSocket closed")
//     setSocket(ws)

//     return () => ws.close()
//   }, [token])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (input.trim() && socket) {
//       socket.send(input)
//       setMessages((prev) => [...prev, { sender: "user", text: input }])
//       setInput("")
//     }
//   }

//   useEffect(() => {
//     chatRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   return (
//     <div className="max-w-xl mx-auto bg-gray-800 text-white p-4 rounded shadow h-[600px] flex flex-col">
//       <h2 className="text-xl font-semibold mb-2">🤖 Gemini AI Support</h2>
//       <div className="flex-1 overflow-y-auto space-y-2 border border-gray-600 p-2 rounded">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`p-2 rounded max-w-[80%] ${
//               msg.sender === "user" ? "bg-blue-500 self-end" : "bg-green-600 self-start"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         <div ref={chatRef} />
//       </div>
//       <form onSubmit={handleSubmit} className="flex mt-2 gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
//           placeholder="Ask something..."
//         />
//         <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">
//           Send
//         </button>
//       </form>
//     </div>
//   )
// }

// export default AiChatBox
