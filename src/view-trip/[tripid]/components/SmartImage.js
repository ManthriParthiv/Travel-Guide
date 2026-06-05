// components/SmartImage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SmartImage = ({ src, alt, type = 'place', index = 0, className }) => {
  const placeholders = {
    hotel: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=500&q=80'
    ],
    place: [
      'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80'
    ]
  };

  const getPlaceholder = () => {
    const list = placeholders[type] || placeholders.place;
    return `${list[index % list.length]}&sig=${index}`;
  };

  const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const lower = url.toLowerCase().trim();
    if (lower === '' || lower === 'placeholder' || lower.includes('placeholder.com') || lower.includes('example.com')) {
      return false;
    }
    return lower.startsWith('http://') || lower.startsWith('https://');
  };

  const [imgSrc, setImgSrc] = useState(getPlaceholder());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchRealPhoto = async () => {
      // 1. If the URL is already a valid specific URL, use it directly
      if (isValidUrl(src)) {
        if (active) {
          setImgSrc(src);
          setLoading(false);
        }
        return;
      }

      // 2. Otherwise, fetch a real photo from Wikipedia Open API using the name (alt text)
      const queryText = alt || '';
      if (!queryText || queryText.trim() === '' || queryText.toLowerCase().includes('image') || queryText.toLowerCase().includes('photo')) {
        if (active) {
          setImgSrc(getPlaceholder());
          setLoading(false);
        }
        return;
      }

      try {
        // Clean query to avoid ratings, brackets, or emojis
        const cleanQuery = queryText
          .split('(')[0]
          .split('-')[0]
          .replace(/[⭐🏨📍✈️👫]/g, '')
          .trim();
        
        if (cleanQuery) {
          // Step 1: Search Wikipedia for the most relevant article title
          const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&srlimit=1&format=json&origin=*`;
          const searchResponse = await axios.get(searchUrl);
          
          if (searchResponse.data && searchResponse.data.query && searchResponse.data.query.search && searchResponse.data.query.search.length > 0) {
            const pageTitle = searchResponse.data.query.search[0].title;
            
            // Step 2: Fetch the page image for that title
            const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&piprop=original&format=json&origin=*`;
            const imageResponse = await axios.get(imageUrl);
            
            if (imageResponse.data && imageResponse.data.query && imageResponse.data.query.pages) {
              const pages = imageResponse.data.query.pages;
              const pageId = Object.keys(pages)[0];
              
              if (pageId !== "-1") {
                const imageInfo = pages[pageId].original;
                if (imageInfo && imageInfo.source && active) {
                  setImgSrc(imageInfo.source);
                  setLoading(false);
                  return;
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch real photo from Wikipedia API:", error);
      }

      // 3. Fallback to placeholder if Wikipedia search yielded no images
      if (active) {
        setImgSrc(getPlaceholder());
        setLoading(false);
      }
    };

    fetchRealPhoto();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, alt]);

  const handleError = () => {
    setImgSrc(getPlaceholder());
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      style={{ opacity: loading ? 0.6 : 1, transition: 'opacity 0.3s ease' }}
    />
  );
};

export default SmartImage;