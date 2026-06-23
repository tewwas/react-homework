import React, { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { allFilmsData } from './data/data.js';
import { handleLike, handleDislike, filterFilms } from './utils/utils.js';
import FilmCard from './components/FilmCard.jsx';
import './App.css';
import classNames from 'classnames';

function App() {
  const [allFilms, setAllFilms] = useState([]);
  const [films, setFilms] = useState([]);
  const [viewedFilms, setViewedFilms] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setAllFilms(allFilmsData);
    setFilms(allFilmsData);
  }, []);

  useEffect(() => {
    setViewCount(viewedFilms.length);
  }, [viewedFilms]);

  useEffect(() => {
    const filtered = filterFilms(allFilms, searchParams);
    setFilms(filtered);
  }, [searchParams, allFilms]);

  const addToViewed = (id) => {
    const film = allFilms.find(f => f.id === id);
    if (film && !viewedFilms.some(f => f.id === id)) {
      setViewedFilms(prev => [...prev, film]);
    }
  };

  const handleLikeClick = (id) => {
    setFilms(prevFilms => handleLike(prevFilms, id));
    setLiked(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setDisliked(prev => prev.filter(item => item !== id));
  };

  const handleDislikeClick = (id) => {
    setFilms(prevFilms => handleDislike(prevFilms, id));
    setDisliked(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setLiked(prev => prev.filter(item => item !== id));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      return params;
    });
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set('genre', value);
      } else {
        params.delete('genre');
      }
      return params;
    });
  };

  const handleDateFromChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set('date_from', value);
      } else {
        params.delete('date_from');
      }
      return params;
    });
  };

  const handleDateToChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set('date_to', value);
      } else {
        params.delete('date_to');
      }
      return params;
    });
  };

  const likedFilms = films.filter(f => f.liked);
  const dislikedFilms = films.filter(f => f.disliked);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="container">
            <div className="filters">
              <input
                type="text"
                placeholder="Название"
                value={searchParams.get('search') || ''}
                onChange={handleSearchChange}
              />
              <select value={searchParams.get('genre') || ''} onChange={handleGenreChange}>
                <option value="">Все жанры</option>
                <option value="Драма">Драма</option>
                <option value="Мелодрама">Мелодрама</option>
                <option value="Триллер">Триллер</option>
                <option value="Боевик">Боевик</option>
              </select>
              <input
                type="number"
                placeholder="Год от"
                value={searchParams.get('date_from') || ''}
                onChange={handleDateFromChange}
              />
              <input
                type="number"
                placeholder="Год до"
                value={searchParams.get('date_to') || ''}
                onChange={handleDateToChange}
              />
            </div>
            <div className="viewCounter">Просмотрено: {viewCount}</div>
            <div className="mainContent">
              <div className="filmList">
                <h2>Каталог фильмов</h2>
                {films.map((film) => (
                  <div key={film.id} onClick={() => addToViewed(film.id)}>
                    <FilmCard
                      title={film.title}
                      date={film.year}
                      genre={film.genre}
                      likes={film.likesCount}
                      dislikes={film.dislikesCount}
                      handleLike={() => handleLikeClick(film.id)}
                      handleDislike={() => handleDislikeClick(film.id)}
                      isLiked={film.liked}
                      isDisliked={film.disliked}
                      image={film.image}
                      className={classNames('film-card', { liked: film.liked, disliked: film.disliked })}
                      link={`/film/${film.id}`}
                    />
                  </div>
                ))}
              </div>
              <div className="likeDisliked">
                <div>
                  <h3 style={{ color: '#3ca300' }}>Мне понравилось ({likedFilms.length})</h3>
                  {likedFilms.map((f) => (
                    <div key={f.id}>{f.title}</div>
                  ))}
                </div>
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ color: '#a10000' }}>Мне не понравилось ({dislikedFilms.length})</h3>
                  {dislikedFilms.map((f) => (
                    <div key={f.id}>{f.title}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route path="/film/:id" element={<FilmPage allFilms={allFilms} />} />
    </Routes>
  );
}

function FilmPage({ allFilms }) {
  const { id } = useParams();
  const film = allFilms.find((f) => f.id === id);

  if (!film) {
    return <div>Фильм не найден</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{film.title}</h1>
      {film.image && (
        <img
          src={film.image}
          alt={film.title}
          style={{ maxWidth: '300px', borderRadius: '7px' }}
        />
      )}
      <p>Год выпуска: {film.year}</p>
      <p>Жанр: {film.genre}</p>
    </div>
  );
}

export default App;