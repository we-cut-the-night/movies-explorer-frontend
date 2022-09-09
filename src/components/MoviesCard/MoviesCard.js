import './MoviesCard.css';

const MoviesCard = ({
  page,
  title,
  duration,
  src,
  trailer,
  isSaved,
  onSaveMovie,
  onDeleteMovie,
  movie
}) => {

  const calcDuration = (mm) => {
    return mm > 60 ?
      Math.floor(mm / 60) + 'ч' + (mm - 60) + 'м'
      : mm === 60 ? '1ч' : mm + 'м';
  };

  const handleSaveMovie = () => {
    const movieData = {
      movieId: movie.id,
      nameRU: movie.title ? movie.title : "-",
      nameEN: movie.titleEN ? movie.titleEN : "-",
      country: movie.country ? movie.country : "-",
      director: movie.director ? movie.director : "-",
      duration: movie.duration ? movie.duration : 0,
      description: movie.description ? movie.description : "-",
      year: movie.year ? movie.year : "-",
      image: movie.src ? movie.src : 'https://api.nomoreparties.co',
      trailerLink: movie.trailer ? movie.trailer : 'https://api.nomoreparties.co',
      thumbnail: movie.thumbnail ? movie.thumbnail : 'https://api.nomoreparties.co'
    };
    onSaveMovie(movieData);
  };
  const handleDeleteMovie = () => onDeleteMovie(movie.id);

  return (
    <article className="movie">
      <a className='movie__link' target='_blank' rel='noopener noreferrer' href={trailer}>
        <img className="movie__photo" src={src} alt={title} />
        <div className="movie__description">
          <div className="movie__caption">
            <h2 className="movie__title">{title}</h2>
          </div>
          <p className="movie__duration">{calcDuration(duration)}</p>
        </div>
      </a>
      {page === 'SavedMovies' ?
        <button
          className='movie__button-delete'
          onClick={handleDeleteMovie}
        /> :
        <button
          className={isSaved ? 'movie__save-button movie__save-button_active' : "movie__save-button"}
          onClick={isSaved ? handleDeleteMovie : handleSaveMovie}
        />
      }
    </article>
  );
};

export default MoviesCard;
