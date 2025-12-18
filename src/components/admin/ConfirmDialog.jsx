const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) => {
  if (!isOpen) return null;

  const typeColors = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-orange-600 hover:bg-orange-700',
    info: 'bg-blue-600 hover:bg-blue-700',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onCancel}
        ></div>

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal Panel */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4">
            <div className="sm:flex sm:items-start">
              <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${type === 'danger' ? 'bg-red-100' : type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                <span className="text-2xl">
                  {type === 'danger' ? '⚠️' : type === 'warning' ? '⚠️' : 'ℹ️'}
                </span>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3">
            <button
              type="button"
              onClick={onConfirm}
              className={`w-full inline-flex justify-center rounded-lg px-4 py-2 text-base font-medium text-white shadow-sm ${typeColors[type]} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200`}
            >
              {confirmText}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#207dff] sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
