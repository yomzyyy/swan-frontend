import { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';
import { toast } from 'sonner';
import {
  getAllHeroImages,
  uploadHeroImage,
  updateHeroAltText,
  deleteHeroImage,
  formatFileSize,
  validateImageFile
} from '../../features/admin/hero/heroAdminService';
import FormFileUpload from '../forms/FormFileUpload';
import ConfirmDialog from './ConfirmDialog';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1';

const HeroSectionModal = ({ isOpen, onClose, contentData, onSaveContent, isSaving }) => {
  // --- Text fields state ---
  const [textFields, setTextFields] = useState({ title: '', description: '', ctaText: '' });

  // --- Image management state ---
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPosition, setEditingPosition] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [altText, setAltText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, image: null });

  useEffect(() => {
    if (isOpen) {
      setTextFields({
        title: contentData?.title || '',
        description: contentData?.description || '',
        ctaText: contentData?.ctaText || ''
      });
      loadImages();
      setEditingPosition(null);
      setImageFile(null);
      setAltText('');
      setError('');
    }
  }, [isOpen, contentData]);

  // --- Image loading ---
  const loadImages = async () => {
    setLoading(true);
    try {
      const allImages = await getAllHeroImages();
      const imagesByPosition = [1, 2, 3].map((position) => {
        const existing = allImages.find((img) => img.position === position);
        return existing
          ? { ...existing, isEmpty: false }
          : { position, isEmpty: true, altText: 'Not uploaded yet', filename: 'No image' };
      });
      setImages(imagesByPosition);
    } catch {
      setImages([
        { position: 1, isEmpty: true, altText: 'Error loading', filename: 'Error' },
        { position: 2, isEmpty: true, altText: 'Error loading', filename: 'Error' },
        { position: 3, isEmpty: true, altText: 'Error loading', filename: 'Error' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --- Text field handlers ---
  const handleTextChange = (field, value) => {
    setTextFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveText = async () => {
    if (!textFields.title.trim()) {
      toast.error('Title is required');
      return;
    }
    await onSaveContent(textFields);
  };

  // --- Image handlers (unchanged from HeroImagesModal) ---
  const handleEditClick = (image) => {
    setEditingPosition(image.position);
    setAltText(image.isEmpty ? '' : image.altText);
    setImageFile(null);
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.value;
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      setImageFile(null);
      return;
    }
    setImageFile(file);
    setError('');
  };

  const handleUploadSave = async () => {
    const currentImage = images.find((img) => img.position === editingPosition);
    const hasExisting = currentImage && !currentImage.isEmpty;

    if (!imageFile && !hasExisting) {
      setError('Please select an image to upload');
      return;
    }
    if (!altText.trim()) {
      setError('Alt text is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    let result;
    if (imageFile) {
      result = await uploadHeroImage(editingPosition, imageFile, altText.trim());
    } else {
      result = await updateHeroAltText(editingPosition, altText.trim());
    }

    if (result.success) {
      toast.success(imageFile ? 'Image uploaded successfully!' : 'Alt text updated!');
      await loadImages();
      setEditingPosition(null);
      setImageFile(null);
      setAltText('');
    } else {
      setError(result.error || 'Failed to save');
    }

    setIsSubmitting(false);
  };

  const handleDeleteClick = (image) => {
    if (image.isEmpty) return;
    setDeleteDialog({ open: true, image });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.image) return;
    const result = await deleteHeroImage(deleteDialog.image.position);
    if (result.success) {
      toast.success('Hero image deleted!');
      await loadImages();
    } else {
      toast.error(result.error || 'Failed to delete');
    }
    setDeleteDialog({ open: false, image: null });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Hero Section</h2>
            <p className="text-sm text-gray-500 mt-1">Manage hero text and carousel images</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <Close />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* ─── Text Fields Section ─── */}
          <div className="mb-6 border rounded-xl p-5 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Text</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={textFields.title}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={textFields.description}
                  onChange={(e) => handleTextChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={textFields.ctaText}
                  onChange={(e) => handleTextChange('ctaText', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveText}
                disabled={isSaving}
                className="px-5 py-2 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Text'}
              </button>
            </div>
          </div>

          {/* ─── Carousel Images Section ─── */}
          <div className="border rounded-xl p-5 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Carousel Images</h3>

            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="text-gray-500">Loading images...</div>
              </div>
            ) : editingPosition ? (
              /* Edit / Upload Form for a single position */
              <div>
                <button
                  onClick={() => { setEditingPosition(null); setError(''); }}
                  className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all positions
                </button>

                <h4 className="text-base font-semibold mb-4">
                  Position #{editingPosition}
                </h4>

                {/* Current image preview */}
                {(() => {
                  const current = images.find((img) => img.position === editingPosition);
                  if (current && !current.isEmpty) {
                    return (
                      <div className="mb-4 border rounded-lg p-3 bg-white">
                        <p className="text-sm font-medium text-gray-700 mb-2">Current Image</p>
                        <img
                          src={`${API_BASE}${current.imageUrl}`}
                          alt={current.altText}
                          className="w-full max-h-48 object-cover rounded mb-2"
                        />
                        <p className="text-xs text-gray-500">
                          {current.filename} &middot; {formatFileSize(current.fileSize)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })()}

                <FormFileUpload
                  label="Upload Image"
                  name="heroImage"
                  onChange={handleFileChange}
                  error=""
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  file={imageFile}
                  description="JPEG, PNG, or WebP (max 5MB) | Recommended: 1920x1080px"
                  showImagePreview={true}
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    maxLength={200}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Describe the image for screen readers"
                  />
                  <p className={`text-xs mt-1 ${altText.length > 180 ? 'text-red-500' : 'text-gray-500'}`}>
                    {altText.length}/200
                  </p>
                </div>

                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => { setEditingPosition(null); setError(''); }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadSave}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              /* Position grid */
              <div className="space-y-4">
                {images.map((image) => (
                  <div
                    key={image.position}
                    className="flex items-center gap-4 p-4 border rounded-xl bg-white"
                  >
                    {/* Preview */}
                    <div className="w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                      {image.isEmpty ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      ) : (
                        <img
                          src={`${API_BASE}${image.imageUrl}`}
                          alt={image.altText}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">Position #{image.position}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {image.isEmpty ? 'Not uploaded yet' : image.altText}
                      </p>
                      {!image.isEmpty && (
                        <p className="text-xs text-gray-400">
                          {image.filename} &middot; {formatFileSize(image.fileSize)}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleEditClick(image)}
                        className="px-3 py-1.5 bg-[#207dff] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        {image.isEmpty ? 'Upload' : 'Edit'}
                      </button>
                      {!image.isEmpty && (
                        <button
                          onClick={() => handleDeleteClick(image)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-white rounded-lg border p-3">
                    <p className="text-xs text-gray-500">Uploaded</p>
                    <p className="text-lg font-bold text-gray-900">
                      {images.filter((img) => !img.isEmpty).length} / 3
                    </p>
                  </div>
                  <div className="bg-white rounded-lg border p-3">
                    <p className="text-xs text-gray-500">Pending</p>
                    <p className="text-lg font-bold text-gray-900">
                      {images.filter((img) => img.isEmpty).length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg border p-3">
                    <p className="text-xs text-gray-500">Total Size</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatFileSize(
                        images.filter((img) => !img.isEmpty).reduce((sum, img) => sum + (img.fileSize || 0), 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer (only when not editing an image position) */}
        {!editingPosition && (
          <div className="flex justify-end px-6 py-4 border-t shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={deleteDialog.open}
        title="Delete Hero Image"
        message={`Are you sure you want to delete the hero image at position ${deleteDialog.image?.position}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ open: false, image: null })}
      />
    </div>
  );
};

export default HeroSectionModal;
