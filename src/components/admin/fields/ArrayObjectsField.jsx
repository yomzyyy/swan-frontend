import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

const ArrayObjectsField = ({ field, value, onChange, renderField }) => {
  const items = value || [];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
      </label>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase">
                {field.itemLabel || 'Item'} {i + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(field.key, items.filter((_, idx) => idx !== i))}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Delete sx={{ fontSize: 16 }} />
              </button>
            </div>
            {field.fields.map(subField =>
              renderField(subField, item, (childKey, childValue) => {
                const newArr = [...items];
                newArr[i] = { ...newArr[i], [childKey]: childValue };
                onChange(field.key, newArr);
              })
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          const template = {};
          field.fields.forEach(f => { template[f.key] = ''; });
          onChange(field.key, [...items, template]);
        }}
        className="mt-2 flex items-center gap-1 text-sm text-[#207dff] hover:underline"
      >
        <Add sx={{ fontSize: 16 }} /> Add {field.itemLabel || 'Item'}
      </button>
    </div>
  );
};

export default ArrayObjectsField;
