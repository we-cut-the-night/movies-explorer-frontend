import HeaderWelcome from '../HeaderWelcome/HeaderWelcome';
import { Link } from 'react-router-dom';
import './Register.css'

function Register({ welcome }) {
  return (
    <div className='register'>
      <HeaderWelcome welcome={ welcome } />
      <main className='register__main'>
        <form className='register__form'>
          <label htmlFor='name' className='register__form-label'>Имя</label>
          <input id='name' name='name' type='text' className='register__form-input' placeholder='Ваше имя' required />
          <label htmlFor='email' className='register__form-label'>E-mail</label>
          <input id='email' name='email' type='email' className='register__form-input' placeholder='Email' required />
          <label htmlFor='password' className='register__form-label'>Пароль</label>
          <input id='password' name='password' type='password' className='register__form-input' placeholder='Пароль' required />
          <button type='submit' className='register__form-submit'>Зарегистрироваться</button>
        </form>
        <div className='register__signin'>
          <p className='register__signin-text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='register__signin-link'>Войти</Link>
        </div>
      </main>
    </div>
  );
}

export default Register;
