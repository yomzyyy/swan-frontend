import { useNavigate } from 'react-router-dom';
import WarningAmber from '@mui/icons-material/WarningAmber';

interface PageErrorProps {
  message: string;
  onRetry?: () => void;
  backTo?: string;
  backLabel?: string;
}

function PageError({ message, onRetry, backTo, backLabel }: PageErrorProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <WarningAmber
            sx={{ fontSize: 56, color: '#b8860b' }}
          />
        </div>
        <h2
          className="text-2xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Something went wrong
        </h2>
        <p
          className="text-gray-600 mb-8"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: '#003366', fontFamily: 'Montserrat, sans-serif' }}
            >
              Try Again
            </button>
          )}
          {backTo && (
            <button
              onClick={() => navigate(backTo)}
              className="px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200 border"
              style={{
                color: '#003366',
                borderColor: '#003366',
                backgroundColor: 'transparent',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {backLabel || 'Go Back'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageError;
