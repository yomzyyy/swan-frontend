/**
 * FormInput Component
 *
 * Reusable input field with label, error handling, and consistent styling
 */

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  disabled = false
}) => {
  return (
    <div className="mb-6">
      {/* Label */}
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input Field */}
      <input
        type={type}
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-6 py-3 rounded-2xl border-2 transition-colors duration-300
          focus:outline-none placeholder-gray-400
          ${error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-200 focus:border-[#207dff]'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      />

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
