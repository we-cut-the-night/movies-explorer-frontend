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
import { SHORT_MOVIE_DURATION } from '../../utils/constants';
import { calcPageCapacity, handleMovieData, calcMoviesShown } from '../../utils/functions';
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
  const [searchError, setSearchError] = useState('');


  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchSaved, setSearchQuerySaved] = useState('');
  const [isShortMovieSaved, setIsShortMovieSaved] = useState(false);
  const [moviesFilteredSaved, setMoviesFilteredSaved] = useState([]);
  const [moviesShownSaved, setMoviesShownSaved] = useState(0);
  const [searchErrorSaved, setSearchErrorSaved] = useState('');

  // Сообщения с ошибкой
  const [errorMessage, setErrorMessage] = useState('');
  const [profileMessage, setProfileMessage] = useState('');

  // регистрация
  const handleRegister = ({ name, email, password }) => {
    mainApi.signup(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch(err => {
        setErrorMessage(err.message);
        console.log(err.message);
        setTimeout(() => { setErrorMessage('') }, 3000);
      });
  };

  // определение текущего пользователя
  const getUserData = () => {
    if (localStorage.getItem('jwt')) {
      mainApi.getUserData(localStorage.getItem('jwt')) // API >> данные пользователя при первой загрузке страницы
        .then(res => {
          setCurrentUser(res);
          setLoggedIn(true);
          // navigate('/movies');
        })
        .catch(err => {
          handleLogout();
          console.log('Ошибка: ', err)
        });
    };
  };

  const getMoviesData = () => {
    if (localStorage.getItem('movies')) {
      const data = JSON.parse(localStorage.getItem('movies'));
      setMovies(data);
      // setMoviesFiltered(data);
      updateMovies();
    } else {
      localStorage.getItem('jwt') &&
        moviesApi.getMoviesData(localStorage.getItem('jwt')) // все фильмы
          .then(res => {
            const data = res.map(handleMovieData);
            setMovies(data);
            // setMoviesFiltered(data);
            localStorage.setItem('movies', JSON.stringify(data));
          })
          .then(() => updateMovies())
          .catch((err) => console.log(err));
    };
  };

  const getSavedMoviesData = () => {
    localStorage.getItem('jwt') &&
      mainApi.getSavedMoviesData(localStorage.getItem('jwt')) // сохраненные фильмы
        .then(res => {
          const data = res.map(handleMovieData);
          setSavedMovies(data);
          setMoviesFilteredSaved(data);
        })
        .finally(() => setIsLoading(false));
  };

  // авторизация
  const handleLogin = ({ email, password }) => {
    mainApi.signin(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
      })
      .then(() => {
        getUserData();
        getMoviesData();
        navigate('/movies');
      })
      .catch((err) => {
        setErrorMessage(err.message);
        console.log(err.message);
        setTimeout(() => { setErrorMessage('') }, 3000);
      });
  };

  // выйти
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('search');
    localStorage.removeItem('isShortMovie');
    localStorage.removeItem('movies');
    setCurrentUser(null);
    setLoggedIn(false);
    navigate('/signin');
  }

  // редактирование данных пользователя
  const handleEditUserData = (name, email) => {
    localStorage.getItem('jwt') &&
      mainApi.editUserData(name, email, localStorage.getItem('jwt'))
        .then((data) => {
          setCurrentUser(data);
          setProfileMessage('Профиль обновлен');
          setTimeout(() => {
            setProfileMessage('');
          }, 3000);
        })
        .catch((err) => console.log(err));
  };

  // обработка сабмита формы с поиском фильмов
  const handleFormSubmit = (e, page) => {
    e.preventDefault();
    setQueryPage(page);
    getMoviesData();
    console.log('search', search)

    if (page === 'Movies') {
      if (!search) {
        setSearchError('Нужно ввести ключевое слово');
      } else {
        setSearchError('');
        setIsLoading(true);
        localStorage.setItem('search', search);
        setMoviesShown(calcMoviesShown(pageCapacity));
      };
    } else { // Сохраненные фильмы
      if (!searchSaved) {
        setSearchErrorSaved('Нужно ввести ключевое слово');
      } else {
        setSearchErrorSaved('');
        setIsLoading(true);
        setMoviesShownSaved(calcMoviesShown(pageCapacity));
      };
    };
  };

  // обработка клика для перехода на следующую страницу с результатами поиска
  const handleCardButtonClick = () => {
    setMoviesShown(Math.ceil(moviesShown / pageCapacity) * pageCapacity + pageCapacity);
  };

  // обработка клика по чекбоксу "Короткометражки"
  const handleShortMovieClick = (page) => {

    setQueryPage(page);

    if (page === 'Movies') {
      setIsShortMovie(!isShortMovie);
      setMoviesShown(pageCapacity);
    } else { // SavedMovies
      setIsShortMovieSaved(!isShortMovieSaved);
      setMoviesShownSaved(pageCapacity);
    };

    setIsLoading(true);
  };

  // Добавление в сохраненные фильмы
  const handleSaveMovie = (movie) => {
    localStorage.getItem('jwt') &&
      mainApi.saveMovie(movie, localStorage.getItem('jwt'))
        .then(res => handleMovieData(res))
        .then(movie => {
          setSavedMovies(movies => [...movies, movie])
          // setMoviesFilteredSaved(movies => [...movies, movie])
        })
        .catch(err => console.log(err));
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
      localStorage.setItem('isShortMovie', isShortMovie);

    } else { // SavedMovies

      moviesFiltered = savedMovies
        .filter((movie) =>
          searchSaved ?
            movie.title.toLowerCase().includes(searchSaved.toLowerCase()) : savedMovies)
        .filter((movie) => isShortMovieSaved ? movie.duration <= SHORT_MOVIE_DURATION : true)

      setMoviesFilteredSaved(moviesFiltered);

    };

    setTimeout(() => setIsLoading(false), 700);
  };

  // Сбросить состояние при отрисовке сохраненных фильмов
  const resetMovies = () => {
    if (localStorage.getItem('search')) {
      setSearchQuery(localStorage.getItem('search'));
    };

    if (localStorage.getItem('isShortMovie')) {
      setIsShortMovie(localStorage.getItem('isShortMovie') === 'true' ? true : false);
    };

    setSearchError('');
  };

  // Сбросить состояние при отрисовке сохраненных фильмов
  const resetSavedMovies = () => {
    setSearchQuerySaved('');
    setMoviesFilteredSaved(savedMovies);
    setIsShortMovieSaved(false);
    setSearchErrorSaved('');
  };

  const handleResize = () => {
    setPageCapacity(calcPageCapacity);
  };

  // Эффекты
  useEffect(() => {
    getUserData(); // проверяем токен, выгружаем данные пользователя
    getSavedMoviesData(); // проверяем state, выгружаем данные о сохраненных фильмах

    setPageCapacity(calcPageCapacity());
    setMoviesShown(calcMoviesShown(pageCapacity));
    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

  }, [loggedIn]);

  useEffect(() => {
    if (movies.length === 0) {
      isLoading && getMoviesData();
    } else {
      isLoading && updateMovies();
    };
  }, [isLoading]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} />} exact />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
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
                searchError={searchError}
                resetMovies={resetMovies}
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
                searchErrorSaved={searchErrorSaved}
                resetSavedMovies={resetSavedMovies}
              />} />
            <Route path='/profile' element={
              <Profile
                loggedIn={loggedIn}
                onSubmit={handleEditUserData}
                onLogout={handleLogout}
                message={profileMessage}
              />}
            />
          </Route>
          <Route path='/signin' element={
            <Login
              welcome='Рады видеть!'
              onSubmit={handleLogin}
              message={errorMessage}
            />
          } />
          <Route path='/signup' element={
            <Register
              welcome='Добро пожаловать!'
              onSubmit={handleRegister}
              message={errorMessage}
            />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </div>

    </CurrentUserContext.Provider>
  );
};

export default App;
