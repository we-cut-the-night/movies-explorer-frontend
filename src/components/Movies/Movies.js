import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardlist from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm />
        <MoviesCardlist page='Movies'/>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
