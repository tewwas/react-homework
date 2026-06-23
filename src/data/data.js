import image1 from '../assets/avengers_poster.webp';
import image2 from '../assets/nowyouseeme_poster.webp';
import image3 from '../assets/titanic_poster.webp';
import image4 from '../assets/twilight_poster.jpg';
import { v4 as uuidv4 } from 'uuid';

export const allFilmsData = [
  {
    id: uuidv4(),
    title: 'Мстители',
    year: 2012,
    genre: 'Боевик',
    likesCount: 52,
    dislikesCount: 36,
    liked: false,
    disliked: false,
    image: image1,
  },
  {
    id: uuidv4(),
    title: 'Иллюзия обмана',
    year: 2013,
    genre: 'Триллер',
    likesCount: 49,
    dislikesCount: 15,
    liked: false,
    disliked: false,
    image: image2,
  },
  {
    id: uuidv4(),
    title: 'Титаник',
    year: 1997,
    genre: 'Драма',
    likesCount: 30,
    dislikesCount: 12,
    liked: false,
    disliked: false,
    image: image3,
  },
  {
    id: uuidv4(),
    title: 'Сумерки',
    year: 2008,
    genre: 'Мелодрама',
    likesCount: 42,
    dislikesCount: 31,
    liked: false,
    disliked: false,
    image: image4,
  },
];