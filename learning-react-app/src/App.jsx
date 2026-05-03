import React, { useState } from 'react';

function App() {
  const film = {
    title: 'Титаник',
    year: 1997,
    genre: 'Драма',
    likesCount: 30,
    dislikesCount: 12,
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

  return (
    <div>
      <h2>{film.title}</h2>
      <p>Год выпуска: {film.year}</p>
      <p>Жанр: {film.genre}</p>
      <p>Нравится: {likes}</p>
      <p>Не нравится: {dislikes}</p>
      <button onClick={handleLike}>Нравится</button>
      <button onClick={handleDislike}>Не нравится</button>
    </div>
  );
}

export default App;