import { PAGE_CAPACITY_MIN, PAGE_CAPACITY_MID, PAGE_CAPACITY_MAX, BASE_URL } from './constants';

// вычисление вместимости одной страницы с фильмами
export const calcPageCapacity = () => {
  const windowInnerWidth = window.innerWidth;
  let pageCapacity;

  windowInnerWidth < PAGE_CAPACITY_MIN ? pageCapacity = 5
    : windowInnerWidth < PAGE_CAPACITY_MID ? pageCapacity = 2
      : windowInnerWidth < PAGE_CAPACITY_MAX ? pageCapacity = 3
        : pageCapacity = 4;

  return pageCapacity;
};

// обработка объекта с фильмом
export const handleMovieData = (item) => {
  const movieData =
  {
    id: item.id ? item.id : item.movieId,
    src: item.image.url ? BASE_URL + item.image.url : item.image,
    thumbnail: item.image.formats ? BASE_URL + item.image.formats.thumbnail.url : item.thumbnail,
    trailer: item.trailerLink,
    title: item.nameRU,
    titleEN: item.nameEN,
    duration: item.duration,
    country: item.country,
    director: item.director,
    description: item.description,
    year: item.year
  };

  return movieData;
};

// вычисление вместимости одной страницы с фильмами
export const calcMoviesShown = (capacity) => {
  let moviesCount;

  capacity === 5 ? moviesCount = 5
    : capacity === 2 ? moviesCount = 8
      : moviesCount = 12;

  return moviesCount;
};
