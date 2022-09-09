import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import { PAGE_CAPACITY_MIN, PAGE_CAPACITY_MID, PAGE_CAPACITY_MAX, SHORT_MOVIE_DURATION, BASE_URL } from '../../utils/constants';
import './App.css';

function App() {

  // Состояние: данные пользователя, карточки
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [queryPage, setQueryPage] = useState('');
  const [pageCapacity, setPageCapacity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  // Фильмы
  const [movies, setMovies] = useState([]);
  const [search, setSearchQuery] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [moviesShown, setMoviesShown] = useState(0);

  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchSaved, setSearchQuerySaved] = useState('');
  const [isShortMovieSaved, setIsShortMovieSaved] = useState(false);
  const [moviesFilteredSaved, setMoviesFilteredSaved] = useState([]);
  const [moviesShownSaved, setMoviesShownSaved] = useState(0);

  // регистрация
  const handleRegister = ({ name, email, password }) => {
    mainApi.signup(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch(err => console.log('Ошибка: ', err.message));
  };

  // авторизация
  const handleLogin = ({ email, password }) => {
    mainApi.signin(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
      })
      .then(() => setLoggedIn(true))
      .catch((err) => console.log(err));
  };

  // определение текущего пользователя
  const getUserData = () => {
    localStorage.getItem('jwt') &&
      mainApi.getUserData(localStorage.getItem('jwt')) // API >> данные пользователя при первой загрузке страницы
        .then(res => setCurrentUser(res))
        .catch(err => console.log('Ошибка: ', err));
  };

  // выйти
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  // редактирование данных пользователя
  const handleEditUserData = (name, email) => {
    localStorage.getItem('jwt') &&
      mainApi.editUserData(name, email, localStorage.getItem('jwt'))
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
  };

  // обработка объекта с фильмом
  const handleMovieData = (item) => {
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

  // обработка сабмита формы с поиском фильмов
  const handleFormSubmit = (e, page) => {
    e.preventDefault();
    setIsLoading(true);
    setQueryPage(page);
    page === 'Movies' ? setMoviesShown(pageCapacity) : setMoviesShownSaved(pageCapacity);
  };

  // вычисление вместимости одной страницы с фильмами
  const calcPageCapacity = () => {
    const windowInnerWidth = window.innerWidth;
    let pageCapacity;

    windowInnerWidth < PAGE_CAPACITY_MIN ? pageCapacity = 5
      : windowInnerWidth < PAGE_CAPACITY_MID ? pageCapacity = 2
        : windowInnerWidth < PAGE_CAPACITY_MAX ? pageCapacity = 3
          : pageCapacity = 4;

    setPageCapacity(pageCapacity);
  };

  // обработка клика для перехода на следующую страницу с результатами поиска
  const handleCardButtonClick = () => {
    setMoviesShown(Math.ceil(moviesShown / pageCapacity) * pageCapacity + pageCapacity);
  };

  // обработка клика по чекбоксу "Короткометражки"
  const handleShortMovieClick = (page) => {

    if (page === 'Movies') {
      setIsShortMovie(!isShortMovie);
      setMoviesShown(pageCapacity);
    } else {
      setIsShortMovieSaved(!isShortMovieSaved);
      setMoviesShownSaved(pageCapacity);
    };

    setQueryPage(page);
    setIsLoading(true);
  };

  // Добавление в сохраненные фильмы
  const handleSaveMovie = (movie) => {
    localStorage.getItem('jwt') &&
      mainApi.saveMovie(movie, localStorage.getItem('jwt'))
        .then(res => handleMovieData(res))
        .then(movie => {
          setSavedMovies(movies => [...movies, movie])
          setMoviesFilteredSaved(movies => [...movies, movie])
        })
        .catch(err => console.log(err));

    setIsLoading(true);
  };

  // Удаление из сохраненных фильмов
  const handleDeleteMovie = (movieId) => {
    localStorage.getItem('jwt') &&
      mainApi.deleteMovie(movieId, localStorage.getItem('jwt'))
        .then(movieDeleted => {
          setSavedMovies(savedMovies.filter(movie => movieDeleted.movieId !== movie.id))
          setMoviesFilteredSaved(moviesFilteredSaved.filter(movie => movieDeleted.movieId !== movie.id))
        })
        .catch(err => console.log(err));
  };

  // обновление списка фильмов к выводу на страницу
  const updateMovies = () => {
    let moviesFiltered;

    if (queryPage === 'Movies') {

      moviesFiltered = movies
        .filter((movie) => search && movie.title.toLowerCase().includes(search.toLowerCase()))
        .filter((movie) => isShortMovie ? movie.duration <= SHORT_MOVIE_DURATION : true)

      setMoviesFiltered(moviesFiltered);
      localStorage.setItem('search', search);
      localStorage.setItem('isShortMovie', isShortMovie);
      localStorage.setItem('movies', JSON.stringify(moviesFiltered));

    } else {

      moviesFiltered = savedMovies
        .filter((movie) => movie.title.toLowerCase().includes(searchSaved.toLowerCase()))
        .filter((movie) => isShortMovieSaved ? movie.duration <= SHORT_MOVIE_DURATION : true)

      setMoviesFilteredSaved(moviesFiltered);
      localStorage.setItem('searchSaved', searchSaved);
      localStorage.setItem('isShortMovieSaved', isShortMovieSaved);
      localStorage.setItem('moviesSaved', JSON.stringify(moviesFiltered));
    }

    setIsLoading(false);
  };


  // Эффекты
  useEffect(() => {
    if (localStorage.getItem('jwt')) {

      setLoggedIn(true);
      navigate('/movies');
      getUserData();

      // первичная выгрузка фильмов
      localStorage.getItem('jwt') &&
        moviesApi.getMoviesData(localStorage.getItem('jwt')) // все фильмы
          .then(res => setMovies(res.map(handleMovieData)))
          .finally(() => setIsLoading(false));

      setSearchQuery(localStorage.getItem('search'));
      setIsShortMovie(localStorage.getItem('isShortMovie') === 'true' ? true : false);
      setMoviesFiltered(JSON.parse(localStorage.getItem('movies')));

      // первичная выгрузка сохраненных фильмов
      localStorage.getItem('jwt') &&
        mainApi.getSavedMoviesData(localStorage.getItem('jwt')) // сохраненные фильмы
          .then(res => {
            setSavedMovies(res.map(handleMovieData))
            setMoviesFilteredSaved(res.map(handleMovieData))
          })
          .finally(() => setIsLoading(false));

      setSearchQuerySaved(localStorage.getItem('searchSaved'));
      setIsShortMovieSaved(localStorage.getItem('isShortMovieSaved') === 'true' ? true : false);
      setMoviesFilteredSaved(JSON.parse(localStorage.getItem('moviesSaved')));

      calcPageCapacity();
      window.addEventListener('resize', calcPageCapacity);

    } else {

      setLoggedIn(false);
      navigate('/signin');
      window.removeEventListener('resize', calcPageCapacity);

    };

  }, [loggedIn]);

  useEffect(() => {
    // обноление блока с результатами
    isLoading && updateMovies();

  }, [isLoading]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} />} exact />
          <Route element={<ProtectedRoute isLoginIn={loggedIn} />}>
            <Route path='/movies' element={
              <Movies
                loggedIn={loggedIn}
                movies={moviesFiltered}
                moviesSaved={savedMovies}
                search={search}
                isShortMovie={isShortMovie}
                moviesShown={moviesShown}
                pageCapacity={pageCapacity}
                setSearchQuery={setSearchQuery}
                handleFormSubmit={handleFormSubmit}
                handleCardButtonClick={handleCardButtonClick}
                onShortMovie={handleShortMovieClick}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                isLoading={isLoading}
              />}
            />
            <Route path='/saved-movies' element={
              <SavedMovies
                loggedIn={loggedIn}
                movies={moviesFilteredSaved}
                moviesSaved={savedMovies}
                search={searchSaved}
                setSearchQuery={setSearchQuerySaved}
                isShortMovie={isShortMovieSaved}
                moviesShown={moviesShownSaved}
                pageCapacity={pageCapacity}
                handleFormSubmit={handleFormSubmit}
                onShortMovie={handleShortMovieClick}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                isLoading={isLoading}
              />} />
            <Route path='/profile' element={
              <Profile
                loggedIn={loggedIn}
                onSubmit={handleEditUserData}
                onLogout={handleLogout}
              />}
            />
          </Route>
          <Route path='/signin' element={<Login welcome='Рады видеть!' onSubmit={handleLogin} />} />
          <Route path='/signup' element={<Register welcome='Добро пожаловать!' onSubmit={handleRegister} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
