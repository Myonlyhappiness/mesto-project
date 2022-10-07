//Работа с DOM
const general = document.querySelector(".general");
const cards = document.querySelector(".cards");
const popup = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const formButtons = document.querySelectorAll(".popup__container-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupEdit = document.querySelector(".popup-edit");
const popupImg = document.querySelector(".popup-img");
const popupAddCard = document.querySelector(".popup-add-card");
const profileName = document.querySelector(".profile__name");
const profileJobInfo = document.querySelector(".profile__job-info");
const popupNameField = popupEdit.querySelector("#name");
const popupJobField = popupEdit.querySelector("#job");
const profileAddButton = document.querySelector(".profile__add-button");
const likeButton = document.querySelectorAll(".card__like-icon");
const formAddCardLink = document.forms.add.elements.link;
const formAddCardName = document.forms.add.elements.name;
const formEdit = document.forms.edit;
const formAdd = document.forms.add;
const popupImgElem = document.querySelector(".popup__img-elem");
const popupImgCaption = document.querySelector(".popup__img-caption");

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
  const template = document.querySelector("#element").content;
  const card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__photo").src = link;
  card.querySelector(".card__photo").alt = name;
  card.querySelector(".card__caption-text").textContent = name;
  card.addEventListener("click", likeCard);
  card.addEventListener("click", deleteCard);
  card.addEventListener("click", imgCard);
  return card;
}

// Создание карточки на основе массива при загрузке страницы
initialCards.forEach((item) => {
  const name = item.name;
  const link = item.link;
  cards.prepend(createCard(link, name));
});

// Функция обработки лайка карточки
function likeCard() {
  event.target.classList.contains("card__like-icon")
    ? event.target.classList.toggle("card_liked")
    : false;
}

// Функция обработки клика по картинке карточки
function imgCard() {
  event.target.classList.contains("card__photo") ? (
  popupImgCaption.textContent = event.target.alt,
  popupImgElem.setAttribute("src", event.target.src),
  popupImgElem.setAttribute("alt", event.target.alt),
  opensPopup(popupImg)) : false;
}

// Функция обработки клика по иконке удаления
function deleteCard() {
  event.target.classList.contains("card__delete-icon")
    ? (cards.removeChild(event.target.closest(".card")),
    event.target.closest(".card").removeEventListener("click", likeCard),
    event.target.closest(".card").removeEventListener("click", deleteCard),
    event.target.closest(".card").removeEventListener("click", imgCard))
    : false;
}

//Функция открытия попапов
function opensPopup(popup) {
  general.style.overflow = "hidden";
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапов по ESC
function closePopupEsc() {
  if (event.key === "Escape") {
    closesPopup(document.querySelector(".popup_opened"));
  }
}

//Функция закрытия попапов
function closesPopup(popup) {
  general.style.overflow = "";
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

//Функции обработки форм
function editProfile(event) {
  event.preventDefault();
  profileName.textContent = popupNameField.value;
  profileJobInfo.textContent = popupJobField.value;
  closesPopup(popupEdit);
}

//Функция добавление карточки
function addCard() {
  event.preventDefault();
  cards.prepend(createCard(formAddCardLink.value, formAddCardName.value));
  closesPopup(popupAddCard);
}
/* У меня очистка зачем-то еще и при открытии стоит.
Даже передвинув за функцию видна очистка из-за плавного transition
Решил оставить только на открытии. В таком случае точно не видно */

//Слушатели событий
profileEditButton.addEventListener("click", () => {
  popupNameField.value = profileName.textContent;
  popupJobField.value = profileJobInfo.textContent;
  opensPopup(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  formAdd.reset();
  opensPopup(popupAddCard);
});

popup.forEach((popup) =>
  popup.querySelector(".popup__close-button").addEventListener("click", () => closesPopup(popup))
);

formEdit.addEventListener("submit", editProfile);
formAdd.addEventListener("submit", addCard);
