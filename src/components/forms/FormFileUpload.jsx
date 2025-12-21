
const FormFileUpload = ({
  label,
  name,
  onChange,
  error,
  required = false,
  accept = '.pdf,.doc,.docx',
  file = null
}) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onChange({
      target: {
        name: name,
        value: selectedFile
      }
    });
  };

  return (
    <div className="mb-6">
      
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      
      <div className={`
        border-2 border-dashed rounded-2xl p-6 transition-colors duration-300
        ${error ? 'border-red-500' : 'border-gray-300 hover:border-[#207dff]'}
      `}>
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />

        <label
          htmlFor={name}
          className="flex flex-col items-center cursor-pointer"
        >
          
          <svg
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          
          {file ? (
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-xs text-[#207dff] mt-2">Click to change file</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF or DOC (max 5MB)
              </p>
            </div>
          )}
        </label>
      </div>

      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormFileUpload;
