import { useAuth } from '../../context/AuthContext';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side: Menu button (mobile) + Title */}
        <div className="flex items-center space-x-3">
          {/* Hamburger menu button - visible only on mobile */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Admin Panel</h2>
            <p className="hidden sm:block text-sm text-gray-500">Manage your content</p>
          </div>
        </div>

        {/* Right side: User info + Logout */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* User info - hidden on small mobile */}
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-700">{user?.name || user?.username}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>

          {/* User avatar */}
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#207dff] to-[#00bfff] rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>

          {/* Logout button - hidden on small mobile, shown as icon on larger screens */}
          <button
            onClick={logout}
            className="hidden sm:block text-sm text-gray-600 hover:text-[#207dff] transition-colors duration-200"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
