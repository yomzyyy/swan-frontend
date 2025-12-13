import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80',
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80',
    'https://images.unsplash.com/photo-1605745341075-1b0c3401c2d7?w=1920&q=80',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="min-h-screen relative flex items-center pt-24 pb-16 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${image}')`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-[#001E3C]/80 to-[#003C78]/60 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 mb-8 text-sm">
            <span className="text-xl">🛡️</span>
            <span>Our Efficiency. Your Solution </span>
          </div>

          <h1 className="text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            SAFE MARITIME
            <br />
            <span className="bg-gradient-to-r from-[#207dff] to-[#00bfff] bg-clip-text text-transparent">
              LPG TRANSPORT
            </span>
            <br />
            SOLUTIONS
          </h1>

          <p className="text-lg leading-relaxed mb-8 opacity-95 max-w-lg">
            Backed by decades of experience, Swan Shipping Corporation provides end-to-end ship management services—delivering safe, efficient, and well-coordinated maritime operations for clients around the world.
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-white text-3xl font-bold mb-8 leading-snug">
            30+ Years of Excellence in LPG
            <br />
            Maritime Logistics
          </h3>

          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#207dff] mb-2">
                500M+
              </div>
              <div className="text-white text-sm opacity-90">
                Tons Transported
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#207dff] mb-2">
                Zero
              </div>
              <div className="text-white text-sm opacity-90">
                Incidents 2024
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#207dff] mb-2">
                24/7
              </div>
              <div className="text-white text-sm opacity-90">
                Operations
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#207dff] w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
