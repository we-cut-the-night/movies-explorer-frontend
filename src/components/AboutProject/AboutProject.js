import './AboutProject.css';
import MainPageFrame from '../MainPageFrame/MainPageFrame';

function AboutProject() {
  return (
    <MainPageFrame title='О проекте'>
      <ul className="about__items">
        <li className="about__item">
          <h3 className="about__item-title">Дипломный проект включал 5 этапов</h3>
          <p className="about__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about__item">
          <h3 className="about__item-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <article className="about__diagram">
        <div className="about__diagram-time about__diagram-time_short">
          <p className="about__diagram-time-text about__diagram-time-text_dark">1 неделя</p>
          <p>Back-end</p>
        </div>
        <div className="about__diagram-time">
          <p className="about__diagram-time-text">4 недели</p>
          <p>Front-end</p>
        </div>
      </article>
    </MainPageFrame>
  );
};

export default AboutProject;
