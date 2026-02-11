import { useState, useEffect, useRef, type ChangeEvent, type FormEvent, type DragEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CloudUpload from '@mui/icons-material/CloudUpload';
import Link from '@mui/icons-material/Link';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import BrokenImage from '@mui/icons-material/BrokenImage';
import Close from '@mui/icons-material/Close';
import { fleetService } from '../../../services/adminCrudService';
import { uploadFleetImage, validateImageFile, formatFileSize } from '../../../services/imageService';
import { resolveImageUrl } from '../../../utils';
import type { VesselType } from '../../../types';

interface VesselFormData {
  name: string;
  type: VesselType;
  capacity: string;
  year: number;
  flag: string;
  tradeArea: string;
  yard: string;
  image: string;
}

function FleetFormAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<VesselFormData>({
    name: '',
    type: 'LPG Tanker',
    capacity: '',
    year: new Date().getFullYear(),
    flag: '',
    tradeArea: '',
    yard: '',
    image: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image upload state
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageError(false);
  }, [formData.image]);

  useEffect(() => {
    const fetchVessel = async () => {
      if (isEditMode) {
        try {
          const vessel = await fleetService.getById(id as string);
          if (vessel) {
            const v = vessel as unknown as VesselFormData;
            setFormData({
              name: v.name,
              type: v.type,
              capacity: v.capacity,
              year: v.year,
              flag: v.flag,
              tradeArea: v.tradeArea,
              yard: v.yard,
              image: v.image,
            });
            setImageMode(v.image && !v.image.startsWith('/api/') ? 'url' : 'upload');
          } else {
            setError('Vessel not found');
          }
        } catch (err) {
          setError('Failed to load vessel');
          console.error(err);
        }
      }
    };
    fetchVessel();
  }, [id, isEditMode]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Image upload handlers
  const handleImageFile = async (file: File) => {
    setUploadError('');
    setUploadSuccess('');

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }

    setIsUploading(true);

    const result = await uploadFleetImage(file);

    if (result.success && result.imageUrl) {
      setFormData(prev => ({ ...prev, image: result.imageUrl as string }));
      setUploadSuccess(`Uploaded ${file.name} (${formatFileSize(file.size)})`);
    } else {
      setUploadError(result.error || 'Upload failed');
    }

    setIsUploading(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleBrowse = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleClearImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setUploadSuccess('');
    setUploadError('');
    setImageError(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = isEditMode
        ? await fleetService.update(id as string, formData)
        : await fleetService.create(formData);

      if (result.success) {
        navigate('/admin/fleet');
      } else {
        setError(result.error || 'Failed to save vessel');
      }
    } catch (err) {
      setError('An error occurred while saving');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>

      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-2">
          <button
            onClick={() => navigate('/admin/fleet')}
            className="text-gray-600 hover:text-gray-900"
          >
            &larr; Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Vessel' : 'Add New Vessel'}
          </h1>
        </div>
        <p className="text-gray-600">
          {isEditMode ? 'Update vessel details' : 'Fill in the details for your new vessel'}
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
              Vessel Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="Enter vessel name"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
            >
              <option value="LPG Tanker">LPG Tanker</option>
              <option value="Fully Pressurized">Fully Pressurized</option>
              <option value="Semi-Refrigerated">Semi-Refrigerated</option>
              <option value="Refrigerated">Refrigerated</option>
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="e.g., 5,000 CBM"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year Built <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flag <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="e.g., Panama"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trade Area <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tradeArea"
              value={formData.tradeArea}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="e.g., Worldwide"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipyard <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="yard"
              value={formData.yard}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="e.g., Hyundai Heavy Industries"
            />
          </div>


          {/* Image Upload / URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vessel Image <span className="text-red-500">*</span>
            </label>

            {/* Mode Tabs */}
            <div className="flex mb-2">
              <button
                type="button"
                onClick={() => setImageMode('upload')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-l-lg border transition-colors ${
                  imageMode === 'upload'
                    ? 'bg-[#207dff] text-white border-[#207dff]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CloudUpload sx={{ fontSize: 14 }} /> Upload
              </button>
              <button
                type="button"
                onClick={() => setImageMode('url')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-r-lg border-t border-r border-b transition-colors ${
                  imageMode === 'url'
                    ? 'bg-[#207dff] text-white border-[#207dff]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Link sx={{ fontSize: 14 }} /> URL
              </button>
            </div>

            {/* Upload Mode */}
            {imageMode === 'upload' && (
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
            {imageMode === 'url' && (
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
                placeholder="https://example.com/vessel-image.jpg"
              />
            )}

            {/* Upload Error */}
            {uploadError && (
              <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
                <ErrorIcon sx={{ fontSize: 16 }} /> {uploadError}
              </div>
            )}

            {/* Image Preview */}
            {formData.image && (
              <div className="mt-2 relative inline-block">
                {imageError ? (
                  <div className="h-20 w-20 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1">
                    <BrokenImage sx={{ fontSize: 24 }} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400 text-center leading-tight">Image failed<br />to load</span>
                  </div>
                ) : (
                  <img
                    src={resolveImageUrl(formData.image)}
                    alt="Vessel preview"
                    className="h-20 w-20 object-cover rounded-lg border border-gray-200"
                    onError={() => setImageError(true)}
                  />
                )}

                {/* Source badge */}
                <span className={`absolute bottom-1 left-1 text-[9px] font-medium px-1 py-0.5 rounded ${
                  formData.image.startsWith('/api/')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {formData.image.startsWith('/api/') ? 'Uploaded' : 'External URL'}
                </span>

                {/* Clear button */}
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  title="Remove image"
                >
                  <Close sx={{ fontSize: 12 }} />
                </button>
              </div>
            )}
          </div>
        </div>


        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/fleet')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Vessel' : 'Add Vessel'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FleetFormAdmin;
