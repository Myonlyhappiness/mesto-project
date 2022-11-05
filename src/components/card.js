import {openImgCard, openPopup, closePopup} from  '../components/modal.js'
import {getInitialCards, setLike, deleteLike, eraseCard} from '../components/api.js'

const cards = document.querySelector(".cards");
const template = document.querySelector("#element").content;
const deletePopup = document.querySelector(".popup-delete-card");
const popupDeleteCardButton = document.querySelector(".popup-delete-card__button");


// Создание карточки
function createCard(cardId, link, name, ownerId, likes, pageOwner) {
  const card = template.querySelector(".card").cloneNode(true);
  const cardPhoto = card.querySelector(".card__photo");
  const deleteCardIcon = card.querySelector(".card__delete-icon");
  const cardLikeIcon = card.querySelector(".card__like-icon");
  const cardLikeIconCounter = card.querySelector(".card__like-icon-counter")
  cardLikeIconCounter.textContent = likes.length;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  card.querySelector(".card__caption-text").textContent = name;
  cardLikeIcon.addEventListener("click", () => likeCard(cardId, cardLikeIcon, cardLikeIconCounter));
  cardPhoto.addEventListener("click", openImgCard);
  //Проверка лайка
  likes.forEach((like) => {
    if(like['_id'] === pageOwner){
      cardLikeIcon.classList.add('card_liked');
  }
  })
  //Удаление иконки корзины с чужой карточки
   if(ownerId != pageOwner){
    deleteCardIcon.remove()
   }
   deleteCardIcon.addEventListener("click", () => {
    openPopup(deletePopup)
    popupDeleteCardButton.onclick = () => {
      deleteCard(cardId, card)
      closePopup(deletePopup)
    }
  });
  return card;
}

// Функция обработки лайка карточки
function likeCard(cardId, cardLikeIcon, cardLikeIconCounter) {
  if (cardLikeIcon.classList.contains("card_liked")){
    deleteLike(cardId)
    .then((res) => {
      cardLikeIconCounter.textContent = res.likes.length;
    })
    .catch(error => console.log(error))
  }
else {
  setLike(cardId)
    .then((res) => {
      cardLikeIconCounter.textContent = res.likes.length;
    })
    .catch(error => console.log(error))
  }
  cardLikeIcon.classList.toggle("card_liked");
}

// Функция обработки клика по иконке удаления
function deleteCard(cardId, card) {
    eraseCard(cardId)
  .then((res) => {
    console.log(res.message)
  })
  .catch(error => console.log(error))
    card.remove();
}

//Создание карточек на основе массива при загрузке страницы
const initialCards = ((pageOwner) => {
  getInitialCards()
.then((res) => {
  res.reverse().forEach((item) => {
    cards.prepend(createCard(item['_id'], item.link, item.name, item.owner['_id'], item.likes, pageOwner));
     });
})
.catch(error => console.log(error))
})

export {cards, deleteCard, createCard, initialCards}
