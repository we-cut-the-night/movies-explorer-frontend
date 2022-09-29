import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Profile({ loggedIn, onSubmit, onLogout, message }) {
  const currentUser = useContext(CurrentUserContext);
  const [isActive, setIsActive] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isValid }, getValues, clearErrors } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });

  const checkForm = () => {
    const name = getValues('name');
    const email = getValues('email');

    if (!name || !email) return;
    if (name !== currentUser.name || email !== currentUser.email) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSubmitForm = () => {
    const name = getValues('name');
    const email = getValues('email');

    onSubmit(name, email);
    reset();
  };

  const handleValidation = () => {
    const name = getValues('name');
    const email = getValues('email');

    if (name !== currentUser.name || email !== currentUser.email) {
      clearErrors('name');
      clearErrors('email');
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    checkForm();
  });

  return (
    <div className='profile'>
      <Header loggedIn={loggedIn} />
      <main className='profile__main'>
        <h1 className='profile__header'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit(handleSubmitForm)}>
          <fieldset className='profile__fieldset'>
            <label htmlFor='name' className='profile__form-label'>Имя</label>
            <input
              id='name'
              name='name'
              type='text'
              className='profile__form-input'
              placeholder='Ваше имя'
              onChange={checkForm}
              {...register('name', {
                required: 'Необходимо ввести имя',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать не менее 2 символов',
                },
                maxLength: {
                  value: 30,
                  message: 'Имя должно содержать не более 30 символов',
                },
                validate: handleValidation,
              })}
            />
            {errors?.name && (<span className='profile__error'>{errors?.name?.message}</span>)}
          </fieldset>
          <fieldset className='profile__fieldset'>
            <label htmlFor='email' className='profile__form-label'>E-mail</label>
            <input
              id='email'
              name='email'
              type='email'
              className='profile__form-input'
              placeholder='Email'
              {...register('email', {
                required: 'Необходимо ввести email',
                pattern: {
                  value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                  message: 'Введен некорректный email',
                },
              })}
            />
            {errors?.email && (<span className='profile__error'>{errors?.email?.message}</span>)}
          </fieldset>
          <div className='profile__message'>{message}</div>
          <div className='profile__buttons'>
            <button
              type='submit'
              className={isValid && isActive ? 'profile__edit' : 'profile__edit profile__edit_disabled'}
              disabled={isValid && isActive ? false : true}
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
