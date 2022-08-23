import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__items'>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' rel='noreferrer noopener' href='https://github.com/we-cut-the-night/how-to-learn'>
            <p className='portfolio__item-name'>Статичный сайт</p>
            <p className='portfolio__item-name'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' rel='noreferrer noopener' href='https://github.com/we-cut-the-night/russian-travel'>
            <p className='portfolio__item-name'>Адаптивный сайт</p>
            <p className='portfolio__item-name'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' rel='noreferrer noopener' href='https://github.com/we-cut-the-night/react-mesto-api-full'>
            <p className='portfolio__item-name'>Одностраничное приложение</p>
            <p className='portfolio__item-name'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
