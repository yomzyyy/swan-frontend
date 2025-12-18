import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { getAllJobs, deleteJob } from './careersAdminService';

const CareersListAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const allJobs = getAllJobs();
    setJobs(allJobs);
  };

  const handleEdit = (job) => {
    navigate(`/admin/careers/edit/${job.id}`);
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (jobToDelete) {
      const result = deleteJob(jobToDelete.id);
      if (result.success) {
        loadJobs();
        setDeleteConfirmOpen(false);
        setJobToDelete(null);
      } else {
        alert('Failed to delete job: ' + result.error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setJobToDelete(null);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      render: (job) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{job.title}</p>
          <p className="text-xs text-gray-500">{job.department}</p>
        </div>
      ),
    },
    {
      header: 'Location',
      accessor: 'location',
      render: (job) => (
        <span className="text-sm text-gray-600">{job.location}</span>
      ),
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (job) => (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          {job.type}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600 mt-1">Manage career opportunities</p>
        </div>
        <button
          onClick={() => navigate('/admin/careers/create')}
          className="bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
        >
          + Post Job
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredJobs}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        emptyMessage="No job postings found. Create your first posting!"
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Job Posting"
        message={`Are you sure you want to delete "${jobToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default CareersListAdmin;
