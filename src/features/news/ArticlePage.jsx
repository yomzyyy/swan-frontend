import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { api } from '../../services/api';
import { formatNewsDate } from '../../utils/dateFormatter';
import SkeletonArticle from '../../components/skeletons/SkeletonArticle';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        // Fetch current article by slug
        const articleResponse = await api.news.getBySlug(slug);
        setArticle(articleResponse.data.data);

        // Fetch all articles for "Recent News" section
        const allArticlesResponse = await api.news.getAll();
        const allArticles = allArticlesResponse.data.data
          .sort((a, b) => b.publishedAt - a.publishedAt);
        setRecentArticles(allArticles.slice(0, 4));

      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <SkeletonArticle />;
  }

  if (error || !article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {formatNewsDate(article.publishedAt)}
            </span>
            {article.category && (
              <span className="bg-[#207dff] px-4 py-2 rounded-full text-sm font-semibold">
                {article.category}
              </span>
            )}
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="overflow-hidden shadow-2xl mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="bg-white p-12 shadow-lg mb-12">
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {article.images && article.images.length > 0 && (
              <div className="mt-12 space-y-8">
                {article.images.map((image, index) => (
                  <div key={index} className="overflow-hidden shadow-lg">
                    <img
                      src={image}
                      alt={`${article.title} - Image ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {article.hashtags && article.hashtags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {article.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-[#207dff] px-4 py-2 rounded-full text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/news"
              style={{backgroundColor: '#003366'}}
              className="inline-block text-white px-8 py-3 font-semibold hover:shadow-lg transition-all duration-300 text-center shadow-md"
            >
              ← Back to News
            </Link>
            <Link
              to="/"
              style={{backgroundColor: '#003366'}}
              className="inline-block text-white px-8 py-3 font-semibold hover:shadow-lg transition-all duration-300 text-center shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {recentArticles.length > 0 && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Recent News
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentArticles
                .filter(a => a.slug !== article.slug)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/news/${relatedArticle.slug}`}
                    className="bg-gray-50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-gray-500 text-xs font-semibold uppercase block mb-2">
                        {formatNewsDate(relatedArticle.publishedAt)}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
