import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import HeaderWelcome from '../HeaderWelcome/HeaderWelcome';
import '../Register/Register.css';

function Login({ welcome, onSubmit, message }) {
  const { register, handleSubmit, reset, formState: { errors, isValid }, } = useForm({ mode: 'all' },);

  const handleSubmitForm = ({ email, password }) => {
    onSubmit({ email, password });
    reset();
  };

  return (
    <div className='register'>
      <HeaderWelcome welcome={welcome} />
      <main className='register__main'>
        <form className='register__form' onSubmit={handleSubmit(handleSubmitForm)}>
          <fieldset className='register__field'>
            <label htmlFor='email' className='register__form-label'>E-mail</label>
            <input
              id='email'
              name='email'
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
            Войти
          </button>
        </form>
        <div className='register__signin'>
          <p className='register__signin-text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='register__signin-text register__signin-link'>Регистрация</Link>
        </div>
        <div className='register__message'>{message}</div>
      </main>
    </div>
  );
}

export default Login;
