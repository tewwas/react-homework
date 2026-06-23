export function handleLike(films, id) {
  return films.map(f => {
    if (f.id === id) {
      if (f.liked) {
        return { ...f, liked: false, likesCount: f.likesCount - 1 };
      } else {
        let newLikesCount = f.likesCount + 1;
        let newDislikesCount = f.dislikesCount;
        if (f.disliked) {
          newDislikesCount -= 1;
        }
        return {
          ...f,
          liked: true,
          disliked: false,
          likesCount: newLikesCount,
          dislikesCount: newDislikesCount,
        };
      }
    }
    return f;
  });
}

export function handleDislike(films, id) {
  return films.map(f => {
    if (f.id === id) {
      if (f.disliked) {
        return { ...f, disliked: false, dislikesCount: f.dislikesCount - 1 };
      } else {
        let newDislikesCount = f.dislikesCount + 1;
        let newLikesCount = f.likesCount;
        if (f.liked) {
          newLikesCount -= 1;
        }
        return {
          ...f,
          disliked: true,
          liked: false,
          dislikesCount: newDislikesCount,
          likesCount: newLikesCount,
        };
      }
    }
    return f;
  });
}

export function filterFilms(films, searchParams) {
  let filtered = [...films];

  const search = searchParams.get('search') || '';
  const genre = searchParams.get('genre') || '';
  const date_from = searchParams.get('date_from') || '';
  const date_to = searchParams.get('date_to') || '';

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

  return filtered;
}