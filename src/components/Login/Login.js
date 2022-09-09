import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderWelcome from '../HeaderWelcome/HeaderWelcome';
import '../Register/Register.css';

function Login({ welcome, onSubmit }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePass = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className='register'>
      <HeaderWelcome welcome={welcome} />
      <main className='register__main'>
        <form className='register__form' onSubmit={handleSubmit}>
          <label htmlFor='email' className='register__form-label'>E-mail</label>
          <input
            id='email'
            name='email'
            type='email'
            className='register__form-input'
            placeholder='Email'
            onChange={handleChangeEmail}
            value={typeof email === 'undefined' ? '' : email}
            required
          />
          <label htmlFor='password' className='register__form-label'>Пароль</label>
          <input
            id='password'
            name='password'
            type='password'
            className='register__form-input'
            placeholder='Пароль'
            onChange={handleChangePass}
            value={typeof password === 'undefined' ? '' : password}
            required
          />
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
