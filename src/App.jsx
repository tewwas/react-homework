import React, { useState } from 'react';

function App() {
  const film = {
    title: 'Титаник',
    year: 1997,
    genre: 'Драма',
    likesCount: 30,
    dislikesCount: 12,
  };

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
    fontStyle: 'italic', 
    marginBottom: '8px' 
  };
  const genreStyle = { 
    color: '#65baff', 
    fontSize: '20px', 
    fontWeight: '600', 
    marginBottom: '15px' 
  };

  const [likes, setLikes] = useState(film.likesCount);
  const [dislikes, setDislikes] = useState(film.dislikesCount);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
  };

  const actionButtonClass = 'actionButton';

  return (
    <div style={{ margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={titleStyle}>{film.title}</h2>
      <p style={yearStyle}>Год выпуска: {film.year}</p>
      <p style={genreStyle}>Жанр: {film.genre}</p>
      
      <p>Нравится: {likes}</p>
      <p>Не нравится: {dislikes}</p>
      
      <button
        className={actionButtonClass}
        onClick={handleLike}
        style={{ backgroundColor: '#a4ff67', padding: '8px 16px', marginRight: '10px' }}>Нравится</button>
      <button
        className={actionButtonClass}
        onClick={handleDislike}
        style={{ backgroundColor: '#ff5151', padding: '8px 16px'}}>Не нравится</button>
    </div>
  );
}

export default App;