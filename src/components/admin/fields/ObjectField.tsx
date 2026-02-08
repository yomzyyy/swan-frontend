const ObjectField = ({ field, value, onChange, renderField }) => {
  const objData = value || {};

  return (
    <div className="mb-4 border border-gray-200 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-gray-800 mb-3">{field.label}</h4>
      {field.fields.map(subField =>
        renderField(subField, objData, (childKey, childValue) => {
          onChange(field.key, { ...objData, [childKey]: childValue });
        })
      )}
    </div>
  );
};

export default ObjectField;
