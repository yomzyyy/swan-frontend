const TextAreaField = ({ field, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <textarea
        value={value || ''}
        onChange={e => onChange(field.key, e.target.value)}
        rows={field.rows || 4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
        placeholder={field.placeholder || ''}
      />
    </div>
  );
};

export default TextAreaField;
