// components/SmartImage.js
import React from 'react';

const SmartImage = ({ src, alt, type = 'place', index = 0, className }) => {
  const placeholders = {
    hotel: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1501117716987-c8e1ecb2100b',
      'https://images.unsplash.com/photo-1560067174-89418b21f43c',
      'https://images.unsplash.com/photo-1600047509843-cb8b0aa93f4c',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      'https://images.unsplash.com/photo-1578898886845-c165fee1e8f5',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6',
      'https://images.unsplash.com/photo-1573164574572-cb89e39749b4',
      'https://images.unsplash.com/photo-1550583724-b269b4b90e9c',
      'https://images.unsplash.com/photo-1553514029-1318c9127859',
      'https://images.unsplash.com/photo-1576675783077-c1c247f96b99',
    ],
    place: [
      'https://images.unsplash.com/photo-1500835556837-99ac94a94552',
      'https://images.unsplash.com/photo-1470004914212-05527e49370b',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1533674689013-5f8e6f82f4cc',
      'https://images.unsplash.com/photo-1559128011-4c41c2e3d82c',
      'https://images.unsplash.com/photo-1579932999649-5d1816f980d0',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      'https://images.unsplash.com/photo-1572276596234-4ca9be7e06e3',
      'https://images.unsplash.com/photo-1570081441958-7c4c398003b4',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17',
      'https://images.unsplash.com/photo-1538391549348-98c5d24f579d',
      'https://images.unsplash.com/photo-1556784303-342f707b36f4',

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