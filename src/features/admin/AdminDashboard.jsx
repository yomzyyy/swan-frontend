import { useAuth } from '../../context/AuthContext';
import { AdminCard } from '../../components/admin';
import { SkeletonStats } from '../../components/skeletons';
import { fleetService, careersService } from '../../services/adminCrudService';
import { api } from '../../services/api';
import { useApiQuery } from '../../hooks';

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data: counts, loading } = useApiQuery(
    async () => {
      const [vessels, careers, newsResponse] = await Promise.all([
        fleetService.getAll(),
        careersService.getAll(),
        api.news.getAllAdmin()
      ]);
      return {
        fleet: vessels.length,
        careers: careers.length,
        news: (newsResponse.data?.data || []).length,
      };
    },
    { initialData: { fleet: 0, careers: 0, news: 0 } }
  );

  const stats = [
    {
      title: 'News Articles',
      value: counts.news,
      icon: '📰',
      color: 'blue',
      link: '/admin/news',
    },
    {
      title: 'Fleet Vessels',
      value: counts.fleet,
      icon: '🚢',
      color: 'green',
      link: '/admin/fleet',
    },
    {
      title: 'Job Postings',
      value: counts.careers,
      icon: '💼',
      color: 'purple',
      link: '/admin/careers',
    },
  ];

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || user?.username}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your content today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array(3).fill(0).map((_, i) => (
            <SkeletonStats key={i} />
          ))}
        </div>
      </div>
    );
  }

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

      
      <div className="bg-white shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/news/create"
            className="flex items-center p-4 border-2 border-gray-200 hover:border-[#207dff] hover:shadow-md transition-all duration-200"
          >
            <div className="w-10 h-10 mr-3 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="black">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Create Article</p>
              <p className="text-sm text-gray-500">Add new news article</p>
            </div>
          </a>

          <a
            href="/admin/fleet/create"
            className="flex items-center p-4 border-2 border-gray-200 hover:border-[#207dff] hover:shadow-md transition-all duration-200"
          >
            <div className="w-10 h-10 mr-3 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="black">
                <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Add Vessel</p>
              <p className="text-sm text-gray-500">Add fleet vessel</p>
            </div>
          </a>

          <a
            href="/admin/careers/create"
            className="flex items-center p-4 border-2 border-gray-200 hover:border-[#207dff] hover:shadow-md transition-all duration-200"
          >
            <div className="w-10 h-10 mr-3 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="black">
                <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Post Job</p>
              <p className="text-sm text-gray-500">Create job posting</p>
            </div>
          </a>
        </div>
      </div>

      
      <div className="bg-white shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
