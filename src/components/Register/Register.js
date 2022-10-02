import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import HeaderWelcome from '../HeaderWelcome/HeaderWelcome';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'

function Register({ welcome, onSubmit, message }) {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isValid }, } = useForm({ mode: 'all' },);

  const handleSubmitForm = ({ name, email, password }) => {
    onSubmit({ name, email, password });
    reset();
  };

  useEffect(() => {
    localStorage.getItem('jwt') && navigate('/')
  }, []);

  return (
    <div className='register'>
      <HeaderWelcome welcome={welcome} />
      <main className='register__main'>
        <form className='register__form' onSubmit={handleSubmit(handleSubmitForm)}>
          <fieldset className='register__field'>
            <label htmlFor='name' className='register__form-label'>Имя</label>
            <input
              id='name'
              name='name'
              type='text'
              className='register__form-input'
              placeholder='Ваше имя'
              {...register('name', {
                required: 'Необходимо ввести логин',
                minLength: {
                  value: 2,
                  message: 'Логин должен содержать не менее 2 символов',
                },
                maxLength: {
                  value: 30,
                  message: 'Логин должен содержать не более 30 символов',
                },
              })}
            />
            {errors?.name && (<span className='register__error'>{errors?.name?.message}</span>)}
          </fieldset>
          <fieldset className='register__field'>
            <label htmlFor='email' className='register__form-label'>E-mail</label>
            <input
              id='email'
              name='email'
              type='email'
              className='register__form-input'
              placeholder='Email'
              {...register('email', {
                required: 'Необходимо ввести email',
                pattern: {
                  value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                  message: 'Введен некорректный email',
                },
              })}
            />
            {errors?.email && (<span className='register__error'>{errors?.email?.message}</span>)}
          </fieldset>
          <fieldset className='register__field'>
            <label htmlFor='password' className='register__form-label'>Пароль</label>
            <input
              id='password'
              name='password'
              type='password'
              className='register__form-input'
              placeholder='Пароль'
              {...register('password', {
                required: 'Необходимо ввести пароль',
              })}
            />
            {errors?.password && (<span className='register__error'>{errors?.password?.message}</span>)}
          </fieldset>
          <button
            type='submit'
            className={`${isValid ? 'register__form-submit' : 'register__form-submit register__form-submit_disabled'}`}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className='register__signin'>
          <p className='register__signin-text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='register__signin-link'>Войти</Link>
        </div>
        <div className='register__message'>{message}</div>
      </main>
    </div>
  );
}

export default Register;
