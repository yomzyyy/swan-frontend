import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Close } from '@mui/icons-material';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 list-none">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-gray-800 hover:text-blue-600 transition-colors"
            aria-label="Open menu"
          >
            <Menu fontSize="large" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <img
              src="/swan-logo.png"
              alt="SWAN Shipping Corporation"
              className="h-8 w-auto"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-800 hover:text-blue-600 transition-colors"
              aria-label="Close menu"
            >
              <Close fontSize="large" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="flex flex-col gap-4 list-none">
              <li>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-200 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-200 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/fleet"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-200 transition-colors"
                >
                  Fleet
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-200 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-200 transition-colors"
                >
                  News
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Footer with Contact Button */}
          <div className="p-6 border-t border-gray-200">
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full bg-blue-500 px-6 py-3 rounded-full text-white font-semibold hover:bg-blue-600 transition-all duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
