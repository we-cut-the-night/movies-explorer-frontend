import { useState } from 'react';
import closeIcon from '../../images/close-icon.svg';
import burgerIcon from '../../images/burger-icon.svg';
import './MenuBurger.css';
import Navigation from '../Navigation/Navigation';

function MenuBurger() {
  const [navIsActive, SetNavIsActive] = useState(false);

  function handleNavClick() {
    SetNavIsActive(!navIsActive);
  }

  return (
    <>
      <img className="header__login-open" src={burgerIcon} onClick={handleNavClick} alt="Открыть меню" />
      <div className={navIsActive ? "mobile-menu__bg" : "mobile-menu__bg_closed"}>
        <div className={navIsActive ? "mobile-menu" : "mobile-menu mobile-menu_closed"}>
          <img src={closeIcon} className="mobile-menu__close" onClick={handleNavClick} alt="закрыть меню" />
          <Navigation />
        </div>
      </div>
    </>
  );
}

export default MenuBurger;
