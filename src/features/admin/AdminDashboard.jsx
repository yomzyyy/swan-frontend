import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminCard from '../../components/admin/AdminCard';
import { getStorageData } from '../../utils/localStorage';
import { getAllVessels } from '../admin/fleet/fleetAdminService';
import { getAllCareers } from '../admin/careers/careersAdminService';

const AdminDashboard = () => {
  const { user } = useAuth();

  const [newsCount, setNewsCount] = useState(0);
  const [fleetCount, setFleetCount] = useState(0);
  const [careersCount, setCareersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [vessels, careers] = await Promise.all([
          getAllVessels(),
          getAllCareers()
        ]);

        // News still uses localStorage (not connected to DB yet)
        const newsArticles = getStorageData('swan_admin_news') || [];

        // Set counts
        setFleetCount(vessels.length);
        setCareersCount(careers.length);
        setNewsCount(newsArticles.length);

      } catch (error) {
        console.error('Failed to load dashboard counts:', error);
        // Set to 0 on error
        setFleetCount(0);
        setCareersCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      title: 'News Articles',
      value: newsCount,
      icon: '📰',
      color: 'blue',
      link: '/admin/news',
    },
    {
      title: 'Fleet Vessels',
      value: fleetCount,
      icon: '🚢',
      color: 'green',
      link: '/admin/fleet',
    },
    {
      title: 'Job Postings',
      value: careersCount,
      icon: '💼',
      color: 'purple',
      link: '/admin/careers',
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
            className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#207dff] hover:shadow-md transition-all duration-200"
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
            className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#207dff] hover:shadow-md transition-all duration-200"
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

      
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
