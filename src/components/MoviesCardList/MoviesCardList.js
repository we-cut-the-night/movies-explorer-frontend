import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardlist = ({
  page,
  movies,
  moviesSaved,
  moviesShown,
  pageCapacity,
  handleCardButtonClick,
  onSaveMovie,
  onDeleteMovie
}) => {
  return (
    <section className='movies-card'>
      <div className='movies-card__list'>
        {movies
          .filter((movie, i) => { return page === 'SavedMovies' ? true : i < moviesShown })
          .map(movie =>
            <MoviesCard
              key={movie.id}
              page={page}
              isSaved={moviesSaved.find((movieSaved) => movieSaved.id === movie.id)}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              movie={movie}
              {...movie}
            />)
        }
      </div>
      {page === 'Movies' &&
        movies.length > pageCapacity && moviesShown < movies.length &&
        <button className='movies-card__button' onClick={handleCardButtonClick}>Еще</button>}
    </section>
  );
};

export default MoviesCardlist;
