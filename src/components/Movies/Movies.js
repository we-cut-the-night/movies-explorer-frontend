import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardlist from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({
  loggedIn,
  isLoading,
  movies,
  search,
  setSearchQuery,
  handleFormSubmit,
  moviesShown,
  pageCapacity,
  handleCardButtonClick
}) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm
          search={search}
          setSearchQuery={setSearchQuery}
          handleFormSubmit={handleFormSubmit}
        />
        <MoviesCardlist
          page='Movies'
          isLoading={isLoading}
          movies={movies}
          moviesShown={moviesShown}
          pageCapacity={pageCapacity}
          handleCardButtonClick={handleCardButtonClick}
        />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
