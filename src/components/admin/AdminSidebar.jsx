import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when clicking a link
    if (onClose) {
      onClose();
    }
  };

  const navItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      title: 'Content Management',
      isSection: true,
    },
    {
      title: 'News Articles',
      path: '/admin/news',
    },
    {
      title: 'Fleet Vessels',
      path: '/admin/fleet',
    },
    {
      title: 'Job Postings',
      path: '/admin/careers',
    },
    {
      title: 'Hero Images',
      path: '/admin/hero',
    },
    {
      title: 'Page Content',
      isSection: true,
    },
    {
      title: 'Home Page',
      path: '/admin/content/home',
    },
    {
      title: 'About Page',
      path: '/admin/content/about',
    },
    {
      title: 'Services Page',
      path: '/admin/content/services',
    },
  ];

  return (
    <div
      className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-[#001E3C] text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Header with close button for mobile */}
      <div className="p-6 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/swan-logo.png"
            alt="SWAN Shipping"
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-lg font-bold">Admin Panel</h1>
            <p className="text-xs text-gray-400 mt-1">Content Management</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-gray-400 hover:text-white"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      
      <nav className="flex-1 overflow-y-auto p-4">
        {navItems.map((item, index) => {
          if (item.isSection) {
            return (
              <div key={index} className="mt-6 mb-2 px-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item.title}
                </h3>
              </div>
            );
          }

          const active = isActive(item.path);

          return (
            <Link
              key={index}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2 mb-1 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-[#207dff] text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full bg-[#207dff] hover:bg-[#1a65cc] text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
