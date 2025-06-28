import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { FaSun, FaMoon } from 'react-icons/fa';
import { SetDark } from './Redux/Slices/Darkslice';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
function App() {
  const dispatch=useDispatch()
  const isDark = useSelector((state) => state.dark.is_Dark)
  console.log(isDark)
  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
<div className="fixed top-4 right-15 z-50">
        <button
          onClick={() => dispatch(SetDark())}
          className="p-2 rounded-full shadow-lg bg-gray-200 hover:scale-105 transition-transform duration-300"
        >
          {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
