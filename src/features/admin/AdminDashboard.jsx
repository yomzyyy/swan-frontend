import { useAuth } from '../../context/AuthContext';
import AdminCard from '../../components/admin/AdminCard';
import { getStorageData } from '../../utils/localStorage';

const AdminDashboard = () => {
  const { user } = useAuth();

  const newsArticles = getStorageData('swan_admin_news') || [];
  const fleetVessels = getStorageData('swan_admin_fleet') || [];
  const careers = getStorageData('swan_admin_careers') || [];
  const media = getStorageData('swan_admin_media') || [];

  const stats = [
    {
      title: 'News Articles',
      value: newsArticles.length,
      icon: '📰',
      color: 'blue',
      link: '/admin/news',
    },
    {
      title: 'Fleet Vessels',
      value: fleetVessels.length,
      icon: '🚢',
      color: 'green',
      link: '/admin/fleet',
    },
    {
      title: 'Job Postings',
      value: careers.length,
      icon: '💼',
      color: 'purple',
      link: '/admin/careers',
    },
    {
      title: 'Media Files',
      value: media.length,
      icon: '🖼️',
      color: 'orange',
      link: '/admin/media',
    },
  ];

  return (
    <div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || user?.username}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your content today.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <AdminCard key={index} {...stat} />
        ))}
      </div>

      
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/news/create"
            className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#207dff] hover:shadow-md transition-all duration-200"
          >
            <span className="text-3xl mr-3">➕</span>
            <div>
              <p className="font-semibold text-gray-900">Create Article</p>
              <p className="text-sm text-gray-500">Add new news article</p>
            </div>
          </a>

          <a
            href="/admin/fleet/create"
            className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#207dff] hover:shadow-md transition-all duration-200"
          >
            <span className="text-3xl mr-3">⚓</span>
            <div>
              <p className="font-semibold text-gray-900">Add Vessel</p>
              <p className="text-sm text-gray-500">Add fleet vessel</p>
            </div>
          </a>

          <a
            href="/admin/careers/create"
            className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#207dff] hover:shadow-md transition-all duration-200"
          >
            <span className="text-3xl mr-3">📝</span>
            <div>
              <p className="font-semibold text-gray-900">Post Job</p>
              <p className="text-sm text-gray-500">Create job posting</p>
            </div>
          </a>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
