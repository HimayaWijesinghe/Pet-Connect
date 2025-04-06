import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] py-3 px-6 sticky top-0 z-10">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] rounded-full p-[5px] text-white">🐾</span>
          <Link 
            to="/" 
            className="no-underline text-[#3a7bd5] font-semibold text-xl m-0"
          >
            Pet Connect
          </Link>
        </div>
        
        <div className="flex items-center gap-5">
          <Link 
            to="/donation" 
            className="no-underline text-[#3a7bd5] font-medium flex items-center gap-[5px] py-2 px-3 rounded-lg transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-heart"></i> Donations
          </Link>
          <Link 
            to="/lostpets" 
            className="no-underline text-[#555] font-medium flex items-center gap-[5px] py-2 px-3 rounded-lg transition-all duration-300 ease-in-out bg-[rgba(58,123,213,0.1)]"
          >
            <i className="fas fa-search"></i> Lost Pets
          </Link>
          <Link 
            to="/found" 
            className="no-underline text-[#555] font-medium flex items-center gap-[5px] py-2 px-3 rounded-lg transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-paw"></i> Found Pets
          </Link>
          <Link 
            to="/happy" 
            className="no-underline text-[#555] font-medium flex items-center gap-[5px] py-2 px-3 rounded-lg transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-smile"></i> Happy Tails
          </Link>
          <Link 
            to="/alerts" 
            className="no-underline text-[#555] font-medium flex items-center gap-[5px] py-2 px-3 rounded-lg transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-bell"></i> Get Alerts
          </Link>
          <button 
            className="bg-gradient-to-br from-[#3a7bd5] to-[#00d2ff] border-none rounded-full py-2.5 px-5 text-white font-semibold shadow-[0_4px_15px_rgba(0,210,255,0.3)] transition-all duration-300 ease-in-out cursor-pointer"
          >
            Report Pet
          </button>
        </div>
        
        <div className="flex items-center">
          <Link 
            to="/session" 
            className="no-underline text-[#3a7bd5] font-semibold border-2 border-[#3a7bd5] py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;