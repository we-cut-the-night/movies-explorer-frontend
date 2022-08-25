import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <section className='search'>
      <form className='search__form'>
        <button className="search__button search__button_position_left" />
        <input className='search__input' placeholder='Фильм' required />
        <button className='search__button' />
      </form>
      <FilterCheckbox title='Короткометражки'/>
    </section>
  );
};

export default SearchForm;
