import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Instagram, Twitter, Facebook, LinkedIn, Close } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import { api } from '../../services/api';
import { formatNewsDate } from '../../utils/dateFormatter';
import SkeletonCard from '../../components/skeletons/SkeletonCard';

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

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

  // Filter articles based on search query
  const filteredArticles = newsArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Extract unique tags
  const allTags = [...new Set(newsArticles.flatMap(article => article.hashtags || []))];

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white border border-gray-300 mb-4 h-10"></div>
              <div className="bg-white border border-gray-300 p-4 mb-4 h-24"></div>
              <div className="bg-white border border-gray-300 p-4 h-20"></div>
            </aside>
            <main className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(9).fill(0).map((_, i) => (
                  <SkeletonCard key={i} variant="news" />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            {/* Search Bar */}
            <div className="flex mb-4 items-stretch">
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-full px-4 py-2 pr-10 border border-gray-300 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 focus-visible:outline-none text-sm"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <Close fontSize="small" />
                  </button>
                )}
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 text-white transition-colors flex items-center justify-center">
                <Search fontSize="small" />
              </button>
            </div>

            {/* Tags Section */}
            {allTags.length > 0 && (
              <div className="bg-white border border-gray-300 p-4 mb-4">
                <h3 className="text-base font-bold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 6).map(tag => (
                    <span
                      key={tag}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Follow Us Section */}
            <div className="bg-white border border-gray-300 p-4">
              <h3 className="text-base font-bold mb-3">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram fontSize="small" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter fontSize="small" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook fontSize="small" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedIn fontSize="small" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* News Grid */}
            {currentArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                      <div className="h-56 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        {/* Date and Author */}
                        <p className="text-xs text-gray-600 uppercase mb-3 font-semibold">
                          {formatNewsDate(article.publishedAt)} • ADMIN
                        </p>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                          {article.excerpt}
                        </p>

                        {/* Read More Link */}
                        <Link
                          to={`/news/${article.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                        >
                          Read More +
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(event, value) => setCurrentPage(value)}
                      shape="rounded"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          color: '#4a5568',
                          borderColor: '#cbd5e0',
                          '&:hover': {
                            backgroundColor: '#f7fafc',
                          },
                        },
                        '& .Mui-selected': {
                          backgroundColor: '#2563eb !important',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#1d4ed8 !important',
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
