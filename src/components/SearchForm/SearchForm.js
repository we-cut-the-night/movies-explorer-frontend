import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({ search, setSearchQuery, handleFormSubmit }) => {

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleFormSubmit}>
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
      <FilterCheckbox title='Короткометражки' />
    </section>
  );
};

export default SearchForm;
