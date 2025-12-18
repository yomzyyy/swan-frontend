import { useAuth } from '../../context/AuthContext';

const AdminHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title / Breadcrumbs (can be enhanced later) */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500">Manage your content</p>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{user?.name || user?.username}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>

          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-r from-[#207dff] to-[#00bfff] rounded-full flex items-center justify-center text-white font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="text-sm text-gray-600 hover:text-[#207dff] transition-colors duration-200"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
