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
    marginBottom: '8px' 
  };
  const genreStyle = { 
    color: '#65baff', 
    fontSize: '20px', 
    marginBottom: '15px' 
  };

  const [likes, setLikes] = useState(film.likesCount);
  const [dislikes, setDislikes] = useState(film.dislikesCount);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const like = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
    setDislikes(disliked ? dislikes - 1 : dislikes);
    setDisliked(false);
  };

  const dislike = () => {
    setDislikes(disliked ? dislikes  - 1 : dislikes + 1);
    setDisliked(!disliked);
    setLikes(liked ?  likes - 1: likes);
    setLiked(false);
  };

  const containerStyle = {
    display: 'flex',
    gap: '10px'
  };

  const buttonStyle = {
    backgroundColor: '#a4ff67',
    pading: '8px 16px',
    border: '2px solid #525252',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold'
  };

  const likeButtonStyle = {
    ...buttonStyle,
    backgroundColor: liked ? 'green' : '#a3a3a3'
  };

  const dislikeButtonStyle = {
    ...buttonStyle,
    backgroundColor: disliked ? 'red' : '#a3a3a3' 
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



  return (
    <div style={{ margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={titleStyle}>{film.title}</h2>
      <p style={yearStyle}>Год выпуска: {film.year}</p>
      <p style={genreStyle}>Жанр: {film.genre}</p>
      
      <p>Нравится: {likes}</p>
      <p>Не нравится: {dislikes}</p>
      
      <div style={containerStyle}>
        <button onClick={like} style={likeButtonStyle}>Нравится</button>
        <button onClick={dislike} style={dislikeButtonStyle}>Не нравится</button>
      </div>

      {liked && (
        <div style={fixedContainerStyle}>
          {film.title}
        </div>
      )}

    </div>
  );
}

export default App;