class Api {
  constructor(config){
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    else {
    return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers})
      .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers})
      .then(this._checkResponse)
  }

  updateUserInfo(name, job) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(this._checkResponse)
  }

  updateUserAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url

      })
    })
    .then(this._checkResponse)
  }

  addNewCard(link, name) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        link: link,
        name: name
      })
    })
    .then(this._checkResponse)
  }

  eraseCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers})
      .then(this._checkResponse)
  }

  setLike(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers})
      .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers})
      .then(this._checkResponse)
  }

}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: 'd9e55aed-7d90-42ef-807f-b764eb7d2a2e',
    'Content-Type': 'application/json'
  }
});

export{api}


