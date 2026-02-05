import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Edit from '@mui/icons-material/Edit';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { getAboutContent, saveAboutContent } from './contentAdminService';
import { aboutDefaults } from '../../../constants/aboutDefaults';
import { deepMerge } from '../../../utils';
import { EditSectionModal } from '../../../components/admin';

const TAB_FIELDS = [
  { key: 'badge', label: 'Badge Text', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'body', label: 'Body Text', type: 'textarea', rows: 6 },
  {
    key: 'stats', label: 'Statistics', type: 'array-objects', itemLabel: 'Stat',
    fields: [
      { key: 'number', label: 'Number', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' }
    ]
  }
];

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
    key: 'intro',
    title: 'Introduction',
    description: 'Badge, title, paragraphs, and statistics',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'paragraphs', label: 'Paragraphs', type: 'array-text', itemLabel: 'Paragraph' },
      {
        key: 'stats', label: 'Statistics', type: 'array-objects', itemLabel: 'Stat',
        fields: [
          { key: 'number', label: 'Number', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' }
        ]
      }
    ]
  },
  {
    key: 'whyChooseUs',
    title: 'Why Choose SWAN',
    description: 'Badge, title, description, bullet items, and image',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'bulletItems', label: 'Bullet Items', type: 'array-text', itemLabel: 'Item' },
      { key: 'image', label: 'Image', type: 'image' }
    ]
  },
  {
    key: 'lgpPillars',
    title: 'LPG Pillars',
    description: 'Title, image, and pillar cards (icons stay hardcoded)',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'image', label: 'Image', type: 'image' },
      {
        key: 'pillars', label: 'Pillars', type: 'array-objects', itemLabel: 'Pillar',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' }
        ]
      }
    ]
  },
  {
    key: 'missionVision',
    title: 'Mission & Vision',
    description: 'Mission and vision statements with images',
    arrayWrap: true,
    fields: [
      {
        key: 'items', label: 'Statements', type: 'array-objects', itemLabel: 'Statement',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Image', type: 'image' }
        ]
      }
    ]
  },
  {
    key: 'managementTeam',
    title: 'Management Team',
    description: 'President and team member profiles',
    fields: [
      {
        key: 'president', label: 'President', type: 'object',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'position', label: 'Position', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]
      },
      {
        key: 'members', label: 'Team Members', type: 'array-objects', itemLabel: 'Member',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'position', label: 'Position', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ]
      }
    ]
  },
  {
    key: 'clients',
    title: 'Our Clients',
    description: 'Client names and logos',
    arrayWrap: true,
    fields: [
      {
        key: 'items', label: 'Clients', type: 'array-objects', itemLabel: 'Client',
        fields: [
          { key: 'name', label: 'Client Name', type: 'text' },
          { key: 'logo', label: 'Logo', type: 'image' }
        ]
      }
    ]
  },
  {
    key: 'contentTabs',
    title: 'Content Tabs',
    description: 'Heritage, Innovation, and Sustainability tabs',
    useTabs: true,
    tabs: [
      { key: 'heritage', label: 'Heritage', fields: TAB_FIELDS },
      { key: 'innovation', label: 'Innovation', fields: TAB_FIELDS },
      { key: 'sustainability', label: 'Sustainability', fields: TAB_FIELDS }
    ]
  }
];

const AboutContentAdmin = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const data = await getAboutContent();
    setContent(data);
    setLoading(false);
  };

  const getMergedContent = () => {
    return deepMerge(aboutDefaults, content);
  };

  const getModalData = () => {
    if (!editingSection) return {};
    const merged = getMergedContent();
    const sectionData = merged[editingSection.key];

    if (editingSection.arrayWrap) {
      return { items: sectionData };
    }
    return sectionData || {};
  };

  const handleEdit = (section) => {
    setEditingSection(section);
  };

  const handleSave = async (editedData) => {
    setIsSaving(true);

    let dataToSave;
    if (editingSection.arrayWrap) {
      dataToSave = { [editingSection.key]: editedData.items };
    } else {
      dataToSave = { [editingSection.key]: editedData };
    }

    const result = await saveAboutContent(dataToSave);

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
          <h1 className="text-3xl font-bold text-gray-900">About Page Content</h1>
          <p className="text-gray-600 mt-1">Manage all sections of the About page</p>
        </div>
        <a
          href="/about"
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
          fields={editingSection.useTabs ? undefined : editingSection.fields}
          tabs={editingSection.useTabs ? editingSection.tabs : undefined}
          data={getModalData()}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default AboutContentAdmin;
