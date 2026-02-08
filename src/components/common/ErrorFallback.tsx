import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, onReset }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onReset?.();
    navigate('/');
  };

  const handleRetry = () => {
    onReset?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0A1929' }}>
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div
            className="inline-block w-20 h-20 mb-6"
            style={{ borderColor: '#b8860b' }}
          >
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle cx="40" cy="40" r="36" stroke="#b8860b" strokeWidth="2" fill="none" />
              <path d="M40 22V46" stroke="#b8860b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="40" cy="56" r="2.5" fill="#b8860b" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Something Went Wrong
          </h1>
          <p className="text-gray-400 mb-6" style={{ fontFamily: 'Lato, sans-serif' }}>
            We encountered an unexpected error. Our team has been notified and is working to resolve the issue.
          </p>
          {error?.message && (
            <p className="text-sm text-gray-500 mb-8 font-mono bg-gray-800/50 p-3 rounded">
              {error.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="px-8 py-3 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: '#003366', fontFamily: 'Montserrat, sans-serif' }}
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="px-8 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200 border"
            style={{
              color: '#b8860b',
              borderColor: '#b8860b',
              backgroundColor: 'transparent',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
