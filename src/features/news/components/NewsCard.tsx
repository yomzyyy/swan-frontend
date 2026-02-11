import { Link } from 'react-router-dom';
import { formatNewsDate, resolveImageUrl } from '../../../utils';
import type { News } from '../../../types';

interface NewsCardProps {
  article: News;
}

const NewsCard = ({ article }: NewsCardProps) => (
  <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
    <div className="h-56 overflow-hidden">
      <img
        src={resolveImageUrl(article.image || '')}
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
);

export default NewsCard;
