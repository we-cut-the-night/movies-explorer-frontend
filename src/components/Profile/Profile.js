import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile({ name, email }) {
  return (
    <div className='profile'>
      <Header loggedIn={false} />
      <main>
        <h1 className='profile__header'>Привет, {name}!</h1>
        <form className='profile__form'>
          <fieldset className='profile__fieldset'>
            <label htmlFor='name' className='profile__form-label'>Имя</label>
            <input id='name' name='name' type='email' className='profile__form-input' placeholder={name} required />
          </fieldset>
          <fieldset className='profile__fieldset'>
            <label htmlFor='email' className='profile__form-label'>E-mail</label>
            <input id='email' name='email' type='email' className='profile__form-input' placeholder={email} required />
          </fieldset>
          <div className='profile__buttons'>
            <button type='submit' className='profile__edit'>Редактировать</button>
            <Link to='/signin' className='profile__logout'>Выйти из аккаунта</Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Profile;
