import React, { useState } from 'react';

function App() {
  const allFilms = [
    {
      id: 1,
      title: 'Титаник',
      year: 1997,
      genre: 'Драма',
      likesCount: 30,
      dislikesCount: 12,
    },
    {
      id: 2,
      title: 'Сумерки',
      year: 2008,
      genre: 'Мелодрама',
      likesCount: 42,
      dislikesCount: 31,
    },
    {
      id: 3,
      title: 'Иллюзия обмана',
      year: 2013,
      genre: 'Триллер',
      likesCount: 49,
      dislikesCount: 15,
    },
    {
      id: 4,
      title: 'Мстители',
      year: 2012,
      genre: 'Боевик',
      likesCount: 52,
      dislikesCount: 36,
    },
  ];

  const [films, setFilms] = useState(allFilms);
  const [likedIds, setLikedIds] = useState([]);
  const [dislikedIds, setDislikedIds] = useState([]);
  const [activeFilmId, setActiveFilmId] = useState(null);

  const titleStyle = { 
    color: '#2c3e50', 
    fontSize: '28px', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: '10px' 
  };
  const yearStyle = { 
    color: '#0077c7', 
    fontSize: '20px',  
    marginBottom: '8px' 
  };
  const genreStyle = { 
    color: '#65baff', 
    fontSize: '20px', 
    marginBottom: '15px' 
  };

  const containerStyle = {
    display: 'flex',
    gap: '10px'
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: '2px solid #525252',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold'
  };

  const fixedContainerStyle = {
    position: 'fixed',
    width: '6em',
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: '30px',
    bottom: '40px',
    color: '#2c3e50',
    fontWeight: 'bold', 
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    fontSize: '18px'
  };

  const likeButtonStyle = (id) => ({
    ...buttonStyle,
    backgroundColor: likedIds.includes(id) ? 'green' : '#a3a3a3'
  });

  const dislikeButtonStyle = (id) => ({
    ...buttonStyle,
    backgroundColor: dislikedIds.includes(id) ? 'red' : '#a3a3a3'
  });

  const like = (id) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter(item => item !== id));
      setFilms(prevFilms =>
        prevFilms.map(film =>
          film.id === id ? { ...film, likesCount: film.likesCount - 1 } : film
        )
      );
    } else {
      setLikedIds([...likedIds, id]);
      setFilms(prevFilms =>
        prevFilms.map(film =>
          film.id === id ? { ...film, likesCount: film.likesCount + 1 } : film
        )
      );
      if (dislikedIds.includes(id)) {
        setDislikedIds(dislikedIds.filter(item => item !== id));
        setFilms(prevFilms =>
          prevFilms.map(film =>
            film.id === id ? { ...film, dislikesCount: film.dislikesCount - 1 } : film
          )
        );
      }
    }
  };

  const dislike = (id) => {
    if (dislikedIds.includes(id)) {
      setDislikedIds(dislikedIds.filter(item => item !== id));
      setFilms(prevFilms =>
        prevFilms.map(film =>
          film.id === id ? { ...film, dislikesCount: film.dislikesCount - 1 } : film
        )
      );
    } else {
      setDislikedIds([...dislikedIds, id]);
      setFilms(prevFilms =>
        prevFilms.map(film =>
          film.id === id ? { ...film, dislikesCount: film.dislikesCount + 1 } : film
        )
      );
      if (likedIds.includes(id)) {
        setLikedIds(likedIds.filter(item => item !== id));
        setFilms(prevFilms =>
          prevFilms.map(film =>
            film.id === id ? { ...film, likesCount: film.likesCount - 1 } : film
          )
        );
      }
    }
  };

  const handleFilmClick = (id) => {
    setActiveFilmId(id);
  };

  const sortedFilms = [...films].sort(
    (a, b) => (a.likesCount + a.dislikesCount) - (b.likesCount + b.dislikesCount)
  );

  const selectedFilm = films.find(f => f.id === activeFilmId);

  return (
    <div style={{ margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Каталог фильмов</h2>
      {sortedFilms.map((film) => (
        <div
          key={film.id}
          onClick={() => handleFilmClick(film.id)}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer'
          }}
        >
          <h2 style={titleStyle}>{film.title}</h2>
          <p style={yearStyle}>Год выпуска: {film.year}</p>
          <p style={genreStyle}>Жанр: {film.genre}</p>
          <p>Нравится: {film.likesCount}</p>
          <p>Не нравится: {film.dislikesCount}</p>
          <div style={containerStyle}>
            <button
              onClick={() => like(film.id)}
              style={likeButtonStyle(film.id)}
            >
              Нравится
            </button>
            <button
              onClick={() => dislike(film.id)}
              style={dislikeButtonStyle(film.id)}
            >
              Не нравится
            </button>
          </div>
        </div>
      ))}
      
      {selectedFilm && likedIds.includes(selectedFilm.id) && (
        <div style={fixedContainerStyle}>
          {selectedFilm.title}
        </div>
      )}
    </div>
  );
}

export default App;