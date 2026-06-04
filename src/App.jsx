import React, { useState, useEffect } from 'react';
import FilmCard from './components/FilmCard.jsx';

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

function App() {
  const [films, setFilms] = useState(allFilms);
  const [isLiked, setisLiked] = useState([]);
  const [disLiked, setdisLiked] = useState([]);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const connection = {
      init: () => {
        const viewedFilmsCount = new Set([...isLiked, ...disLiked]).size;
        setViewCount(viewedFilmsCount);
      },
      disconnect: () => {
      }
    };
    connection.init();
    return () => {
      connection.disconnect();
    };
  }, [isLiked, disLiked]);

  const handleLike = (id) => {
    setFilms(prev => prev.map(f => {
      if (f.id === id) {
        if (isLiked.includes(id)) {
          setisLiked(prevLiked => prevLiked.filter(item => item !== id));
          return { ...f, likesCount: f.likesCount - 1 };
        } else {
          setisLiked(prevLiked => [...prevLiked, id]);
          if (disLiked.includes(id)) {
            setdisLiked(prevDisliked => prevDisliked.filter(item => item !== id));
            return {
              ...f,
              likesCount: f.likesCount + 1,
              dislikesCount: f.dislikesCount - 1
            };
          }
          return { ...f, likesCount: f.likesCount + 1 };
        }
      }
      return f;
    }));
  };

  const handleDislike = (id) => {
    setFilms(prev => prev.map(f => {
      if (f.id === id) {
        if (disLiked.includes(id)) {
          setdisLiked(prevDisliked => prevDisliked.filter(item => item !== id));
          return { ...f, dislikesCount: f.dislikesCount - 1 };
        } else {
          setdisLiked(prevDisliked => [...prevDisliked, id]);
          if (isLiked.includes(id)) {
            setisLiked(prevLiked => prevLiked.filter(item => item !== id));
            return {
              ...f,
              dislikesCount: f.dislikesCount + 1,
              likesCount: f.likesCount - 1
            };
          }
          return { ...f, dislikesCount: f.dislikesCount + 1 };
        }
      }
      return f;
    }));
  };

  const likedFilms = films.filter(f => isLiked.includes(f.id));
  const dislikedFilms = films.filter(f => disLiked.includes(f.id));

  return (
    <div style={{ position: 'relative', display: 'flex', padding: '20px', gap: '20px', fontFamily: 'Arial' }}>
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        backgroundColor: '#fff',
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        Просмотрено: {viewCount}
      </div>

      <div style={{ flex: 3 }}>
        <h2>Каталог фильмов</h2>
        {films.map((film) => (
          <FilmCard
            key={film.id}
            title={film.title}
            date={film.year}
            genre={film.genre}
            likes={film.likesCount}
            dislikes={film.dislikesCount}
            handleLike={() => handleLike(film.id)}
            handleDislike={() => handleDislike(film.id)}
            isLiked={isLiked.includes(film.id)}
            isDisliked={disLiked.includes(film.id)}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <div>
          <h3>Мне понравилось ({likedFilms.length})</h3>
          {likedFilms.map(f => (
            <div key={f.id}>{f.title}</div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>Мне не понравилось ({dislikedFilms.length})</h3>
          {dislikedFilms.map(f => (
            <div key={f.id}>{f.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;