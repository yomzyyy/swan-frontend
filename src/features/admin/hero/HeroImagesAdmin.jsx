import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllHeroImages, deleteHeroImage, formatFileSize } from './heroAdminService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';

const HeroImagesAdmin = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, image: null });
  const navigate = useNavigate();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const allImages = await getAllHeroImages();

      const imagesByPosition = [1, 2, 3].map((position) => {
        const existing = allImages.find((img) => img.position === position);

        if (existing) {
          return { ...existing, isEmpty: false };
        } else {
          return {
            position,
            isEmpty: true,
            altText: 'Not uploaded yet',
            filename: 'No image'
          };
        }
      });

      setImages(imagesByPosition);
    } catch (error) {
      console.error('Failed to load hero images:', error);
      setImages([
        { position: 1, isEmpty: true, altText: 'Error loading', filename: 'Error' },
        { position: 2, isEmpty: true, altText: 'Error loading', filename: 'Error' },
        { position: 3, isEmpty: true, altText: 'Error loading', filename: 'Error' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image) => {
    navigate(`/admin/hero/edit/${image.position}`);
  };

  const handleDeleteClick = (image) => {
    if (image.isEmpty) {
      alert('Cannot delete empty position. Please upload an image first.');
      return;
    }
    setDeleteDialog({ open: true, image });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.image) return;

    try {
      const result = await deleteHeroImage(deleteDialog.image.position);

      if (result.success) {
        await loadImages();
        setDeleteDialog({ open: false, image: null });
        alert('Hero image deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting hero image:', error);
      alert('An error occurred while deleting the image');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, image: null });
  };

  const columns = [
    {
      header: 'Position',
      accessor: 'position',
      render: (image) => (
        <span className="text-lg font-bold text-blue-600">#{image.position}</span>
      )
    },
    {
      header: 'Preview',
      accessor: 'imageUrl',
      render: (image) =>
        image.isEmpty ? (
          <div className="w-32 h-20 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-500 text-xs">No Image</span>
          </div>
        ) : (
          <img
            src={`${
              import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1'
            }${image.imageUrl}`}
            alt={image.altText}
            className="w-32 h-20 object-cover rounded shadow-sm"
          />
        )
    },
    {
      header: 'Alt Text',
      accessor: 'altText',
      render: (image) => (
        <span className={image.isEmpty ? 'text-gray-400 italic' : 'text-sm text-gray-700'}>
          {image.altText}
        </span>
      )
    },
    {
      header: 'File Info',
      accessor: 'filename',
      render: (image) =>
        image.isEmpty ? (
          <span className="text-xs text-gray-500">-</span>
        ) : (
          <div className="text-xs">
            <p className="text-gray-700 truncate max-w-xs" title={image.filename}>
              {image.filename}
            </p>
            <p className="text-gray-500">{formatFileSize(image.fileSize)}</p>
            <p className="text-gray-400">{image.mimeType}</p>
          </div>
        )
    },
    {
      header: 'Last Updated',
      accessor: 'updatedAt',
      render: (image) =>
        image.isEmpty ? (
          <span className="text-xs text-gray-500">Never</span>
        ) : (
          <span className="text-xs text-gray-600">
            {new Date(image.uploadedAt || image.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        )
    }
  ];

  return (
    <div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hero Images</h1>
        <p className="text-gray-600 mt-1">
          Manage the 3 hero carousel images displayed on the homepage
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-4">Loading hero images...</p>
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={images}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          emptyMessage="Unable to load hero images"
        />
      )}

      
      <ConfirmDialog
        isOpen={deleteDialog.open}
        title="Delete Hero Image"
        message={`Are you sure you want to delete the hero image at position ${deleteDialog.image?.position}? This will remove the image from the carousel and delete the file from the server. This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Uploaded Images</p>
          <p className="text-2xl font-bold text-gray-900">
            {images.filter((img) => !img.isEmpty).length} / 3
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Pending Uploads</p>
          <p className="text-2xl font-bold text-gray-900">
            {images.filter((img) => img.isEmpty).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total File Size</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatFileSize(
              images
                .filter((img) => !img.isEmpty)
                .reduce((sum, img) => sum + (img.fileSize || 0), 0)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroImagesAdmin;
