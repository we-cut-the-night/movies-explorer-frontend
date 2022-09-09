import { BASE_URL_MOVIES } from '../utils/constants';

const checkResponse = (res) => { // обработка ответа API
  if (res.ok) {
    return res.json();
  }

  return res.json()
    .then((data) => {
      throw new Error(data.message);
    });
};

export const getMoviesData = () => { // получить список фильмов
  return fetch(`${BASE_URL_MOVIES}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
};
