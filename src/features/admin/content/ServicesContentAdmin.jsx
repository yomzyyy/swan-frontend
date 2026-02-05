import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Edit from '@mui/icons-material/Edit';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { getServicesContent, saveServicesContent } from './contentAdminService';
import { servicesDefaults } from '../../../constants/servicesDefaults';
import { deepMerge } from '../../../utils';
import { EditSectionModal } from '../../../components/admin';

const SECTIONS = [
  {
    key: 'hero',
    title: 'Hero Section',
    description: 'Background image for the hero banner',
    fields: [
      { key: 'backgroundImage', label: 'Background Image', type: 'image' }
    ]
  },
  {
    key: 'services',
    title: 'Service Cards',
    description: 'Section title and service card items',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      {
        key: 'items', label: 'Services', type: 'array-objects', itemLabel: 'Service',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Image', type: 'image' },
          { key: 'category', label: 'Category', type: 'text' }
        ]
      }
    ]
  }
];

const ServicesContentAdmin = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const data = await getServicesContent();
    setContent(data);
    setLoading(false);
  };

  const getMergedContent = () => {
    return deepMerge(servicesDefaults, content);
  };

  const getModalData = () => {
    if (!editingSection) return {};
    const merged = getMergedContent();
    return merged[editingSection.key] || {};
  };

  const handleEdit = (section) => {
    setEditingSection(section);
  };

  const handleSave = async (editedData) => {
    setIsSaving(true);

    const dataToSave = { [editingSection.key]: editedData };
    const result = await saveServicesContent(dataToSave);

    if (result.success) {
      await loadContent();
      toast.success(`${editingSection.title} updated successfully!`);
      setEditingSection(null);
    } else {
      toast.error(result.error || 'Failed to save');
    }

    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading content...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Page Content</h1>
          <p className="text-gray-600 mt-1">Manage all sections of the Services page</p>
        </div>
        <a
          href="/services"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#207dff] hover:underline"
        >
          View Page <OpenInNew sx={{ fontSize: 16 }} />
        </a>
      </div>

      {/* Section Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {SECTIONS.map(section => (
          <div
            key={section.key}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{section.description}</p>
            </div>
            <button
              onClick={() => handleEdit(section)}
              className="flex items-center gap-1 px-4 py-2 bg-[#207dff] text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shrink-0 ml-4"
            >
              <Edit sx={{ fontSize: 16 }} /> Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingSection && (
        <EditSectionModal
          isOpen={!!editingSection}
          onClose={() => setEditingSection(null)}
          title={`Edit ${editingSection.title}`}
          fields={editingSection.fields}
          data={getModalData()}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default ServicesContentAdmin;
