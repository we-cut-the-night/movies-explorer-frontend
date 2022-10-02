import { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardlist from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

const Movies = ({
  loggedIn,
  movies,
  moviesSaved,
  search,
  setSearchQuery,
  handleFormSubmit,
  moviesShown,
  pageCapacity,
  handleCardButtonClick,
  isShortMovie,
  onShortMovie,
  onSaveMovie,
  onDeleteMovie,
  isLoading,
  searchError,
  resetMovies
}) => {

  useEffect(() => resetMovies(), []);

  return (
    <div className='movies'>
      <div>
        <Header loggedIn={loggedIn} />
        <main>
          <SearchForm
            page='Movies'
            search={search}
            setSearchQuery={setSearchQuery}
            handleFormSubmit={handleFormSubmit}
            isShortMovie={isShortMovie}
            onShortMovie={onShortMovie}
          />
          {
            isLoading && <Preloader />
          }
          {
            !isLoading && searchError && (<p className='movies__found-nothing'>{searchError}</p>)
          }
          {
            !isLoading && !searchError && moviesShown > 0 && movies && movies.length > 0 &&
            (<MoviesCardlist
              page='Movies'
              movies={movies}
              moviesSaved={moviesSaved}
              moviesShown={moviesShown}
              pageCapacity={pageCapacity}
              handleCardButtonClick={handleCardButtonClick}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
            />)
          }
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
