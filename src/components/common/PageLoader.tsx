const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: '#003366', borderTopColor: 'transparent' }}
        />
        <p className="text-sm text-gray-500" style={{ fontFamily: 'Lato, sans-serif' }}>
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
