import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { getAllVessels, deleteVessel } from './fleetAdminService';
import SkeletonTable from '../../../components/skeletons/SkeletonTable';

const FleetListAdmin = () => {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [vesselToDelete, setVesselToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadVessels();
  }, []);

  const loadVessels = async () => {
    try {
      setLoading(true);
      const allVessels = await getAllVessels();
      setVessels(allVessels);
    } catch (error) {
      console.error('Failed to load vessels:', error);
      setVessels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vessel) => {
    navigate(`/admin/fleet/edit/${vessel.id}`);
  };

  const handleDeleteClick = (vessel) => {
    setVesselToDelete(vessel);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (vesselToDelete) {
      const result = await deleteVessel(vesselToDelete.id);
      if (result.success) {
        loadVessels();
        setDeleteConfirmOpen(false);
        setVesselToDelete(null);
      } else {
        alert('Failed to delete vessel: ' + result.error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setVesselToDelete(null);
  };

  const filteredVessels = vessels.filter(vessel =>
    vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vessel.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (vessel) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{vessel.name}</p>
          <p className="text-xs text-gray-500">{vessel.type}</p>
        </div>
      ),
    },
    {
      header: 'Capacity',
      accessor: 'capacity',
      render: (vessel) => (
        <span className="text-sm text-gray-600">{vessel.capacity}</span>
      ),
    },
    {
      header: 'Year',
      accessor: 'year',
      render: (vessel) => (
        <span className="text-sm text-gray-600">{vessel.year}</span>
      ),
    },
    {
      header: 'Flag',
      accessor: 'flag',
      render: (vessel) => (
        <span className="text-sm text-gray-600">{vessel.flag}</span>
      ),
    },
    {
      header: 'Image',
      accessor: 'image',
      render: (vessel) => (
        <img
          src={vessel.image}
          alt={vessel.name}
          className="w-16 h-10 object-cover rounded"
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fleet Vessels</h1>
            <p className="text-gray-600 mt-1">Manage your fleet</p>
          </div>
          <button
            onClick={() => navigate('/admin/fleet/create')}
            className="bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            + Add Vessel
          </button>
        </div>
        <SkeletonTable columns={5} rows={6} />
      </div>
    );
  }

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Vessels</h1>
          <p className="text-gray-600 mt-1">Manage your fleet</p>
        </div>
        <button
          onClick={() => navigate('/admin/fleet/create')}
          className="bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
        >
          + Add Vessel
        </button>
      </div>


      <div className="mb-6">
        <input
          type="text"
          placeholder="Search vessels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
        />
      </div>


      <AdminTable
        columns={columns}
        data={filteredVessels}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        emptyMessage="No vessels found. Add your first vessel!"
      />

      
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Vessel"
        message={`Are you sure you want to delete "${vesselToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default FleetListAdmin;
