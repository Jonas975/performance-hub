// src/components/ProductGallery.tsx
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const displayImages = images && images.length > 0 
    ? images 
    : ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800"];

  const [mainImage, setMainImage] = useState(displayImages[0]);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center" });
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom-Logik: Berechnet die Position der Maus im Verhältnis zum Bild
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hauptbild mit Zoom-Effekt */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomStyle({ transformOrigin: "center" })}
        className="relative rounded-3xl overflow-hidden border border-surface-light bg-black p-2 cursor-zoom-in group shadow-2xl"
      >
        <motion.img 
          key={mainImage}
          src={mainImage} 
          alt="Produktansicht" 
          style={zoomStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-auto rounded-2xl aspect-square object-cover transition-transform duration-200 ease-out group-hover:scale-[2.5]"
        />
        
        {/* Kleiner Hinweis-Badge */}
        <div className="absolute top-6 right-6 bg-background/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Zoom Aktiv
        </div>
      </div>

      {/* Miniaturansichten (Thumbnails) */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {displayImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              mainImage === img 
                ? "border-accent-hover scale-105 shadow-lg shadow-accent/20" 
                : "border-surface-light hover:border-accent/50 opacity-60 hover:opacity-100"
            }`}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${index}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}