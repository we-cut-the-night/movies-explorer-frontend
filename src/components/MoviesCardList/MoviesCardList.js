import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardlist = ({ page, isLoading, movies, moviesShown, pageCapacity, handleCardButtonClick }) => {
  return (
    <section className='movies-card'>
      {/* {console.log(movies)} */}
      <div className='movies-card__list'>
        {
          movies && movies
            .filter((movie, i) => { return i < moviesShown })
            .map(movie => <MoviesCard key={movie.id} page={page} isSaved={false} {...movie} />)
        }
      </div>
      {page === 'Movies' && <button className='movies-card__button' onClick={handleCardButtonClick}>Еще</button>}
    </section>
  );
};

export default MoviesCardlist;
