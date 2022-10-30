import {openImgCard} from  '../components/modal.js'
const cards = document.querySelector(".cards");
const template = document.querySelector("#element").content;


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

// Создание карточки
function createCard(link, name) {
  const card = template.querySelector(".card").cloneNode(true);
  const cardPhoto =  card.querySelector(".card__photo");
  cardPhoto.src = link;
  cardPhoto.alt = name;
  card.querySelector(".card__caption-text").textContent = name;
  card.addEventListener("click", deleteCard);
  card.addEventListener("click", likeCard);
  cardPhoto.addEventListener("click", openImgCard);
  return card;
}


// Функция обработки лайка карточки
function likeCard() {
  if (event.target.classList.contains("card__like-icon")){
    event.target.classList.toggle("card_liked");
  }
}

// Функция обработки клика по иконке удаления
function deleteCard() {
  if (event.target.classList.contains("card__delete-icon")){
    const card = event.target.closest(".card");
    const cardPhoto =  card.querySelector(".card__photo");
    cards.removeChild(card)
    card.removeEventListener("click", deleteCard);
    card.removeEventListener("click", likeCard);
    cardPhoto.removeEventListener("click", openImgCard);
  }

}

// Создание карточки на основе массива при загрузке страницы
initialCards.forEach((item) => {
  const name = item.name;
  const link = item.link;
  cards.prepend(createCard(link, name));
});

export {cards, deleteCard, createCard}
