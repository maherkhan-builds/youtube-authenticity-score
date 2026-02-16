
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        {/* Placeholder for menu icon */}
        <button className="text-gray-400 hover:text-white md:hidden">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>
        <div className="flex items-center space-x-1">
          {/* YouTube-like play icon */}
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>
          </svg>
          <span className="text-xl font-bold text-white tracking-tight">AuthentiTube</span>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-4 hidden md:flex">
        <input
          type="text"
          placeholder="Search for videos or channels..."
          className="w-full p-2 pl-4 rounded-l-full bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <button className="px-5 rounded-r-full bg-gray-600 hover:bg-gray-500 text-gray-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Placeholder for user icon */}
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 text-sm">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
