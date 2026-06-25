import image_avengers1 from '../assets/avengers_poster.webp';
import image_avengers2 from '../assets/avengers_poster2.webp';
import image_avengers3 from '../assets/avengers_poster3.webp';
import image_nowyouseeme1 from '../assets/nowyouseeme_poster.webp';
import image_nowyouseeme2 from '../assets/nowyouseeme_poster2.webp';
import image_nowyouseeme3 from '../assets/nowyouseeme_poster3.jpg';
import image_titanic1 from '../assets/titanic_poster.webp';
import image_titanic2 from '../assets/titanic_poster2.webp';
import image_titanic3 from '../assets/titanic_poster3.webp';
import image_twilight1 from '../assets/twilight_poster.jpg';
import image_twilight2 from '../assets/twilight_poster2.webp';
import image_twilight3 from '../assets/twilight_poster3.jpg';
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
    images: [image_avengers1, image_avengers2, image_avengers3],
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
    images: [image_nowyouseeme1, image_nowyouseeme2, image_nowyouseeme3],
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
    images: [image_titanic1, image_titanic2, image_titanic3],
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
    images: [image_twilight1, image_twilight2, image_twilight3],
  },
];