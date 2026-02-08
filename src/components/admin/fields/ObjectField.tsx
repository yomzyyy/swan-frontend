import type { FieldRendererProps } from './types';

function ObjectField({ field, value, onChange, renderField }: FieldRendererProps) {
  const objData = (value as Record<string, unknown>) || {};

  return (
    <div className="mb-4 border border-gray-200 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-gray-800 mb-3">{field.label}</h4>
      {field.fields?.map(subField =>
        renderField!(subField, objData, (childKey: string, childValue: unknown) => {
          onChange(field.key, { ...objData, [childKey]: childValue });
        })
      )}
    </div>
  );
}

export default ObjectField;
