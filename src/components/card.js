import {closePopup} from '../components/modal.js';
import createCard from '../components/utils.js'

const cards = document.querySelector(".cards");
const formAdd = document.forms.add;
const formAddCardLink = formAdd.elements.link;
const formAddCardName = formAdd.elements.name;
const popupAddCard = document.querySelector(".popup-add-card");

//Массив с исходными карточками
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


// Функция обработки лайка карточки
function likeCard() {
  event.target.classList.contains("card__like-icon")
    ? event.target.classList.toggle("card_liked")
    : false;
}

// Функция обработки клика по иконке удаления
function deleteCard() {
  event.target.classList.contains("card__delete-icon")
    ? cards.removeChild(event.target.closest(".card")) : false;
}

//Функция добавление карточки
function addCard() {
  event.preventDefault();
  cards.prepend(createCard(formAddCardLink.value, formAddCardName.value));
  closePopup(popupAddCard);
}

// Создание карточки на основе массива при загрузке страницы
initialCards.forEach((item) => {
  const name = item.name;
  const link = item.link;
  cards.prepend(createCard(link, name));
});

export {cards, likeCard, deleteCard, addCard, formAdd, popupAddCard}
