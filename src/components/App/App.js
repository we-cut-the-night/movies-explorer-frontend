import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const navigate = useNavigate();

  // Состояние: данные пользователя, карточки
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [queryPage, setQueryPage] = useState('');
  const [pageCapacity, setPageCapacity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
  const [delay, setDelay] = useState(0);

  // Эффекты
  useEffect(() => {
    getUserData(); // проверяем токен, выгружаем данные пользователя
    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

  }, []);

  useEffect(() => {
    movies.length > 0 && updateMoviesList('Movies');
  }, [movies]);


  // isLoading
  useEffect(() => {
    movies.length === 0 ?
      isLoading && getMoviesData()
      : isLoading && queryPage && updateMoviesList(queryPage);

  }, [isLoading]);

  // Отрисовка страницы Movies
  const resetMovies = () => {
    setQueryPage('Movies');
    movies.length === 0 && getMoviesData(); // загрузить начальный список фильмов
    updateSearchConfig(); // обновить настройки фильтров
    setPageCapacity(calcPageCapacity()); // вместимость одной строки
    moviesShown === 0 && setMoviesShown(calcMoviesShown(calcPageCapacity())); // количество отображаемых фильмов

    setIsLoading(true); // обновить список отображаемых фильмов

  };

  // Отрисовка страницы SavedMovies
  const resetSavedMovies = () => {
    setQueryPage('SavedMovies');
    setSearchQuerySaved('');
    setSearchErrorSaved('');
    savedMovies.length === 0 ? getSavedMoviesData() : setMoviesFilteredSaved(savedMovies);

    setIsLoading(true); // обновить список отображаемых фильмов
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
      setMovies(JSON.parse(localStorage.getItem('movies')));
    } else {
      localStorage.getItem('jwt') &&
        moviesApi.getMoviesData(localStorage.getItem('jwt')) // все фильмы
          .then(res => {

            const data = res.map(handleMovieData);
            setMovies(data);
            localStorage.setItem('movies', JSON.stringify(data));
          })
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
        .catch((err) => console.log(err));
  };

  // Регистрация
  const handleRegister = ({ name, email, password }) => {
    mainApi.signup(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(err => {
        setErrorMessage(err.message);
        console.log(err.message);
        setTimeout(() => { setErrorMessage('') }, 3000);
      });
  };

  // Авторизация
  const handleLogin = ({ email, password }) => {
    mainApi.signin(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
      })
      .then(() => {
        getUserData();
        navigate('/movies');
      })
      .catch((err) => {
        setErrorMessage(err.message);
        console.log(err.message);
        setTimeout(() => { setErrorMessage('') }, 3000);
      });
  };

  // Выход
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('search');
    localStorage.removeItem('isShortMovie');
    localStorage.removeItem('movies');
    setCurrentUser(null);
    setLoggedIn(false);
    setSearchQuery('');
    setMoviesShown(0);
    setIsShortMovie(false);
    setMoviesFiltered([]);
    setMoviesFilteredSaved([]);
    navigate('/');
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
    setDelay(600);

    if (page === 'Movies') {
      if (!search) {
        setSearchError('Нужно ввести ключевое слово');
      } else {
        setSearchError('');
        localStorage.setItem('search', search);
        setMoviesShown(calcMoviesShown(pageCapacity));

        setIsLoading(true); // обновить список отображаемых фильмов

      };
    } else { // SavedMovies
      if (!searchSaved) {
        setSearchErrorSaved('Нужно ввести ключевое слово');
      } else {
        setSearchErrorSaved('');
        setIsLoading(true); // обновить список отображаемых фильмов

        setMoviesShownSaved(calcMoviesShown(pageCapacity));

      };
    };
  };

  // обработка клика по чекбоксу "Короткометражки"
  const handleShortMovieClick = (page) => {

    if (page === 'Movies') {
      setIsShortMovie(!isShortMovie);
      localStorage.setItem('isShortMovie', !isShortMovie);
      setMoviesShown(pageCapacity);

    };

    if (page === 'SavedMovies') {
      setIsShortMovieSaved(!isShortMovieSaved);
      setMoviesShownSaved(pageCapacity);
    };

    setDelay(600);
    setIsLoading(true); // обновить список отображаемых фильмов

  };

  // обработка клика для перехода на следующую страницу с результатами поиска
  const handleCardButtonClick = () => {
    setMoviesShown(Math.ceil(moviesShown / pageCapacity) * pageCapacity + pageCapacity);
  };

  // Добавление в сохраненные фильмы
  const handleSaveMovie = (movie) => {
    const data = movie;

    localStorage.getItem('jwt') &&
      mainApi.saveMovie(data, localStorage.getItem('jwt'))
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

  // Обновить настройки поиска
  const updateSearchConfig = () => {
    setSearchError('');
    localStorage.getItem('search') ? setSearchQuery(localStorage.getItem('search')) : setSearchQuery('');
    localStorage.getItem('isShortMovie') ?
      setIsShortMovie(localStorage.getItem('isShortMovie') === 'true' ? true : false)
      : setIsShortMovie(false);
  };

  // Колбэк при изменении размера окна
  const handleResize = () => {
    setPageCapacity(calcPageCapacity);
  };

  // обновление отображаемого списка фильмов
  const updateMoviesList = (page) => {
    // console.log(page, '/ search:', search, '/ isShort:', isShortMovie, moviesShown)

    let moviesFiltered = [];

    if (page === 'Movies') {
      moviesFiltered = movies
        .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
        .filter((movie) => isShortMovie ? movie.duration <= SHORT_MOVIE_DURATION : true)


      search && setMoviesFiltered(moviesFiltered);
      moviesFiltered.length === 0 && search && setSearchError('Ничего не найдено');

    };

    if (page === 'SavedMovies') {
      moviesFiltered = savedMovies
        .filter((movie) =>
          searchSaved ?
            movie.title.toLowerCase().includes(searchSaved.toLowerCase())
            : savedMovies)
        .filter((movie) => isShortMovieSaved ? movie.duration <= SHORT_MOVIE_DURATION : true)

      setMoviesFilteredSaved(moviesFiltered);
      moviesFilteredSaved.length === 0 && searchSaved && setSearchErrorSaved('Ничего не найдено');

    };

    setTimeout(() => setIsLoading(false), delay);
    setDelay(0);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route exact path='/' element={<Main loggedIn={loggedIn} />} />
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
            />
          } />
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
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
              />
            </ProtectedRoute>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
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
              />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                loggedIn={loggedIn}
                onSubmit={handleEditUserData}
                onLogout={handleLogout}
                message={profileMessage}
              />
            </ProtectedRoute>
          } />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </div>

    </CurrentUserContext.Provider >
  );
};

export default App;
