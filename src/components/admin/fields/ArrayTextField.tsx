import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import type { FieldRendererProps } from './types';

function ArrayTextField({ field, value, onChange }: FieldRendererProps) {
  const items = (value as string[]) || [];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
      </label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={e => {
                const newArr = [...items];
                newArr[i] = e.target.value;
                onChange(field.key, newArr);
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => onChange(field.key, items.filter((_, idx) => idx !== i))}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Delete sx={{ fontSize: 18 }} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange(field.key, [...items, ''])}
        className="mt-2 flex items-center gap-1 text-sm text-[#207dff] hover:underline"
      >
        <Add sx={{ fontSize: 16 }} /> Add {field.itemLabel || 'Item'}
      </button>
    </div>
  );
}

export default ArrayTextField;
