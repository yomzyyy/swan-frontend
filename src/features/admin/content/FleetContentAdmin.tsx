import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Edit from '@mui/icons-material/Edit';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { getFleetPageContent, saveFleetPageContent } from './contentAdminService';
import { fleetDefaults } from '../../../constants/fleetDefaults';
import { deepMerge, friendlyError } from '../../../utils';
import { EditSectionModal } from '../../../components/admin';
import type { PageContent } from '../../../types';
import type { FleetPageContent } from '../../../types';
import type { FieldDefinition } from '../../../components/admin/fields';

interface SectionConfig {
  key: string;
  title: string;
  description: string;
  fields: FieldDefinition[];
}

const SECTIONS: SectionConfig[] = [
  {
    key: 'hero',
    title: 'Hero Section',
    description: 'Background image for the hero banner',
    fields: [
      { key: 'backgroundImage', label: 'Background Image', type: 'image' }
    ]
  }
];

function FleetContentAdmin() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<SectionConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const data = await getFleetPageContent();
    setContent(data);
    setLoading(false);
  };

  const getMergedContent = (): FleetPageContent => {
    return deepMerge(fleetDefaults, content as Partial<FleetPageContent> | null);
  };

  const getModalData = (): Record<string, unknown> => {
    if (!editingSection) return {};
    const merged = getMergedContent();
    return (merged[editingSection.key as keyof FleetPageContent] as unknown as Record<string, unknown>) || {};
  };

  const handleEdit = (section: SectionConfig) => {
    setEditingSection(section);
  };

  const handleSave = async (editedData: Record<string, unknown>) => {
    setIsSaving(true);

    const dataToSave = { [editingSection!.key]: editedData };
    const result = await saveFleetPageContent(dataToSave);

    if (result.success) {
      await loadContent();
      toast.success(`${editingSection!.title} updated successfully!`);
      setEditingSection(null);
    } else {
      toast.error(friendlyError(result.error || 'Failed to save'));
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
          <h1 className="text-3xl font-bold text-gray-900">Fleet Page Content</h1>
          <p className="text-gray-600 mt-1">Manage all sections of the Fleet page</p>
        </div>
        <a
          href="/fleet"
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
}

export default FleetContentAdmin;
