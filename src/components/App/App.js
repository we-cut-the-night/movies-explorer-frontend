import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import './App.css';

function App() {

  // Состояние: данные пользователя, карточки
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);
  const [search, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCapacity, setPageCapacity] = useState(4);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [moviesShown, setMoviesShown] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  // обработка объекта с фильмом
  const handleMovieData = (item) => {
    const movieData =
    {
      id: item.id,
      src: item.image.url,
      title: item.nameRU,
      duration: item.duration,
      trailer: item.trailerLink
    };

    return movieData;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMoviesShown(pageCapacity);
  };

  const calcPageCapacity = () => {

    const windowInnerWidth = window.innerWidth;
    let pageCapacity = 1;
    // console.log(windowInnerWidth)

    if (windowInnerWidth < 769) {
      pageCapacity = 1
    } else if (windowInnerWidth < 997) {
      pageCapacity = 2
    } else if (windowInnerWidth < 1285) {
      pageCapacity = 3
    } else {
      pageCapacity = 4
    }

    setPageCapacity(pageCapacity);
  };

  const handleCardButtonClick = () => {
    setMoviesShown(Math.ceil(moviesShown / pageCapacity) * pageCapacity + pageCapacity);
    console.log(moviesShown);
    // setPageNumber(pageNumber + 1);
  };

  // Поиск по фильмам
  const updateMovies = () => {
    const moviesFiltered = movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));
    // console.log(moviesFiltered)
    setMoviesFiltered(moviesFiltered);
    setIsLoading(false);
  };

  // const handleMovieLike = (movie) => { // API >> обработка лайка фильма
  //   const isLiked = movie.likes.some(i => i === currentUser._id); // есть ли лайк от текущего пользователя
  //   const handleResponse = (res) => {
  //     const newCard = {
  //       id: res._id,
  //       src: res.link,
  //       name: res.name,
  //       owner: res.owner,
  //       likes: res.likes
  //     }
  //     // setCards((state) => state.map((c) => c.id === card.id ? newCard : c));
  //   };

  //   if (isLiked) { // получаем обновлённые данные карточки из API
  //     api.deleteCardLike(card.id, localStorage.getItem('jwt'))
  //       .then(res => handleResponse(res))
  //       .catch(err => console.log('Ошибка: ', err)); // удалить
  //   } else {
  //     api.setCardLike(card.id, localStorage.getItem('jwt'))
  //       .then(res => handleResponse(res))
  //       .catch(err => console.log('Ошибка: ', err)); // добавить
  //   };
  // };


  useEffect(() => {

    // определение текущего пользователя
    if (localStorage.getItem('jwt')) {
      mainApi.getUserData(localStorage.getItem('jwt')) // API >> данные пользователя при первой загрузке страницы
        .then(res => {
          setCurrentUser(res)
          console.log('Текущий пользователь', res)
        })
        .catch(err => console.log('Ошибка: ', err));
    };

    // первичная выгрузка массива с фильмами
    moviesApi.getMoviesData()
      .then(res => setMovies(res.map(handleMovieData)))
      .finally(() => setIsLoading(false))

    calcPageCapacity();
    window.addEventListener('resize', calcPageCapacity);
  }, [loggedIn]);

  // обноление списка найденных фильмов
  useEffect(() => {
    isLoading && updateMovies(search);
    // console.log(isLoading)
  }, [search, isLoading]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} />} exact />
          <Route path='/movies' element={
            <Movies
              loggedIn={loggedIn}
              isLoading={isLoading}
              movies={moviesFiltered}
              handleFormSubmit={handleFormSubmit}
              search={search}
              setSearchQuery={setSearchQuery}
              moviesShown={moviesShown}
              pageCapacity={pageCapacity}
              handleCardButtonClick={handleCardButtonClick}
            />}
          />
          <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn} />} />
          <Route path='/profile' element={<Profile loggedIn={loggedIn} name='Виталий' email='pochta@yandex.ru' />} />
          <Route path='/signin' element={<Login welcome='Рады видеть!' />} />
          <Route path='/signup' element={<Register welcome='Добро пожаловать!' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
