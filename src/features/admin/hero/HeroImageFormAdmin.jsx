import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAllHeroImages,
  uploadHeroImage,
  updateHeroAltText,
  formatFileSize,
  validateImageFile
} from './heroAdminService';
import FormFileUpload from '../../../components/forms/FormFileUpload';

const HeroImageFormAdmin = () => {
  const { position } = useParams();
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [altText, setAltText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadMode, setUploadMode] = useState('replace'); // 'replace' or 'alttext-only'

  useEffect(() => {
    loadCurrentImage();
  }, [position]);

  const loadCurrentImage = async () => {
    try {
      const images = await getAllHeroImages();
      const existing = images.find((img) => img.position === parseInt(position));

      if (existing) {
        setCurrentImage(existing);
        setAltText(existing.altText);
      } else {
        setAltText('');
      }
    } catch (error) {
      console.error('Failed to load current image:', error);
      setError('Failed to load current image. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.value; // FormFileUpload passes file as e.target.value
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      setImageFile(null);
      return;
    }

    setImageFile(file);
    setError('');
    setSuccess('');
    setUploadMode('replace');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      let result;

      if (uploadMode === 'replace' && imageFile) {
        if (!altText.trim()) {
          setError('Alt text is required');
          setIsSubmitting(false);
          return;
        }

        result = await uploadHeroImage(parseInt(position), imageFile, altText.trim());
      } else if (uploadMode === 'alttext-only' && currentImage) {
        if (!altText.trim()) {
          setError('Alt text cannot be empty');
          setIsSubmitting(false);
          return;
        }

        result = await updateHeroAltText(parseInt(position), altText.trim());
      } else {
        setError('Please select an image to upload');
        setIsSubmitting(false);
        return;
      }

      if (result.success) {
        setSuccess(
          uploadMode === 'replace'
            ? 'Image uploaded successfully!'
            : 'Alt text updated successfully!'
        );

        setTimeout(() => {
          navigate('/admin/hero');
        }, 1500);
      } else {
        setError(result.error || 'Failed to save. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchToAltTextMode = () => {
    setUploadMode('alttext-only');
    setImageFile(null);
    setImagePreview(null);
    setError('');
    setSuccess('');
  };

  return (
    <div>
      
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-2">
          <button
            onClick={() => navigate('/admin/hero')}
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {currentImage ? 'Replace' : 'Upload'} Hero Image - Position {position}
          </h1>
        </div>
        <p className="text-gray-600">
          {currentImage
            ? 'Upload a new image to replace the current one, or update just the alt text'
            : 'Upload a new hero image for this carousel position'}
        </p>
      </div>

      
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {success}
        </div>
      )}

      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6">
        
        {currentImage && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Image
            </label>
            <div className="border rounded-lg p-4 bg-gray-50">
              <img
                src={`${
                  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1'
                }${currentImage.imageUrl}`}
                alt={currentImage.altText}
                className="w-full max-w-2xl h-64 object-cover rounded mb-2"
              />
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>File:</strong> {currentImage.filename}
                </p>
                <p>
                  <strong>Size:</strong> {formatFileSize(currentImage.fileSize)}
                </p>
                <p>
                  <strong>Type:</strong> {currentImage.mimeType}
                </p>
                <p>
                  <strong>Current Alt Text:</strong> {currentImage.altText}
                </p>
              </div>
            </div>
          </div>
        )}


        <FormFileUpload
          label={currentImage ? 'Replace with New Image' : 'Upload Image'}
          name="heroImage"
          onChange={handleFileChange}
          error={error && !imageFile ? error : ''}
          required={!currentImage}
          accept="image/jpeg,image/jpg,image/png,image/webp"
          file={imageFile}
          description="JPEG, PNG, or WebP (max 5MB) | Recommended: 1920×1080px"
          showImagePreview={true}
          disabled={uploadMode === 'alttext-only'}
        />

        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Text (for accessibility) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            required
            maxLength={200}
            disabled={uploadMode === 'alttext-only' && isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Describe the image for screen readers (e.g., 'Maritime vessel at sunset')"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">
              Describe what's in the image for people using screen readers
            </p>
            <p
              className={`text-xs ${altText.length > 180 ? 'text-red-500' : 'text-gray-500'}`}
            >
              {altText.length}/200
            </p>
          </div>
        </div>

        
        {currentImage && uploadMode !== 'alttext-only' && !imageFile && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-2">
              Want to update just the alt text without changing the image?
            </p>
            <button
              type="button"
              onClick={switchToAltTextMode}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Update alt text only →
            </button>
          </div>
        )}

        
        {uploadMode === 'alttext-only' && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Alt Text Only Mode:</strong> You are updating only the alt text. The
              image will not be changed.
            </p>
            {!isSubmitting && (
              <button
                type="button"
                onClick={() => {
                  setUploadMode('replace');
                  setError('');
                }}
                className="text-sm text-yellow-700 hover:text-yellow-900 underline mt-2"
              >
                ← Switch back to upload mode
              </button>
            )}
          </div>
        )}

        
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate('/admin/hero')}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              (!imageFile && !currentImage) ||
              (uploadMode === 'replace' && !imageFile)
            }
            className="px-6 py-2 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {uploadMode === 'replace' ? 'Uploading...' : 'Updating...'}
              </>
            ) : uploadMode === 'replace' ? (
              'Upload Image'
            ) : (
              'Update Alt Text'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroImageFormAdmin;
