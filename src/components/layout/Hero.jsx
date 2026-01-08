import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Shield } from '@mui/icons-material';
import SkeletonHero from '../skeletons/SkeletonHero';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    {
      url: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80',
      altText: 'Maritime vessel at sea'
    },
    {
      url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80',
      altText: 'LPG tanker ship'
    },
    {
      url: 'https://images.unsplash.com/photo-1605745341075-1b0c3401c2d7?w=1920&q=80',
      altText: 'Shipping operations'
    }
  ];

  useEffect(() => {
    loadHeroImages();
  }, []);

  const loadHeroImages = async () => {
    try {
      const response = await api.hero.getAll();
      const heroImages = response.data.data;

      if (heroImages && heroImages.length > 0) {
        const sortedImages = heroImages
          .sort((a, b) => a.position - b.position)
          .map((img) => ({
            url: `${
              import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1'
            }${img.imageUrl}`,
            altText: img.altText
          }));

        setImages(sortedImages);
      } else {
        setImages(fallbackImages);
      }
    } catch (error) {
      console.error('Failed to load hero images, using fallback:', error);
      setImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return <SkeletonHero />;
  }

  return (
    <section className="min-h-screen relative flex items-center pt-24 pb-16 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${image.url}')`,
          }}
          role="img"
          aria-label={image.altText}
        />
      ))}

      <div className="absolute inset-0 bg-navy-900/85 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              SAFE MARITIME
              <br />
              <span className="text-blue-400">
                LPG TRANSPORT
              </span>
              <br />
              SOLUTIONS
            </h1>

            <p className="text-lg leading-relaxed mb-8 opacity-95 max-w-lg">
              Backed by decades of experience, Swan Shipping Corporation provides end-to-end ship management services—delivering safe, efficient, and well-coordinated maritime operations for clients around the world.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 transition-all duration-300 ${
              index === currentSlide
                ? 'bg-gold-500 w-8'
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
