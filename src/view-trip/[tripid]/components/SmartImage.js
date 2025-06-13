// components/SmartImage.js
import React from 'react';

const SmartImage = ({ src, alt, type = 'place', index = 0, className }) => {
  const placeholders = {
    hotel: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'
    ],
    place: [
      'https://images.unsplash.com/photo-1500835556837-99ac94a94552',
      'https://images.unsplash.com/photo-1470004914212-05527e49370b',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1500835556837-99ac94a94552',
      'https://images.unsplash.com/photo-1470004914212-05527e49370b',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    ]
  };

  const getPlaceholder = () => {
    const list = placeholders[type] || placeholders.place;
    return `${list[index % list.length]}?sig=${index}`;
  };

  const handleError = (e) => {
    e.target.src = getPlaceholder();
    e.target.onerror = null;
  };

  return (
    <img
      src={src || getPlaceholder()}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
};

export default SmartImage;