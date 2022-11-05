const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: 'd9e55aed-7d90-42ef-807f-b764eb7d2a2e',
    'Content-Type': 'application/json'
  }
}

 const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}

const updateUserInfo = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}

const updateUserAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url

    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}


const addNewCard = (link, name) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      link: link,
      name: name
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}

const eraseCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}

const setLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}


export{getInitialCards, getUserInfo, updateUserInfo, addNewCard, setLike, deleteLike, eraseCard, updateUserAvatar}


