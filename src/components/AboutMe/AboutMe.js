import './AboutMe.css';
import MainPageFrame from '../MainPageFrame/MainPageFrame';
import Portfolio from '../Portfolio/Portfolio';
import profilePhoto from '../../images/profile-photo.jpg';

function AboutMe() {
  return (
    <MainPageFrame title='Студент'>
      <div className='about'>
        <div className='about__profile'>
          <div>
            <h3 className='about__profile-title'>Артём</h3>
            <p className='about__profile-subtitle'>Разработчик Oracle, 33 года</p>
            <p className='about__profile-info'>
              Я родился в городе Кургане, живу в Екатеринбурге. Работал бариста, оператором контактного центра, бизнес-аналитиком.
              Сейчас занимаюсь разработкой модулей базы данных Oracle для внутреннего сервиса корпоративной аналитики в российском банке.
              Занимаюсь функциональным тренингом, люблю разнообразную кухню, хороший кофе, путешествия.
              Увлекаюсь веб-разработкой, учусь на веб-факультете в 'Яндекс.Практикум'.
            </p>
          </div>
          <ul className='about__profile-links'>
            <li><a className='about__profile-link' target='_blank' rel='noreferrer noopener' href='https://facebook.com/artyomjesman'>
              Facebook
            </a></li>
            <li><a className='about__profile-link' target='_blank' rel='noreferrer noopener' href='https://github.com/we-cut-the-night'>
              Github
            </a></li>
          </ul>
        </div>
        <img className='about__profile-photo' src={profilePhoto} alt='Фото профиля' />
      </div>
      <Portfolio />
    </MainPageFrame>
  );
};

export default AboutMe;
