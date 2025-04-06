import React from 'react';

const Footer = () => (
    <footer className="bg-gradient-to-r relative z-[1] from-blue-600 to-blue-950 text-white py-8 mt-2 overflow-hidden">
        <i className="fas fa-paw absolute text-[10rem] top-24 left-9 -rotate-[30deg] z-[-1] text-sky-200/15"></i>
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-4">About Us</h3>
                    <p className="text-xs text-gray-200">
                    We're dedicated to transforming lives, one rescue at a time. With your support, we provide care, shelter, and hope for animals in need. Join our compassionate community and help create a kinder world for every life.
                    </p>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><a href="/" className="text-sm hover:text-gray-300 transition-colors">Home</a></li>
                        <li><a href="/donation" className="text-sm hover:text-gray-300 transition-colors">Donate</a></li>
                        <li><a href="/sponsor" className="text-sm hover:text-gray-300 transition-colors">Sponsor</a></li>
                        <li><a href="/lostpets" className="text-sm hover:text-gray-300 transition-colors">Lost Pets</a></li>
                    </ul>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                    <ul className="space-y-2">
                        <li className="text-sm">123 Animal Lane</li>
                        <li className="text-sm">Colombo, Sri Lanka</li>
                        <li className="text-sm">Phone: (555) 123-4567</li>
                        <li className="text-sm">Email: info@example.com</li>
                    </ul>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                    <div className="flex flex-col space-y-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 bg-sky-100 text-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button className="bg-gradient-to-br from-cyan-400 to-blue-500 hover:to-sky-500  px-4 py-2 rounded transition-colors duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-sky-300/25 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-xs">© {new Date().getFullYear()} All rights reserved</p>
                    </div>
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a href="#" className="text-xs hover:text-gray-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs hover:text-gray-300 transition-colors">Terms of Service</a>
                        <a href="#" className="text-xs hover:text-gray-300 transition-colors">Contact</a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-facebook fa-lg"></i></a>
                        <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-twitter fa-lg"></i></a>
                        <a href="#" className="hover:text-pink-500 transition-colors"><i className="fab fa-instagram fa-lg"></i></a>
                        <a href="#" className="hover:text-blue-700 transition-colors"><i className="fab fa-linkedin fa-lg"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <i className="fas fa-paw absolute text-[15rem] top-12 right-1 -rotate-[30deg] z-[-1] text-sky-200/5"></i>
    </footer>
);

export default Footer;