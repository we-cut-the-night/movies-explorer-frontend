import './FilterCheckbox.css';

function FilterCheckbox({ title, page, isShortMovie, onShortMovie }) {

  const handleClick = () => onShortMovie(page);

  return (
    <label className='filtercheckbox'>
      <input className='filtercheckbox_flag' type="checkbox" checked={isShortMovie} onChange={handleClick}/>
      <div className="filtercheckbox_tumb" />
      <p className='filtercheckbox_title'>{title}</p>
    </label>
  );
}

export default FilterCheckbox;
