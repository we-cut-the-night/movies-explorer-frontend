import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import cardScate from '../../images/card_skate.jpg';
import cardCar from '../../images/card_car.jpg';
import cardGlasses from '../../images/card_glasses.jpg';
import cardRoom from '../../images/card_old_room.jpg';

const MoviesCardlist = ({ page }) => {
  return (
    <section className='movies-card'>
      <div className='movies-card__list'>
        <MoviesCard src={cardScate} isSaved={false} page={ page } />
        <MoviesCard src={cardCar} isSaved={false} page={ page } />
        <MoviesCard src={cardGlasses} isSaved={true}  page={ page } />
        <MoviesCard src={cardRoom} isSaved={false} page={ page } />
      </div>
      {page === 'Movies' && <button className='movies-card__button'>Еще</button>}
    </section>
  );
};

export default MoviesCardlist;
