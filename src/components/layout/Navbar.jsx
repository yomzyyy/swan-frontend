import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 bg-white py-3
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'shadow-md' : ''}
      `}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center cursor-pointer group">
          <img
            src="/swan-logo.png"
            alt="SWAN Shipping Corporation"
            className="h-10 w-auto group-hover:opacity-80 transition-all duration-300"
          />
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8 list-none">
            <li>
              <Link
                to="/about"
                className="relative font-medium text-gray-800 pb-1 transition-all duration-300 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="relative font-medium text-gray-800 pb-1 transition-all duration-300 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/fleet"
                className="relative font-medium text-gray-800 pb-1 transition-all duration-300 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
              >
                Fleet
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="relative font-medium text-gray-800 pb-1 transition-all duration-300 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="relative font-medium text-gray-800 pb-1 transition-all duration-300 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
              >
                News
              </Link>
            </li>
          </ul>

          <Link to="/contact">
            <button className="bg-blue-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-blue-600 hover:shadow-lg transition-all duration-300 cursor-pointer">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
