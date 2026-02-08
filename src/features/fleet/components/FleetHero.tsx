const FleetHero = () => (
  <div
    className="relative h-80 md:h-96 bg-cover bg-center"
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920)',
    }}
  >
    <div className="absolute inset-0 bg-navy-900/70"></div>
    <div className="relative h-full flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
        Our Fleet
      </h1>
    </div>
  </div>
);

export default FleetHero;
