import React from 'react';
import { Link } from 'react-router-dom';

function FilmCard({
  title,
  date,
  genre,
  likes,
  dislikes,
  handleLike,
  handleDislike,
  isLiked,
  isDisliked,
  image,
  link,
  className
}) {
  const titleStyle = {
    color: '#2c3e50',
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
  };
  const yearStyle = {
    color: '#0077c7',
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
  };

  const buttonStyle = (isActive, color) => ({
    padding: '8px 16px',
    border: '2px solid #525252',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: isActive ? color : '#a3a3a3',
  });

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
      }}
      className={className}>
      {link ? (
        <h2 style={{ ...titleStyle, margin: 0 }}>
          <Link to={link} style={{ textDecoration: 'none', color: '#2c3e50' }}>
            {title}
          </Link>
        </h2>
      ) : (
        <h2 style={titleStyle}>{title}</h2>
      )}

      {image && (
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <img
            src={image}
            alt={title}
            style={{
              width: '400px',
              height: '500px',
              objectFit: 'cover',
              borderRadius: '7px',
            }}
          />
        </div>
      )}

      <p style={yearStyle}>Год выпуска: {date}</p>
      <p style={genreStyle}>Жанр: {genre}</p>
      <p style={{ color: '#3ca300' }}>Понравилось: {likes}</p>
      <p style={{ color: '#a10000' }}>Не понравилось: {dislikes}</p>

      <div style={containerStyle}>
        <button style={buttonStyle(isLiked, 'green')} onClick={handleLike}>
          Нравится
        </button>
        <button style={buttonStyle(isDisliked, 'red')} onClick={handleDislike}>
          Не нравится
        </button>
      </div>
    </div>
  );
}

export default FilmCard;