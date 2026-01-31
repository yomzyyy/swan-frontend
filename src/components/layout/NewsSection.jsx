import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { formatNewsDate } from '../../utils/dateFormatter';
import ActionButton from '../common/ActionButton';

const NewsSection = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await api.news.getAll();
        // Get only the 4 most recent articles
        const recentArticles = (response.data?.data || []).slice(0, 4);
        setNewsArticles(recentArticles);
      } catch (err) {
        console.error('Failed to load news articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading || newsArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-blue-600 uppercase tracking-wider mb-4 font-semibold">
            BLOG & NEWS
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            POWERING YOUR ENERGY NEEDS WITH INNOVATIVE SOLUTIONS
          </h2>
        </div>

        {/* News Grid - 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="flex gap-6"
            >
              {/* Image Thumbnail */}
              <div className="w-44 h-44 flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                {/* Date and Author */}
                <p className="text-xs text-gray-600 uppercase mb-3 font-medium">
                  {formatNewsDate(article.publishedAt)} • ADMIN
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                  {article.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/news/${article.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                >
                  Read More +
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Go To Blog Button */}
        <div className="flex justify-center">
          <ActionButton to="/news" size="lg">
            Go To Blog
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
