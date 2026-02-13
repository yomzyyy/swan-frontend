import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { api } from '../../services/api';
import { useApiQuery } from '../../hooks';
import { PageError, SEO } from '../../components/common';
import { SkeletonCard } from '../../components/skeletons';
import { PAGE_SEO } from '../../constants/seo';
import NewsSidebar from './components/NewsSidebar';
import NewsCard from './components/NewsCard';
import type { News } from '../../types';

const NewsPage = () => {
  const { data, loading, error } = useApiQuery<News[]>(
    () => api.news.getAll().then(r => r.data?.data || []),
    { initialData: [] }
  );
  const newsArticles = data ?? [];
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

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
        <div className="max-w-7xl mx-auto px-8 py-12">
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
      <div className="min-h-screen bg-gray-50 pt-24">
        <PageError
          message={error}
          onRetry={() => window.location.reload()}
          backTo="/"
          backLabel="Go Home"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <SEO {...PAGE_SEO.NEWS} path="/news" />
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <NewsSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allTags={allTags}
          />

          {/* Main Content */}
          <main className="flex-1">
            {currentArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(_event, value) => setCurrentPage(value)}
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
