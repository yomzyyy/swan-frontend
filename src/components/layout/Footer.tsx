import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1a2332] text-white">

      <div className="max-w-7xl mx-auto px-8 py-16">
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          <div className="lg:col-span-1">

            <div className="flex items-center mb-6">
              <img
                src="/swan-logo.png"
                alt="SWAN Shipping Corporation"
                className="h-12 w-auto"
              />
            </div>


            <h3 className="text-lg font-bold mb-3">
              SWAN Shipping
            </h3>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Safe Maritime LPG Transport Solutions. Trusted by 200+ global energy partners since 1994.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                ISO 9001
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                IMO Certified
              </span>
            </div>
          </div>


          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/fleet"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  Fleet
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  Vessel Chartering
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  Terminal Operations
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  Fleet Management
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  Safety Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
                >
                  24/7 Support
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">
                <span className="block font-semibold text-white mb-1">Address</span>
                3F S&L Building, 1500 Roxas Boulevard, Ermita, Manila 1000 Philippines
              </li>
              <li className="text-sm text-gray-400">
                <span className="block font-semibold text-white mb-1">Phone</span>
                <a href="tel:+6561234567" className="hover:text-[#207dff] transition-colors duration-300">
                  +63-2-85268718 to 19;
                  +63-2-85239830
                </a>
              </li>
              <li className="text-sm text-gray-400">
                <span className="block font-semibold text-white mb-1">Email</span>
                <a href="mailto:info@swanshipping.com" className="hover:text-[#207dff] transition-colors duration-300">
                  info@swan-manila.com
                </a>
              </li>
              
            </ul>
          </div>


          <div>
            <h4 className="text-lg font-bold mb-6">Follow Us</h4>

            <div className="flex gap-3 mb-8">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#207dff] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <span className="text-xl">in</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#207dff] transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <span className="text-xl">𝕏</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#207dff] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <span className="text-xl">f</span>
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">
                Subscribe to our newsletter
              </p>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#207dff] transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#207dff] to-[#00bfff] px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>


      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">


            <p className="text-sm text-gray-400">
              © 2021 SWAN Shipping Corporation. All rights reserved.
            </p>


            <div className="flex gap-6">
              <Link
                to="/privacy-policy"
                className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/cookie-policy"
                className="text-sm text-gray-400 hover:text-[#207dff] transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
