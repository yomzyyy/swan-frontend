import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SkeletonHero from '../skeletons/SkeletonHero';
import { ROUTES } from '../../config/routes';
import ActionButton from '../common/ActionButton';
import type { HeroTextContent } from '../../types';

interface HeroSlide {
  url: string;
  altText: string;
}

interface HeroProps {
  heroText?: Partial<HeroTextContent>;
}

const Hero = ({ heroText = {} }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [animateContent, setAnimateContent] = useState(false);

  const fallbackImages: HeroSlide[] = [
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
      const heroImages = response.data?.data || [];

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

  useEffect(() => {
    if (!loading) {
      setAnimateContent(true);
    }
  }, [loading]);

  const goToSlide = (index: number) => {
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

      <div className="absolute inset-0 bg-black/70 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        <div className="text-white max-w-6xl mx-auto">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight uppercase transition-all duration-1000 ease-out ${animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {heroText.title || 'Safety-Driven. Technically Disciplined. Proven in Gas Operations.'}
          </h1>

          <p className={`text-sm leading-relaxed mb-8 transition-all duration-1000 delay-200 ease-out ${animateContent ? 'opacity-95 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {heroText.description || 'With over 30 years of ship management experience, SWAN Shipping Corporation provides reliable and compliant management for LPG carriers, ensuring safe cargo operations, strong vetting performance, and stable operating costs.'}
          </p>

          <div className={`transition-all duration-1000 delay-400 ease-out ${animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ActionButton to={ROUTES.SERVICES}>
              {heroText.ctaText || 'Discover Our Services'}
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
