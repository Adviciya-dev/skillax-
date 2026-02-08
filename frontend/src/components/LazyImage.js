import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// LazyImage component with blur placeholder and intersection observer
export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+',
  aspectRatio,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  const aspectRatioStyle = aspectRatio ? { aspectRatio } : {};

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatioStyle}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
          style={{ backgroundSize: '200% 100%' }}
        />
      )}

      {/* Actual Image */}
      {isInView && !error && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full object-cover ${isLoaded ? '' : 'invisible'}`}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <span className="text-slate-400 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

// Optimized background image with lazy loading
export function LazyBackgroundImage({ 
  src, 
  children, 
  className = '',
  overlayClassName = 'bg-black/50',
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [isInView, src]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        backgroundImage: isLoaded ? `url(${src})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800" />
      )}
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
