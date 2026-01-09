const AdminCard = ({ title, value, icon, color = 'navy', link }) => {
  const colorClasses = {
    navy: 'bg-navy-800 border-navy-700 border-l-blue-600',
    grey: 'bg-grey-800 border-grey-700 border-l-blue-600',
    blue: 'bg-blue-600 border-blue-500 border-l-navy-800',
  };

  const CardContent = () => (
    <div className={`${colorClasses[color]} p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-5xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
};

export default AdminCard;
