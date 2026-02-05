import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createArticle, updateArticle, getArticleById } from './newsAdminService';
import { uploadNewsImage, validateImageFile } from '../../../services/imageService';
import { FormFileUpload } from '../../../components/forms';

const NewsFormAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Company News',
    image: '',
    excerpt: '',
    content: '',
    hashtags: [],
  });

  const [hashtagInput, setHashtagInput] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageMode, setImageMode] = useState('url');
  const [imageFile, setImageFile] = useState(null);
  const [imageAltText, setImageAltText] = useState('');
  const [imageError, setImageError] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      if (isEditMode) {
        try {
          const article = await getArticleById(id);
          if (article) {
            // Convert publishedAt timestamp to date string for input
            const dateStr = new Date(article.publishedAt).toISOString().split('T')[0];
            setFormData({
              ...article,
              date: dateStr,
            });
          } else {
            setError('Article not found');
          }
        } catch (err) {
          const errorMessage = err.message || 'Failed to load article';
          setError(`Failed to load article: ${errorMessage}`);
          console.error('Error loading article:', err);
        }
      }
    };
    loadArticle();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'title' && !isEditMode) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.value;
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError(validation.error);
      setImageFile(null);
      return;
    }

    setImageFile(file);
    setImageError('');
  };

  const handleAddHashtag = () => {
    if (hashtagInput.trim()) {
      const tag = hashtagInput.trim().replace(/^#/, '');
      if (!formData.hashtags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          hashtags: [...prev.hashtags, tag]
        }));
      }
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      // If upload mode and file selected, upload first
      if (imageMode === 'upload' && imageFile) {
        setImageUploading(true);
        const uploadResult = await uploadNewsImage(imageFile, imageAltText);
        setImageUploading(false);

        if (!uploadResult.success) {
          setError(uploadResult.error || 'Failed to upload image');
          setIsSubmitting(false);
          return;
        }

        // Use uploaded image URL (full URL from backend)
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1';
        imageUrl = `${baseUrl}${uploadResult.data.imageUrl}`;
      }

      // Convert date string to timestamp for API
      const publishedAt = new Date(formData.date).getTime();

      const dataToSubmit = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        image: imageUrl,
        hashtags: formData.hashtags,
        publishedAt: publishedAt,
        status: 'published'
      };

      const result = isEditMode
        ? await updateArticle(id, dataToSubmit)
        : await createArticle(dataToSubmit);

      if (result.success) {
        navigate('/admin/news');
      } else {
        setError(result.error || 'Failed to save article');
      }
    } catch (err) {
      setError('An error occurred while saving');
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setImageUploading(false);
    }
  };

  return (
    <div>
      
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-2">
          <button
            onClick={() => navigate('/admin/news')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Article' : 'Create New Article'}
          </h1>
        </div>
        <p className="text-gray-600">
          {isEditMode ? 'Update article details' : 'Fill in the details for your new article'}
        </p>
      </div>

      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="Enter article title"
            />
          </div>

          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="article-url-slug"
            />
            <p className="text-xs text-gray-500 mt-1">URL-friendly version of the title</p>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
            >
              <option value="Company News">Company News</option>
              <option value="Industry Updates">Industry Updates</option>
              <option value="Fleet News">Fleet News</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Safety">Safety</option>
            </select>
          </div>


          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Article Image <span className="text-red-500">*</span>
            </label>

            {/* Mode Toggle */}
            <div className="flex space-x-2 mb-4">
              <button
                type="button"
                onClick={() => setImageMode('url')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  imageMode === 'url'
                    ? 'bg-[#207dff] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Image URL
              </button>
              <button
                type="button"
                onClick={() => setImageMode('upload')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  imageMode === 'upload'
                    ? 'bg-[#207dff] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upload Image
              </button>
            </div>

            {/* URL Mode */}
            {imageMode === 'url' && (
              <div>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required={imageMode === 'url'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Upload Mode */}
            {imageMode === 'upload' && (
              <div>
                <FormFileUpload
                  label=""
                  name="newsImage"
                  onChange={handleImageFileChange}
                  error={imageError}
                  required={imageMode === 'upload' && !formData.image && !imageFile}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  file={imageFile}
                  description="JPEG, PNG, or WebP (max 5MB) | Recommended: 1200×630px for social sharing"
                  showImagePreview={true}
                />

                {/* Optional Alt Text for Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text (optional, for accessibility)
                  </label>
                  <input
                    type="text"
                    value={imageAltText}
                    onChange={(e) => setImageAltText(e.target.value)}
                    maxLength={200}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
                    placeholder="Describe the image for screen readers"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {imageAltText.length}/200
                  </p>
                </div>
              </div>
            )}

            {imageUploading && (
              <div className="mt-2 text-sm text-blue-600">
                Uploading image...
              </div>
            )}
          </div>

          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="Short description for article preview"
            />
          </div>

          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="Full article content"
            />
          </div>

          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hashtags
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHashtag();
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
                placeholder="Add hashtag (without #)"
              />
              <button
                type="button"
                onClick={handleAddHashtag}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveHashtag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/news')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Article' : 'Create Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsFormAdmin;
