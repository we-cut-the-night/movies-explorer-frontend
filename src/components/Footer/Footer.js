import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <nav className='footer__content'>
        <p className="footer__copy">&copy;{new Date().getFullYear()}</p>
        <ul className='footer__links'>
          <li className='footer__item'>
            <a className='footer__link'
              target='_blank' rel='noopener noreferrer' href='https://praktikum.yandex.ru/'>Яндекс.Практикум</a>
          </li>
          <li className='footer__item'>
            <a className='footer__link'
              target='_blank' rel='noopener noreferrer' href='https://github.com/yandex-praktikum'>Github</a>
          </li>
          <li className='footer__item'>
            <a className='footer__link'
              target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/yandex.practicum'>Facebook</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
