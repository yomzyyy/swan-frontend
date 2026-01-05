
const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  rows = 5,
  disabled = false
}) => {
  return (
    <div className="mb-6">
      
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full px-6 py-3 border-2 transition-colors duration-300
          focus:outline-none placeholder-gray-400 resize-none text-gray-900
          ${error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-navy-700'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      />

      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormTextarea;
