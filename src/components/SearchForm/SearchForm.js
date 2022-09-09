import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({ page, search, setSearchQuery, handleFormSubmit, isShortMovie, onShortMovie }) => {

  const handleSubmit = (e) => handleFormSubmit(e, page);

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit}>
        <button className="search__button search__button_position_left" />
        <input
          className='search__input'
          type='text'
          value={search}
          onChange={ e => setSearchQuery(e.target.value)}
          placeholder='Фильм'
          required
        />
        <button className='search__button' />
      </form>
      <FilterCheckbox title='Короткометражки' page={page} isShortMovie={isShortMovie} onShortMovie={onShortMovie} />
    </section>
  );
};

export default SearchForm;
