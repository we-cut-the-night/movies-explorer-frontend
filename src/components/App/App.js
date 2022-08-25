import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

function App() {
  const loggedIn = true;

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} />} exact />
        <Route path='/movies' element={<Movies loggedIn={loggedIn} />} />
        <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn} />} />
        <Route path='/profile' element={<Profile loggedIn={loggedIn} name='Виталий' email='pochta@yandex.ru'/>} />
        <Route path='/signin' element={<Login welcome='Рады видеть!' />} />
        <Route path='/signup' element={<Register welcome='Добро пожаловать!' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
