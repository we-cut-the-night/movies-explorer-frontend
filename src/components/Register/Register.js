import { useState } from 'react';
import HeaderWelcome from '../HeaderWelcome/HeaderWelcome';
import { Link } from 'react-router-dom';
import './Register.css'

function Register({ welcome, onSubmit }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePass = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <div className='register'>
      <HeaderWelcome welcome={ welcome } />
      <main className='register__main'>
        <form className='register__form' onSubmit={handleSubmit}>
          <label htmlFor='name' className='register__form-label'>Имя</label>
          <input
            id='name'
            name='name'
            type='text'
            className='register__form-input'
            placeholder='Ваше имя'
            onChange={handleChangeName}
            value={typeof name === 'undefined' ? '' : name}
            required
          />
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
