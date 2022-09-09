import { useState, useContext } from 'react';
import Header from '../Header/Header';
import './Profile.css';
import { regex } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Profile({ loggedIn, onSubmit, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(true);

  const handleChangeName = (e) => {
    setUserName(e.target.value);
    setNameIsValid(e.target.value.length > 0);
  };

  const handleChangeEmail = (e) => {
    setUserEmail(e.target.value);
    setEmailIsValid(regex.test(e.target.value.toLowerCase()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailIsValid && nameIsValid &&
    onSubmit(userName, userEmail);
  };

  return (
    <div className='profile'>
      <Header loggedIn={loggedIn} />
      <main className='profile__main'>
        <h1 className='profile__header'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <fieldset className='profile__fieldset'>
            <label htmlFor='name' className='profile__form-label'>Имя</label>
            <input
              id='name'
              name='name'
              type='text'
              className='profile__form-input'
              placeholder={userName}
              value={typeof userName === 'undefined' ? '' : userName}
              onChange={handleChangeName}
              required
            />
          </fieldset>
          <fieldset className='profile__fieldset'>
            <label htmlFor='email' className='profile__form-label'>E-mail</label>
            <input
              id='email'
              name='email'
              type='email'
              className='profile__form-input'
              placeholder={userEmail}
              value={typeof userEmail === 'undefined' ? '' : userEmail}
              onChange={handleChangeEmail}
              required
            />
          </fieldset>
          <div className='profile__buttons'>
            <button
              type='submit'
              className={emailIsValid && nameIsValid ? 'profile__edit' : 'profile__edit profile__edit_disabled'}
            >
              Редактировать
            </button>
          </div>
        </form>
        <button className='profile__logout' onClick={onLogout}>Выйти из аккаунта</button>
      </main>
    </div>
  );
}

export default Profile;
