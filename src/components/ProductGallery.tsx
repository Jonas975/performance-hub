"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  // Sicherheits-Check: Falls keine Bilder da sind, zeige einen Platzhalter
  const displayImages = images && images.length > 0 
    ? images 
    : ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800"];

  const [mainImage, setMainImage] = useState(displayImages[0]);

  return (
    <div className="flex flex-col gap-6">
      {/* Hauptbild-Anzeige */}
      <div className="rounded-3xl overflow-hidden border border-surface-light bg-surface/30 p-4 backdrop-blur-sm shadow-2xl">
        <img 
          src={mainImage} 
          alt="Produktansicht" 
          className="w-full h-auto rounded-2xl aspect-square object-cover transition-all duration-500 hover:scale-[1.02]"
        />
      </div>

      {/* Miniaturansichten (Thumbnails) */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {displayImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              mainImage === img 
                ? "border-accent-hover scale-105 shadow-lg opacity-100" 
                : "border-surface-light opacity-50 hover:opacity-100"
            }`}
          >
            <img 
              src={img} 
              alt={`Vorschau ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}