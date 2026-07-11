import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';

function FilmCard({
  film,
  handleLike,
  handleDislike, 
  className,
  link
}) {
  const { theme } = useContext(ThemeContext);
  const { title, year, genre, likesCount, dislikesCount, liked, disliked, images } = film;

  const cardStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: theme === 'light' ? '#fff' : '#444',
    color: theme === 'light' ? '#000' : '#fff',
    borderRadius: '8px',
    boxShadow: theme === 'light' ? '0 0 5px rgba(0,0,0,0.1)' : 'none',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const titleStyle = {
    color: theme === 'dark' ? '#3399ff' : '#2c3e50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
  };

  const yearStyle = {
    color: theme === 'dark' ? '#4ca6ff' : '#0077c7',
    fontSize: '20px',
    marginBottom: '8px',
  };

  const genreStyle = {
    color: '#65baff',
    fontSize: '20px',
    marginBottom: '15px',
  };

  const containerStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  };

  const buttonStyle = (isActive, color) => ({
    padding: '8px 16px',
    border: '2px solid #525252',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: isActive ? color : '#a3a3a3',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  });

  return (
    <div
      style={cardStyle}
      className={className}>
      {link ? (
        <h2 style={{ ...titleStyle, margin: 0 }}>
          <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </Link>
        </h2>
      ) : (
        <h2 style={titleStyle}>{title}</h2>
      )}

      {images && images.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <img
            src={images[0]}
            alt={title}
            style={{
              width: '400px',
              height: '500px',
              objectFit: 'cover',
              borderRadius: '7px',
            }}/>
        </div>
      )}

      <p style={yearStyle}>Год выпуска: {year}</p>
      <p style={genreStyle}>Жанр: {genre}</p>
      <p style={{ color: '#3ca300' }}>Понравилось: {likesCount}</p>
      <p style={{color: theme === 'dark' ? '#f30000' : '#a10000' }}>Не понравилось: {dislikesCount}</p>

      <div style={containerStyle}>
        <button style={buttonStyle(liked, 'green')} onClick={handleLike}>
          Нравится
        </button>
        <button style={buttonStyle(disliked, 'red')} onClick={handleDislike}>
          Не нравится
        </button>
      </div>
    </div>
  );
}

export default React.memo(FilmCard);