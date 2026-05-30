import React, { useState } from 'react';

function FilmCard({ 
  title, 
  date, 
  genre, 
  likes, 
  dislikes, 
  handleLike, 
  handleDislike, 
  isLiked, 
  isDisliked 
}) {
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

  const buttonStyle = (isActive, color) => ({
    padding: '8px 16px',
    border: '2px solid #525252',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: isActive ? color : '#a3a3a3'
  });

  const handleLikeClick = () => {
    handleLike();
  };

  const handleDislikeClick = () => {
    handleDislike();
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px'
    }}>
      <h2 style={titleStyle}>{title}</h2>
      <p style={yearStyle}>Год выпуска: {date}</p>
      <p style={genreStyle}>Жанр: {genre}</p>
      <p>Понравилось: {likes}</p>
      <p>Не понравилось: {dislikes}</p>
      <div style={containerStyle}>
        <button
          style={buttonStyle(isLiked, 'green')}
          onClick={handleLikeClick}
        >
          Нравится
        </button>
        <button
          style={buttonStyle(isDisliked, 'red')}
          onClick={handleDislikeClick}
        >
          Не нравится
        </button>
      </div>
    </div>
  );
}

export default FilmCard;