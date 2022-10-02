import { BASE_URL_MAIN } from '../utils/constants';

// обработка ответа API
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json()
    .then((data) => {
      throw new Error(data.message);
    });
};

// регистрация
export const signup = (name, email, password) => {
  return fetch(`${BASE_URL_MAIN}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  })
    .then(checkResponse);
};

// авторизация
export const signin = (email, password) => {
  return fetch(`${BASE_URL_MAIN}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse);
};

// проверить токен, получить email
export const getUserData = (token) => {
  return fetch(`${BASE_URL_MAIN}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include'
  })
    .then(checkResponse)
};

// редактирование профиля
export const editUserData = (name, email, token) => {
  return fetch(`${BASE_URL_MAIN}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify({ name, email }),
  })
    .then(checkResponse);
};

// получить список сохраненных фильмов
export const getSavedMoviesData = (token) => {
  return fetch(`${BASE_URL_MAIN}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include'
  })
    .then(checkResponse)
};

// добавить в список сохраненных фильмов
export const saveMovie = (movie, token) => {
  return fetch(`${BASE_URL_MAIN}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify(movie),
  })
    .then(checkResponse)
};

// удалить из сохраненных фильмов
export const deleteMovie = (movieId, token) => {
  return fetch(`${BASE_URL_MAIN}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
  })
    .then(checkResponse);
};
