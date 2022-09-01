import './MoviesCard.css';
import { BASE_URL } from '../../utils/constants';

const calcDuration = (mm) => {
  if (mm > 60) {
    return Math.floor(mm / 60) + 'ч' + (mm - 60) + 'м';
  } else if (mm === 60) {
    return '1ч';
  } else {
    return mm + 'м';
  }
};

const MoviesCard = ({ src, title, duration, isSaved, page }) => {
  return (
    <article className="movie">
      <img className="movie__photo" src={`${BASE_URL}${src}`} alt={title} />
      <div className="movie__description">
        <div className="movie__caption">
          <h2 className="movie__title">{title}</h2>
          {page === 'SavedMovies' ?
            <button className='movie__button-delete' />
            : <button className={isSaved ? 'movie__save-button movie__save-button_active' : "movie__save-button"} />
          }
        </div>
        <p className="movie__duration">{calcDuration(duration)}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
