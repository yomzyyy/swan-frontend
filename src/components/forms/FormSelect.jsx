
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder = 'Select an option'
}) => {
  return (
    <div className="mb-6">
      
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-6 py-3 rounded-2xl border-2 transition-colors duration-300
          focus:outline-none
          ${error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-200 focus:border-[#207dff]'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>

      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormSelect;
