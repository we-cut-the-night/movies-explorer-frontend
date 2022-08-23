import { Link } from 'react-router-dom';
import './Header.css';
import headerLogo from '../../images/header-logo.svg';

function Header() {
  return (
    <header className='header'>
      <Link to='/'><img className='header__logo' src={headerLogo} alt='Логотип' /></Link>
      <nav className='header__navigation'>
        <Link className='header__navigation-button' to='/signup'>Регистрация</Link>
        <Link className='header__navigation-button header__navigation-button_dark'  to='/signin'>Войти</Link>
      </nav>
    </header>
  );
};

export default Header;
