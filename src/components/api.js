const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: 'd9e55aed-7d90-42ef-807f-b764eb7d2a2e',
    'Content-Type': 'application/json'
  },
}

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  else {
  return Promise.reject(`Ошибка: ${res.status}`);
  }
}

 const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers})
    .then(checkResponse)
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers})
    .then(checkResponse)
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
  .then(checkResponse)
}

const updateUserAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url

    })
  })
  .then(checkResponse)
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
  .then(checkResponse)
}

const eraseCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers})
    .then(checkResponse)
}

const setLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers})
    .then(checkResponse)
}

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers})
    .then(checkResponse)
}

export{getInitialCards, getUserInfo, updateUserInfo, addNewCard, setLike, deleteLike, eraseCard, updateUserAvatar}


