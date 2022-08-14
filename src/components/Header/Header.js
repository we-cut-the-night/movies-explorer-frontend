import headerLogo from '../../images/header-logo.png';

function Header() {
  return (
    <>
      <img src={headerLogo} alt='Лого' />
      <button>Регистрация</button>
      <button>Войти</button>
    </>
  );
};

export default Header;
