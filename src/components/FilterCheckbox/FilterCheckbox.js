import './FilterCheckbox.css';

function FilterCheckbox({ title }) {
  return (
    <label className='filtercheckbox'>
      <input className='filtercheckbox_flag' type="checkbox" />
      <div className="filtercheckbox_tumb" />
      <p className='filtercheckbox_title'>{title}</p>
    </label>
  );
}

export default FilterCheckbox;
