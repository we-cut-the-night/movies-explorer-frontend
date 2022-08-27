import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import './HeaderWelcome.css'

function HeaderWelcome({ welcome }) {
  return (
    <header className='header-welcome'>
      <Link to='/'>
        <img className='header-welcome__logo' src={headerLogo} alt='Логотип' />
      </Link>
      <h1 className='header-welcome__text'>{welcome}</h1>
    </header>
  );
};

export default HeaderWelcome;
