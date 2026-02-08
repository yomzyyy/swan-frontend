import { useState, useEffect, type ReactNode } from 'react';
import Close from '@mui/icons-material/Close';
import { FIELD_RENDERERS } from './fields';
import type { FieldDefinition, FieldChangeHandler } from './fields';

interface TabDefinition {
  key: string;
  label: string;
  fields: FieldDefinition[];
}

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields?: FieldDefinition[];
  tabs?: TabDefinition[];
  data: Record<string, unknown>;
  onSave: (formData: Record<string, unknown>) => void;
  isSaving: boolean;
}

function EditSectionModal({ isOpen, onClose, title, fields, tabs, data, onSave, isSaving }: EditSectionModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (isOpen && data) {
      setFormData(JSON.parse(JSON.stringify(data)));
      if (tabs?.length) {
        setActiveTab(tabs[0].key);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
  };

  const handleTopLevelChange: FieldChangeHandler = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleTabLevelChange: FieldChangeHandler = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [activeTab]: { ...((prev[activeTab] as Record<string, unknown>) || {}), [key]: value }
    }));
  };

  const renderField = (field: FieldDefinition, fieldData: Record<string, unknown>, onChange: FieldChangeHandler): ReactNode => {
    const Component = FIELD_RENDERERS[field.type];
    if (!Component) return null;

    return (
      <Component
        key={field.key}
        field={field}
        value={fieldData?.[field.key]}
        onChange={onChange}
        renderField={renderField}
      />
    );
  };

  const currentFields = tabs
    ? (tabs.find(t => t.key === activeTab)?.fields || [])
    : (fields || []);
  const currentData = tabs ? ((formData[activeTab] as Record<string, unknown>) || {}) : formData;
  const currentOnChange = tabs ? handleTabLevelChange : handleTopLevelChange;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Close />
          </button>
        </div>

        {/* Tabs */}
        {tabs && (
          <div className="flex space-x-1 px-6 pt-4 shrink-0">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-[#207dff] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {currentFields.map(field => renderField(field, currentData, currentOnChange))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSectionModal;
