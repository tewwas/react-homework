export function filmsReducer(state, action) {
  switch (action.type) {
    case 'init':
      return action.payload;
    case 'like':
      return state.map(f => {
        if (f.id === action.payload) {
          if (f.liked) {

            return { ...f, liked: false, likesCount: f.likesCount - 1 };
          } else {
            const dislikesCount = f.disliked ? f.dislikesCount - 1 : f.dislikesCount;
            return {
              ...f,
              liked: true,
              disliked: false,
              likesCount: f.likesCount + 1,
              dislikesCount: dislikesCount,
            };
          }
        }
        return f;
      });
    case 'dislike':
      return state.map(f => {
        if (f.id === action.payload) {
          if (f.disliked) {
            return { ...f, disliked: false, dislikesCount: f.dislikesCount - 1 };
          } else {
            const likesCount = f.liked ? f.likesCount - 1 : f.likesCount;
            return {
              ...f,
              disliked: true,
              liked: false,
              dislikesCount: f.dislikesCount + 1,
              likesCount: likesCount,
            };
          }
        }
        return f;
      });
    default:
      return state;
  }
}