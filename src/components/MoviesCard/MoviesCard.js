import './MoviesCard.css';

const MoviesCard = ({ src, isSaved, page }) => {
  return (
    <article className="movie">
      <img className="movie__photo" src={src} alt="33 слова о дизайне" />
      <div className="movie__description">
        <div className="movie__caption">
          <h2 className="movie__title">33 слова о дизайне</h2>
          {page === 'SavedMovies' ?
            <button className='movie__button-delete' />
            : <button className={isSaved ? 'movie__save-button movie__save-button_active' : "movie__save-button"} />
          }
        </div>
        <p className="movie__duration">1ч42м</p>
      </div>
    </article>
  );
};

export default MoviesCard;
