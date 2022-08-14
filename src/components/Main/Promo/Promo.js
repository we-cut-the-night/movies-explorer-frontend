import landingLogo from '../../../images/landing-logo.svg';

function Promo() {
  return (
    <>
      <h1>Учебный проект студента факультета Веб-разработки.</h1>
      <img src={landingLogo} alt='Лого' />
      <h2>О проекте</h2>
      <article>
        <h3>Дипломный проект включал 5 этапов</h3>
        <p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </article>
      <article>
        <h3>На выполнение диплома ушло 5 недель</h3>
        <p>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </article>
      <article>
        <div>1 неделя</div>
        <p>Back-end</p>
      </article>
      <article>
        <div>4 недели</div>
        <p>Front-end</p>
      </article>
    </>
  );
};

export default Promo;
