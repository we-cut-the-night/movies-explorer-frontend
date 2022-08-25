import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import MenuBurger from '../MenuBurger/MenuBurger';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ loggedIn }) {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={headerLogo} alt='Логотип' />
      </Link>
      {loggedIn ?
        <div>
          <Navigation />
          <MenuBurger />
        </div>
        :
        <nav className='header__navigation'>
          <Link className='header__navigation-button' to='/signup'>Регистрация</Link>
          <Link className='header__navigation-button header__navigation-button_dark' to='/signin'>Войти</Link>
        </nav>
      }
    </header>
  );
};

export default Header;
