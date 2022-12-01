export default class Card {
  constructor(userInfo, addedCard, selector, api, handleCardClick, handleDeleteIconClick){
    this._userInfo = userInfo;
    this._addedCard = addedCard;
    this._selector = selector;
    this.api = api;
    this.handleCardClick = handleCardClick;
    this.handleDeleteIconClick = handleDeleteIconClick;
  }

  _getElement() {
    const template = document.querySelector(this._selector);
    return template.content.querySelector(".card").cloneNode(true);

  }
    createCard() {
    this._card = this._getElement();
    this._cardLikeIconCounter = this._card.querySelector(".card__like-icon-counter")
    this._cardLikeIconCounter.textContent = this._addedCard.likes.length;
    this._cardPhoto = this._card.querySelector(".card__photo");
    this._cardLikeIcon = this._card.querySelector(".card__like-icon");
    this._deleteCardIcon = this._card.querySelector(".card__delete-icon");
    this._card.querySelector(".card__caption-text").textContent = this._addedCard.name;
    this._cardPhoto.src = this._addedCard.link;
    this._cardPhoto.alt = this._addedCard.name;
    this._checklikes();
    this._setEventListeners();
    this._checkTrashIcon();
    return this._card;
  }

  // Функция обработки лайка карточки
  _likeCard(cardId, cardLikeIcon, cardLikeIconCounter) {
    if (cardLikeIcon.classList.contains("card_liked")){
      this.api.deleteLike(cardId)
        .then((res) => {
          cardLikeIconCounter.textContent = res.likes.length;
          cardLikeIcon.classList.toggle("card_liked");
        })
        .catch(error => console.log(error))
    }
    else {
      this.api.setLike(cardId)
        .then((res) => {
          cardLikeIconCounter.textContent = res.likes.length;
          cardLikeIcon.classList.toggle("card_liked");
        })
        .catch(error => console.log(error))
    }
  }

  // Установка слушателей
  _setEventListeners(){
    this._cardLikeIcon.addEventListener("click", () => this._likeCard(this._addedCard["_id"], this._cardLikeIcon, this._cardLikeIconCounter));
    this._cardPhoto.addEventListener("click", this.handleCardClick);
    this._deleteCardIcon.addEventListener("click", () => this.handleDeleteIconClick(this._addedCard["_id"], this._card));
  }

  //Проверка лайка
  _checklikes(){
    this._addedCard.likes.forEach((like) => {
      if(like["_id"] === this._userInfo['_id']){
        this._cardLikeIcon.classList.add('card_liked');
      }
    })
  }

  //Удаление иконки корзины с чужой карточки
  _checkTrashIcon(){
    if(this._addedCard.owner['_id'] != this._userInfo['_id']){
      this._deleteCardIcon.remove()
    }
  }
}











