import {openImgCard, openPopup, closePopup} from  '../components/modal.js'
import {renderLoading} from '../components/utils.js'


const deletePopup = document.querySelector(".popup-delete-card");
const popupDeleteCardButton = document.querySelector(".popup-delete-card__button");
let deletedCardId;
let deletedCardElement;

class Card {
  constructor(userInfo, addedCard, selector, api, handleCardClick){
    this._userInfo = userInfo;
    this._addedCard = addedCard;
    this._selector = selector;
    this.api = api;
    this.handleCardClick = handleCardClick;
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
    this._card.querySelector(".card__caption-text").textContent = this._addedCard.name;
    this._cardPhoto.src = this._addedCard.link;
    this._cardPhoto.alt = this._addedCard.name;
    this._setEventListeners();
    this._checklikes();
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


  // Функция обработки клика по иконке удаления
  _deleteCard(cardId, card, deletePopup) {
    renderLoading(true, popupDeleteCardButton);
    this.api.eraseCard(cardId)
      .then((res) => {
        card.remove();
        closePopup(deletePopup)
        console.log(res.message)
      })
      .catch(error => console.log(error))
      .finally(() => renderLoading(false, popupDeleteCardButton))
  }

  // Установка слушателей
  _setEventListeners(){
    this._cardLikeIcon.addEventListener("click", () => this._likeCard(this._addedCard["_id"], this._cardLikeIcon, this._cardLikeIconCounter));
    this._cardPhoto.addEventListener("click", openImgCard);

  //Слушатель кнопки подтверждения удалния карточки
    popupDeleteCardButton.addEventListener("click", () => {
      this._deleteCard(deletedCardId, deletedCardElement, deletePopup)
    })
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
    const deleteCardIcon = this._card.querySelector(".card__delete-icon");
    if(this._addedCard.owner['_id'] != this._userInfo['_id']){
      deleteCardIcon.remove()
    }
    deleteCardIcon.addEventListener("click", () => {
      openPopup(deletePopup)
      deletedCardId = this._addedCard["_id"];
      deletedCardElement = this._card;
    });
  }

}


export {Card}











