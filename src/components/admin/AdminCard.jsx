const AdminCard = ({ title, value, icon, color = 'blue', link }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  const CardContent = () => (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
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
