import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function FilmPage({ allFilms }) {
  const { id } = useParams();
  const film = allFilms.find((f) => f.id === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (film && film.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % film.images.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [film]);

  if (!film) {
    return <div>Фильм не найден</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{film.title}</h1>
      {film.images.length > 0 && (
        <img
          src={film.images[currentImageIndex]}
          alt={film.title}
          style={{ maxWidth: '300px', borderRadius: '7px' }}
        />
      )}
      <p>Год выпуска: {film.year}</p>
      <p>Жанр: {film.genre}</p>
    </div>
  );
}

export default FilmPage;