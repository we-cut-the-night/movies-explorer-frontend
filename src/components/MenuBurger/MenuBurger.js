import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import closeIcon from '../../images/close-icon.svg';
import burgerIcon from '../../images/burger-icon.svg';
import './MenuBurger.css';

function MenuBurger() {
  const [navIsActive, SetNavIsActive] = useState(false);

  function handleNavClick() {
    SetNavIsActive(!navIsActive);
  }

  return (
    <>
      <img className='burger__button' src={burgerIcon} onClick={handleNavClick} alt='Открыть меню' />
      <div className={navIsActive ? 'burger-menu__bg' : 'burger-menu__bg_closed'}>
        <div className={navIsActive ? 'burger-menu' : 'burger-menu burger-menu_closed'}>
          <img src={closeIcon} className='burger-menu__close' onClick={handleNavClick} alt='Закрыть меню' />
          <nav className="mobile-menu">
            <ul className='mobile-menu__list'>
              <li className='burger-menu__item'>
                <NavLink to='/'
                  className={({ isActive }) => (isActive ? 'burger-menu__link burger-menu__link_active' : 'burger-menu__link')}>
                  Главная
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <NavLink to='/movies'
                  className={({ isActive }) => (isActive ? 'burger-menu__link burger-menu__link_active' : 'burger-menu__link')}>
                  Фильмы
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <NavLink to='/saved-movies'
                  className={({ isActive }) => (isActive ? 'burger-menu__link burger-menu__link_active' : 'burger-menu__link')}>
                  Сохраненные фильмы
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <Link to='/profile' className='burger-menu__profile'>
                  Аккаунт
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default MenuBurger;
