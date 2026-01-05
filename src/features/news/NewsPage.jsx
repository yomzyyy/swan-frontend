import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { formatNewsDate } from '../../utils/dateFormatter';

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await api.news.getAll();
        setNewsArticles(response.data.data);
      } catch (err) {
        setError('Failed to load news articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{backgroundColor: '#003366'}} className="text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-6 text-white">
            News & Updates
          </h1>
          <p className="text-xl opacity-95 max-w-3xl leading-relaxed text-white">
            Stay informed with the latest news, announcements, and milestones
            from SWAN Shipping Corporation.
          </p>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-gray-500 text-xs font-semibold uppercase">
                      {formatNewsDate(article.publishedAt)}
                    </span>
                    {article.category && (
                      <span className="bg-navy-800 text-white px-3 py-1 border-l-4 border-gold-500 text-xs font-semibold uppercase">
                        {article.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-3">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>

                  <Link
                    to={`/news/${article.slug}`}
                    style={{backgroundColor: '#003366'}}
                    className="inline-block text-white px-6 py-3 font-semibold hover:shadow-lg transition-all duration-300 text-center shadow-md"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 text-center bg-white">
        <Link
          to="/"
          style={{backgroundColor: '#003366'}}
          className="inline-block text-white px-8 py-3 font-semibold hover:shadow-lg transition-all duration-300 shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NewsPage;
