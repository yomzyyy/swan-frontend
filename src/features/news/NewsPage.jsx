import { Link } from 'react-router-dom';
import { newsArticles } from './data/articles';

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-6">
            News & Updates
          </h1>
          <p className="text-xl opacity-95 max-w-3xl leading-relaxed">
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
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
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
                      {article.date}
                    </span>
                    {article.category && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold uppercase">
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
                    className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-center"
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
          className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NewsPage;
