import { BASE_URL_MAIN } from '../utils/constants';

const checkResponse = (res) => { // обработка ответа API
  if (res.ok) {
    return res.json();
  }

  return res.json()
    .then((data) => {
      throw new Error(data.message);
    });
};

export const getUserData = (token) => { // проверить токен, получить email
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
