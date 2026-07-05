import React, { useReducer, useEffect, useRef, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { allFilmsData } from './data/data.js';
import { handleLike, handleDislike, filterFilms } from './utils/utils.js';
import FilmCard from './components/FilmCard.jsx';
import FilmPage from './components/FilmPage.jsx';
import { filmsReducer } from './reducer/reducers.js';
import { ThemeContext } from './context/ThemeContext.jsx';
import './App.css';
import classNames from 'classnames';

const PARAMS = {
  SEARCH: 'search',
  GENRE: 'genre',
  DATE_FROM: 'date_from',
  DATE_TO: 'date_to'
};

function App() {
  const [allFilms, setAllFilms] = React.useState([]);
  const [films, dispatchFilms] = useReducer(filmsReducer, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const viewedFilmsRef = useRef([]);
  const searchInputRef = useRef(null);

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    setAllFilms(allFilmsData);
    dispatchFilms({ type: 'init', payload: allFilmsData });
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const filtered = filterFilms(allFilms, searchParams);
    dispatchFilms({ type: 'init', payload: filtered });
  }, [searchParams, allFilms]);

  const addToViewed = (film) => {
    if (film && !viewedFilmsRef.current.some(f => f.id === film.id)) {
      viewedFilmsRef.current.push(film);
    }
  };

  const handleLikeClick = (id) => {
    dispatchFilms({ type: 'like', payload: id });
  };

  const handleDislikeClick = (id) => {
    dispatchFilms({ type: 'dislike', payload: id });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) params.set(PARAMS.SEARCH, value);
      else params.delete(PARAMS.SEARCH);
      return params;
    });
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) params.set(PARAMS.GENRE, value);
      else params.delete(PARAMS.GENRE);
      return params;
    });
  };

  const handleDateFromChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) params.set(PARAMS.DATE_FROM, value);
      else params.delete(PARAMS.DATE_FROM);
      return params;
    });
  };

  const handleDateToChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) params.set(PARAMS.DATE_TO, value);
      else params.delete(PARAMS.DATE_TO);
      return params;
    });
  };

  const likedFilms = films.filter(f => f.liked);
  const dislikedFilms = films.filter(f => f.disliked);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container ${theme}`}> 
        <Header toggleTheme={toggleTheme}/>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <div className="filters">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Название"
                    value={searchParams.get(PARAMS.SEARCH) || ''}
                    onChange={handleSearchChange}/>
                  <select value={searchParams.get(PARAMS.GENRE) || ''} onChange={handleGenreChange}>
                    <option value="">Все жанры</option>
                    <option value="Драма">Драма</option>
                    <option value="Мелодрама">Мелодрама</option>
                    <option value="Триллер">Триллер</option>
                    <option value="Боевик">Боевик</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Год от"
                    value={searchParams.get(PARAMS.DATE_FROM) || ''}
                    onChange={handleDateFromChange}/>
                  <input
                    type="number"
                    placeholder="Год до"
                    value={searchParams.get(PARAMS.DATE_TO) || ''}
                    onChange={handleDateToChange}/>
                </div>
                <div className="viewCounter">Просмотрено: {viewedFilmsRef.current.length}</div>
                <div className="mainContent">
                  <div className="filmList">
                    <h2>Каталог фильмов</h2>
                    {films.map((film) => (
                      <div key={film.id} onClick={() => addToViewed(film)}>
                        <FilmCard
                          film={film}
                          handleLike={() => handleLikeClick(film.id)}
                          handleDislike={() => handleDislikeClick(film.id)}
                          className={classNames('film-card', { liked: film.liked, disliked: film.disliked })}
                          link={`/film/${film.id}`}/>
                      </div>
                    ))}
                  </div>
                  <div className="likeDisliked" style={{ marginLeft: '20px' }}>
                    <div>
                      <h3 style={{ color: '#3ca300' }}>Мне понравилось ({likedFilms.length})</h3>
                      {likedFilms.map((f) => (
                        <div key={f.id}>{f.title}</div>
                      ))}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                      <h3 style={{ color: theme === 'dark' ? '#f30000' : '#a10000' }}>Мне не понравилось ({dislikedFilms.length})</h3>
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
      </div>
    </ThemeContext.Provider>
  );
}

function Header({ toggleTheme }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className="header">
      <h1>Мой каталог фильмов</h1>
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
      </div>
    </div>
  );
}

export default App;