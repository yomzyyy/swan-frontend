import { useNavigate } from 'react-router-dom';
import { SEO } from '../../components/common';
import { PAGE_SEO } from '../../constants/seo';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#0A1929' }}
    >
      <SEO {...PAGE_SEO.NOT_FOUND} path="/404" noIndex />
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <h1
            className="text-8xl font-bold mb-4"
            style={{ color: '#b8860b', fontFamily: 'Montserrat, sans-serif' }}
          >
            404
          </h1>
          <h2
            className="text-3xl font-bold text-white mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Page Not Found
          </h2>
          <p
            className="text-gray-400 mb-8"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: '#003366', fontFamily: 'Montserrat, sans-serif' }}
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200 border"
            style={{
              color: '#b8860b',
              borderColor: '#b8860b',
              backgroundColor: 'transparent',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
