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
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'bg-white shadow-md py-4'
          : 'bg-transparent py-6'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#207dff] to-[#00bfff] flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow duration-300">
            <span className="text-white font-bold text-base">SWAN</span>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8 list-none">
            <li>
              <Link
                to="/about"
                className={`
                  no-underline font-medium transition-colors duration-300
                  ${isScrolled ? 'text-gray-800' : 'text-white'}
                  hover:text-[#207dff]
                `}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`
                  no-underline font-medium transition-colors duration-300
                  ${isScrolled ? 'text-gray-800' : 'text-white'}
                  hover:text-[#207dff]
                `}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/fleet"
                className={`
                  no-underline font-medium transition-colors duration-300
                  ${isScrolled ? 'text-gray-800' : 'text-white'}
                  hover:text-[#207dff]
                `}
              >
                Fleet
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className={`
                  no-underline font-medium transition-colors duration-300
                  ${isScrolled ? 'text-gray-800' : 'text-white'}
                  hover:text-[#207dff]
                `}
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className={`
                  no-underline font-medium transition-colors duration-300
                  ${isScrolled ? 'text-gray-800' : 'text-white'}
                  hover:text-[#207dff]
                `}
              >
                News
              </Link>
            </li>
          </ul>

          <Link to="/contact">
            <button className="bg-gradient-to-r from-[#207dff] to-[#00bfff] px-8 py-3 rounded-full text-white font-semibold transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/50 cursor-pointer border-none">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
