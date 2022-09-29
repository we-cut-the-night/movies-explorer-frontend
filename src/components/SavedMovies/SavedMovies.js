import { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardlist from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

const SavedMovies = ({
  loggedIn,
  movies,
  moviesSaved,
  search,
  setSearchQuery,
  isShortMovie,
  moviesShown,
  pageCapacity,
  handleFormSubmit,
  onShortMovie,
  onDeleteMovie,
  isLoading,
  searchErrorSaved,
  resetSavedMovies
}) => {

  useEffect(() => {
    resetSavedMovies();
  }, []);

  return (
    <div className='saved-movies'>
      <div>
        <Header loggedIn={loggedIn} />
        <main>
          <SearchForm
            page='SavedMovies'
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
            !isLoading && searchErrorSaved && (<p className='movies__found-nothing'>{searchErrorSaved}</p>)
          }
          {
            !isLoading && !searchErrorSaved && movies.length > 0 &&
            (<MoviesCardlist
              page='SavedMovies'
              movies={movies}
              moviesSaved={moviesSaved}
              moviesShown={moviesShown}
              pageCapacity={pageCapacity}
              onDeleteMovie={onDeleteMovie}
            />)
          }
          {
            !isLoading && movies.length === 0 && (<p className='saved-movies__found-nothing'>Ничего не найдено</p>)
          }
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SavedMovies;
