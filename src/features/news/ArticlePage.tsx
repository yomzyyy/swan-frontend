import { useParams, Link, Navigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useApiQuery } from '../../hooks';
import { formatNewsDate } from '../../utils';
import { SkeletonArticle } from '../../components/skeletons';
import type { News } from '../../types';

interface ArticleData {
  article: News;
  recentArticles: News[];
}

const ArticlePage = () => {
  const { slug } = useParams();

  const { data: articleData, loading, error } = useApiQuery<ArticleData>(
    async () => {
      const [articleResponse, allArticlesResponse] = await Promise.all([
        api.news.getBySlug(slug as string),
        api.news.getAll(),
      ]);

      const article = articleResponse.data.data;
      const recentArticles = (allArticlesResponse.data.data as News[])
        .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0))
        .slice(0, 4);

      return { article, recentArticles };
    },
    { deps: [slug] }
  );

  const article = articleData?.article || null;
  const recentArticles = articleData?.recentArticles || [];

  if (loading) {
    return <SkeletonArticle />;
  }

  if (error || !article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-black uppercase mb-8 leading-tight">
            {article.title}
          </h1>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={article.image || ''}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-800 leading-relaxed mb-6 text-base">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Metadata: Author and Date */}
          <div className="mb-4">
            <p className="text-sm text-gray-700">
              by admin, {formatNewsDate(article.publishedAt)}
            </p>
          </div>

          {/* Tags */}
          {article.hashtags && article.hashtags.length > 0 && (
            <div className="mb-12">
              <p className="text-sm font-semibold text-gray-900">
                <span className="font-bold">Tags:</span>{' '}
                {article.hashtags.map((tag, index) => (
                  <span key={index}>
                    <span className="text-blue-600">#{tag}</span>
                    {index < article.hashtags.length - 1 && ' '}
                  </span>
                ))}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
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
                        src={relatedArticle.image || ''}
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
