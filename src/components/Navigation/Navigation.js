import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="header__login">
      <ul className='header__nav-login'>
        <li className='header__nav-item'>
          <NavLink to='/movies'
            className={({ isActive }) => (isActive ? 'header__nav-link header__nav-link_active' : 'header__nav-link')}>
            Фильмы
          </NavLink>
        </li>
        <li className='header__nav-item'>
          <NavLink to='/saved-movies'
            className={({ isActive }) => (isActive ? 'header__nav-link header__nav-link_active' : 'header__nav-link')}>
            Сохраненные фильмы
          </NavLink>
        </li>
        <li className='header__nav-item'>
          <Link to='/profile' className='header__profile'>
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
