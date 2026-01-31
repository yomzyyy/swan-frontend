import { useState, useRef, useEffect } from 'react';
import { CloudUpload, Link, CheckCircle, Error as ErrorIcon, BrokenImage, Close } from '@mui/icons-material';
import { uploadContentImage, validateImageFile, formatFileSize } from '../../../utils/imageUploadService';

const ImageUploadField = ({ field, value, onChange }) => {
  const isUploadedUrl = value && value.startsWith('/api/');
  const [mode, setMode] = useState(isUploadedUrl || !value ? 'upload' : 'url');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    setUploadError('');
    setUploadSuccess('');

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      return;
    }

    setIsUploading(true);

    const result = await uploadContentImage(file);

    if (result.success) {
      onChange(field.key, result.imageUrl);
      setUploadSuccess(`Uploaded ${file.name} (${formatFileSize(file.size)})`);
    } else {
      setUploadError(result.error);
    }

    setIsUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleBrowse = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [value]);

  const resolveImageSrc = (url) =>
    url.startsWith('/api/')
      ? `${import.meta.env.VITE_API_BASE_URL?.replace('/v1', '') || 'http://localhost:3001'}/v1${url}`
      : url;

  const renderPreview = () => {
    if (!value) return null;

    const isUploaded = value.startsWith('/api/');

    return (
      <div className="mt-2 relative inline-block">
        {imageError ? (
          <div className="h-20 w-20 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1">
            <BrokenImage sx={{ fontSize: 24 }} className="text-gray-400" />
            <span className="text-[10px] text-gray-400 text-center leading-tight">Image failed<br />to load</span>
          </div>
        ) : (
          <img
            src={resolveImageSrc(value)}
            alt="Preview"
            className="h-20 w-20 object-cover rounded-lg border border-gray-200"
            onError={() => setImageError(true)}
          />
        )}

        {/* Source badge */}
        <span className={`absolute bottom-1 left-1 text-[9px] font-medium px-1 py-0.5 rounded ${
          isUploaded ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {isUploaded ? 'Uploaded' : 'External URL'}
        </span>

        {/* Clear button */}
        <button
          type="button"
          onClick={() => onChange(field.key, '')}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-sm transition-colors"
          title="Remove image"
        >
          <Close sx={{ fontSize: 12 }} />
        </button>
      </div>
    );
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>

      {/* Mode Tabs */}
      <div className="flex mb-2">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-l-lg border transition-colors ${
            mode === 'upload'
              ? 'bg-[#207dff] text-white border-[#207dff]'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <CloudUpload sx={{ fontSize: 14 }} /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-r-lg border-t border-r border-b transition-colors ${
            mode === 'url'
              ? 'bg-[#207dff] text-white border-[#207dff]'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Link sx={{ fontSize: 14 }} /> URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-[#207dff] bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            } ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-[#207dff] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-500">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <CloudUpload sx={{ fontSize: 28 }} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Drag & drop an image or <span className="text-[#207dff] font-medium">browse</span>
                </span>
                <span className="text-xs text-gray-400">JPEG, PNG, WebP — Max 5MB</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleBrowse}
              className="hidden"
            />
          </div>

          {uploadSuccess && (
            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <CheckCircle sx={{ fontSize: 16 }} /> {uploadSuccess}
            </div>
          )}
        </>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <input
          type="url"
          value={value || ''}
          onChange={e => onChange(field.key, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
          placeholder={field.placeholder || 'https://example.com/image.jpg'}
        />
      )}

      {/* Error */}
      {uploadError && (
        <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
          <ErrorIcon sx={{ fontSize: 16 }} /> {uploadError}
        </div>
      )}

      {/* Preview */}
      {renderPreview()}
    </div>
  );
};

export default ImageUploadField;
