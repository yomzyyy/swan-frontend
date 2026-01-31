const AdminCard = ({ title, value, icon, color = 'blue', link }) => {
  const colorClasses = {
    blue: 'bg-blue-600 border-blue-500 border-l-blue-800',
    green: 'bg-emerald-600 border-emerald-500 border-l-emerald-800',
    purple: 'bg-purple-600 border-purple-500 border-l-purple-800',
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
