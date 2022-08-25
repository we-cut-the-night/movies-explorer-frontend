import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardlist from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

const SavedMovies = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={ loggedIn } />
      <main>
        <SearchForm />
        <MoviesCardlist page='SavedMovies'/>
      </main>
      <Footer />
    </>

  );
};

export default SavedMovies;
