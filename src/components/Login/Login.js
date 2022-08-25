import { Link } from 'react-router-dom';
import HeaderWelcome from '../HeaderWelcome/HeaderWelcome';

function Login({ welcome }) {
  return (
    <div className='register'>
      <HeaderWelcome welcome={ welcome } />
      <main>
        <form className='register__form'>
          <label htmlFor='email' className='register__form-label'>E-mail</label>
          <input id='email' name='email' type='email' className='register__form-input' placeholder='Email' required />
          <label htmlFor='password' className='register__form-label'>Пароль</label>
          <input id='password' name='password' type='password' className='register__form-input' placeholder='Пароль' required />
          <button type='submit' className='register__form-submit'>Войти</button>
        </form>
        <div className='register__signin'>
          <p className='register__signin-text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='register__signin-text register__signin-link'>Регистрация</Link>
        </div>
      </main>
    </div>
  );
}

export default Login;
