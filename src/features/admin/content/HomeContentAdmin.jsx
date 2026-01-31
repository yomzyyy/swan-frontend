import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Edit, OpenInNew } from '@mui/icons-material';
import { getHomeContent, saveHomeContent } from './contentAdminService';
import { homeDefaults } from '../../../constants/homeDefaults';
import { deepMerge } from '../../../utils/deepMerge';
import EditSectionModal from '../../../components/admin/EditSectionModal';
import HeroSectionModal from '../../../components/admin/HeroSectionModal';

const SECTIONS = [
  {
    key: 'hero',
    title: 'Hero Section',
    description: 'Hero banner text and carousel images',
    isCustomModal: true
  },
  {
    key: 'fleetStats',
    title: 'Fleet Stats',
    description: 'Total vessels, max capacity, avg fleet age, safety compliance',
    fields: [
      { key: 'totalVessels', label: 'Total Vessels', type: 'text' },
      { key: 'maxCapacity', label: 'Max Capacity', type: 'text' },
      { key: 'avgFleetAge', label: 'Avg Fleet Age (Year Built)', type: 'text' },
      { key: 'safetyCompliance', label: 'Safety Compliance', type: 'text' }
    ]
  },
  {
    key: 'services',
    title: 'Services',
    description: 'Badge, title, and service cards with images',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text' },
      { key: 'title', label: 'Section Title', type: 'text' },
      {
        key: 'items',
        label: 'Services',
        type: 'array-objects',
        itemLabel: 'Service',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Image URL', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' }
        ]
      }
    ]
  },
  {
    key: 'getInTouch',
    title: 'Get In Touch',
    description: 'Contact information displayed on the homepage',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { key: 'address', label: 'Address', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'phone2', label: 'Phone 2', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' }
    ]
  }
];

const HomeContentAdmin = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [heroSectionOpen, setHeroSectionOpen] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const data = await getHomeContent();
    setContent(data);
    setLoading(false);
  };

  const getMergedContent = () => {
    return deepMerge(homeDefaults, content);
  };

  const getModalData = () => {
    if (!editingSection) return {};
    const merged = getMergedContent();
    return merged[editingSection.key] || {};
  };

  const handleEdit = (section) => {
    if (section.isCustomModal) {
      setHeroSectionOpen(true);
    } else {
      setEditingSection(section);
    }
  };

  const handleSaveHeroText = async (textData) => {
    setIsSaving(true);
    const result = await saveHomeContent({ heroText: textData });
    if (result.success) {
      await loadContent();
      toast.success('Hero text updated successfully!');
    } else {
      toast.error(result.error || 'Failed to save hero text');
    }
    setIsSaving(false);
  };

  const handleSave = async (editedData) => {
    setIsSaving(true);

    const dataToSave = { [editingSection.key]: editedData };
    const result = await saveHomeContent(dataToSave);

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
          <h1 className="text-3xl font-bold text-gray-900">Home Page Content</h1>
          <p className="text-gray-600 mt-1">Manage all sections of the Home page</p>
        </div>
        <a
          href="/"
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

      {/* Edit Modal (text sections) */}
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

      {/* Hero Section Modal */}
      <HeroSectionModal
        isOpen={heroSectionOpen}
        onClose={() => setHeroSectionOpen(false)}
        contentData={getMergedContent().heroText}
        onSaveContent={handleSaveHeroText}
        isSaving={isSaving}
      />
    </div>
  );
};

export default HomeContentAdmin;
