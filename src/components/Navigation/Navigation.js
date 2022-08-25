import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  let activeStyle = {
    paddingBottom: '4px',
    borderBottom: 'solid 2px white',
  };

  return (
    <nav className="header__login">
      <ul className='header__nav-login'>
        <li className='header__nav-item'>
          <NavLink to='/' className='header__nav-link' style={({ isActive }) => isActive ? activeStyle : undefined}>
            Главная
          </NavLink>
        </li>
        <li className='header__nav-item'>
          <NavLink to='/movies' className='header__nav-link' style={({ isActive }) => isActive ? activeStyle : undefined}>
            Фильмы
          </NavLink>
        </li>
        <li className='header__nav-item'>
          <NavLink to='/saved-movies' className='header__nav-link' style={({ isActive }) => isActive ? activeStyle : undefined}>
            Сохраненные фильмы
          </NavLink>
        </li>
        <li className='header__nav-item'>
          <Link to='/profile' className='header__profile'>
            <p>Аккаунт</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
