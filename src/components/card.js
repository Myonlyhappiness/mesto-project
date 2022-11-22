import {openImgCard, openPopup, closePopup} from  '../components/modal.js'
import {api} from '../components/api.js'
import {renderLoading} from '../components/utils'

const cards = document.querySelector(".cards");
const template = document.querySelector("#element").content;
const deletePopup = document.querySelector(".popup-delete-card");
const popupDeleteCardButton = document.querySelector(".popup-delete-card__button");
let deletedCardId
let deletedCardElement

//Слушатель кнопки подтверждения удалния карточки
popupDeleteCardButton.addEventListener("click", () => {
  deleteCard(deletedCardId, deletedCardElement, deletePopup)
})

// Создание карточки
function createCard(userInfo, addedCard) {
  const card = template.querySelector(".card").cloneNode(true);
  const cardPhoto = card.querySelector(".card__photo");
  const deleteCardIcon = card.querySelector(".card__delete-icon");
  const cardLikeIcon = card.querySelector(".card__like-icon");
  const cardLikeIconCounter = card.querySelector(".card__like-icon-counter")
  cardLikeIconCounter.textContent = addedCard.likes.length;
  cardPhoto.src = addedCard.link;
  cardPhoto.alt = addedCard.name;
  card.querySelector(".card__caption-text").textContent = addedCard.name;
  cardLikeIcon.addEventListener("click", () => likeCard(addedCard["_id"], cardLikeIcon, cardLikeIconCounter));
  cardPhoto.addEventListener("click", openImgCard);
  //Проверка лайка
  addedCard.likes.forEach((like) => {
    if(like["_id"] === userInfo['_id']){
      cardLikeIcon.classList.add('card_liked');
  }
  })
  //Удаление иконки корзины с чужой карточки
   if(addedCard.owner['_id'] != userInfo['_id']){
    deleteCardIcon.remove()
   }
   deleteCardIcon.addEventListener("click", () => {
    openPopup(deletePopup)
    deletedCardId = addedCard["_id"];
    deletedCardElement = card;
  });

  return card;
}



// Функция обработки лайка карточки
function likeCard(cardId, cardLikeIcon, cardLikeIconCounter) {
  if (cardLikeIcon.classList.contains("card_liked")){
    deleteLike(cardId)
    .then((res) => {
      cardLikeIconCounter.textContent = res.likes.length;
      cardLikeIcon.classList.toggle("card_liked");
    })
    .catch(error => console.log(error))
  }
else {
  setLike(cardId)
    .then((res) => {
      cardLikeIconCounter.textContent = res.likes.length;
      cardLikeIcon.classList.toggle("card_liked");
    })
    .catch(error => console.log(error))
  }
}

// Функция обработки клика по иконке удаления
function deleteCard(cardId, card, deletePopup) {
  renderLoading(true, popupDeleteCardButton);
    eraseCard(cardId)
  .then((res) => {
    card.remove();
    closePopup(deletePopup)
    console.log(res.message)
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, popupDeleteCardButton))
}

export {cards, deleteCard, createCard}
