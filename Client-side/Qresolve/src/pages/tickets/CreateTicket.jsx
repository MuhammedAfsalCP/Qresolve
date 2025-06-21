import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket } from '../../Redux/Slices/ticketSlice';
import bgImage from '../../assets/ticket-bg.jpg'

const CreateTickets = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.ticket);
  const [ticketData, setTicketData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket(ticketData));
  };

  return (
    <div className="bg-cover bg-center h-screen text-white flex items-center justify-start"
    style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Create Ticket</h1>
        
        <div className="max-w-2xl mx-auto bg-[#22202066] backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 transform transition-all duration-500 animate-fade-in ml-20">
          <h2 className="text-xl text-gray-300 mb-6">New Ticket</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center gap-4">
              <input
                type="text"
                name="title"
                value={ticketData.title}
                onChange={handleChange}
                placeholder="title"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#e2e964]"
              />
              <p className="text-gray-400 text-sm mt-2">Summarize your issue in a few words</p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <textarea
                name="description"
                value={ticketData.description}
                onChange={handleChange}
                placeholder="description"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#e2e964] h-24 resize-none"
              />
              <p className="text-gray-400 text-sm mt-2">
                Please describe the issue in detail. Include any error messages, what you've tried, and steps to reproduce. <br />
                Tip: The more details you provide, the faster we can help. Screenshots or code snippets are welcome.
              </p>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            Already created a Ticket? <a href="/tickets" className="text-blue-400 hover:underline">Tickets</a>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default CreateTickets;