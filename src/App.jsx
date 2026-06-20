import React, { useState, useEffect } from 'react';
import FilmCard from './components/FilmCard.jsx';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import image1 from './assets/avengers_poster.webp';
import image2 from './assets/nowyouseeme_poster.webp';
import image3 from './assets/titanic_poster.webp';
import image4 from './assets/twilight_poster.jpg';
import { Routes, Route, Link, useParams, useSearchParams } from 'react-router-dom';

const allFilmsData = [
  {
    id: uuidv4(),
    title: 'Титаник',
    year: 1997,
    genre: 'Драма',
    likesCount: 30,
    dislikesCount: 12,
    liked: false,
    disliked: false,
    image: image3,
  },
  {
    id: uuidv4(),
    title: 'Сумерки',
    year: 2008,
    genre: 'Мелодрама',
    likesCount: 42,
    dislikesCount: 31,
    liked: false,
    disliked: false,
    image: image4,
  },
  {
    id: uuidv4(),
    title: 'Иллюзия обмана',
    year: 2013,
    genre: 'Триллер',
    likesCount: 49,
    dislikesCount: 15,
    liked: false,
    disliked: false,
    image: image2,
  },
  {
    id: uuidv4(),
    title: 'Мстители',
    year: 2012,
    genre: 'Боевик',
    likesCount: 52,
    dislikesCount: 36,
    liked: false,
    disliked: false,
    image: image1,
  },
];

function App() {
  const [allFilms, setAllFilms] = useState([]);
  const [films, setFilms] = useState([]);
  const [viewedFilms, setViewedFilms] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [liked, setLiked] = useState([]);
  const [disLiked, setDisLiked] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setAllFilms(allFilmsData);
    setFilms(allFilmsData);
  }, []);

  useEffect(() => {
    setViewCount(viewedFilms.length);
  }, [viewedFilms]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const genre = searchParams.get('genre') || '';
    const date_from = searchParams.get('date_from') || '';
    const date_to = searchParams.get('date_to') || '';

    let filtered = [...allFilms];

    if (search) {
      filtered = filtered.filter(f => f.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (genre) {
      filtered = filtered.filter(f => f.genre === genre);
    }
    if (date_from) {
      filtered = filtered.filter(f => f.year >= parseInt(date_from));
    }
    if (date_to) {
      filtered = filtered.filter(f => f.year <= parseInt(date_to));
    }

    setFilms(filtered);
  }, [searchParams, allFilms]);

  const handleLike = (id) => {
    setFilms(prev => prev.map(f => {
      if (f.id === id) {
        if (f.liked) {
          return {...f, liked: false, likesCount: f.likesCount - 1};
        } else {
            let newLikesCount = f.likesCount + 1;
            let newDislikesCount = f.dislikesCount;
            if (f.disliked) {
              newDislikesCount = f.dislikesCount - 1;
            }
            return {...f,liked: true, disliked: false, likesCount: newLikesCount, dislikesCount: newDislikesCount};
          }
      }
      return f;
    }));

    setLiked(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setDisLiked(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return prev.filter(item => item !== id);
      }
    });
  };

  const handleDislike = (id) => {
    setFilms(prev => prev.map(f => {
      if (f.id === id) {
        if (f.disliked) {
          return {...f, disliked: false, dislikesCount: f.dislikesCount - 1};
        } else {
            let newDislikesCount = f.dislikesCount + 1;
            let newLikesCount = f.likesCount;
            if (f.liked) {
              newLikesCount = f.likesCount - 1;
            }
            return {...f, disliked: true, liked: false, dislikesCount: newDislikesCount, likesCount: newLikesCount};
          }
      }
      return f;
    }));
    
    setDisLiked(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });

    setLiked(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return prev.filter(item => item !== id);
      }
    });
  };

  const likedFilms = films.filter(f => f.liked);
  const dislikedFilms = films.filter(f => f.disliked);

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
                onChange={handleSearchChange}/>
              <select 
                value={searchParams.get('genre') || ''}
                onChange={handleGenreChange}>
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
            <div className="viewCounter">
              Просмотрено: {viewCount}
            </div>
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
                      handleLike={() => handleLike(film.id)}
                      handleDislike={() => handleDislike(film.id)}
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
                  <h3 style={{ color:'#3ca300' }}>Мне понравилось ({likedFilms.length})</h3>
                  {likedFilms.map((f) => (
                    <div key={f.id}>{f.title}</div>
                  ))}
                </div>
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ color:'#a10000' }}>Мне не понравилось ({dislikedFilms.length})</h3>
                  {dislikedFilms.map((f) => (
                    <div key={f.id}>{f.title}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }/>
      <Route path="/film/:id" element={<FilmPage allFilms={allFilms} />} />
    </Routes>
  );
}

function FilmPage({ allFilms }) {
  const { id } = useParams();
  const film = allFilms.find(f => f.id === id);

  return (
    <div style={{ padding: '20px' }}>
      <h1>{film.title}</h1>
      {film.image && (
        <img src={film.image} alt={film.title} style={{ maxWidth: '300px', borderRadius: '7px' }} />
      )}
      <p>Год выпуска: {film.year}</p>
      <p>Жанр: {film.genre}</p>
    </div>
  );
}

export default App;