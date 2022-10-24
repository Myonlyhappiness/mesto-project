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
const formEdit = document.forms.edit;
const formAdd = document.forms.add;
const formAddCardLink = formAdd.elements.link;
const formAddCardName = formAdd.elements.name;
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
    ? cards.removeChild(event.target.closest(".card")) : false;
}

//Функция показа ошибки
function showInputError(fieldsetItem, inputItem, settings, errorMessage) {
  const errorElement = fieldsetItem.querySelector(`.${inputItem.id}-input-error`);
  inputItem.classList.add(settings['inputErrorClass']);
  errorElement.classList.add(settings['inputErrorActiveClass']);
  errorElement.textContent = errorMessage;
}

//Функция удаления ошибки
function hideInputError(fieldsetItem, inputItem, settings) {
  const errorElement = fieldsetItem.querySelector(`.${inputItem.id}-input-error`);
  inputItem.classList.remove(settings['inputErrorClass']);
  errorElement.classList.remove(settings['inputErrorActiveClass']);
  errorElement.textContent = ' ';
}

//Функция валидации
function checkInputValidity(fieldsetItem, inputItem, settings) {
inputItem.validity.patternMismatch ? inputItem.setCustomValidity(inputItem.dataset.errorMessage):
inputItem.setCustomValidity("");

!inputItem.validity.valid ? showInputError(fieldsetItem, inputItem, settings, inputItem.validationMessage):
hideInputError(fieldsetItem, inputItem, settings);
}

//Функция проверки всех полей
function hasInvalidInput(inputList) {
  return inputList.some((item) => !item.validity.valid);
}


//Функция валидации(переключения) кнопки
function toggleButtonState(inputList, buttonElement, settings) {
  hasInvalidInput(inputList) ? (buttonElement.classList.add(settings['buttonInactiveClass']),
  buttonElement.disabled = true):
  (buttonElement.classList.remove(settings['buttonInactiveClass']), buttonElement.disabled = false);
}


//Функция установки слушателей на поля ввода
function setEventListeners(fieldsetItem, settings) {
  const inputList = Array.from(fieldsetItem.querySelectorAll(settings['inputSelector']));
  const buttonElement = fieldsetItem.querySelector(settings['buttonSelector']);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', function () {
      checkInputValidity(fieldsetItem, inputItem, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}


// Функция запуска валидации
function enableValidation(settings){
const formList = Array.from(document.querySelectorAll(settings['formSelector']));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(settings['fieldsetSelector']));
    fieldsetList.forEach((fieldsetItem) => setEventListeners(fieldsetItem, settings));
  });
}

// Функция сброса ошибок полей

function resetInputsErrors() {
  Array.from(document.querySelectorAll('.popup__container-item-error_active')).forEach((item) => {
    item.classList.remove('popup__container-item-error_active');
    item.textContent = '';
  })

  Array.from(document.querySelectorAll('.popup__container-item-error')).forEach((item) => {
    item.classList.remove('popup__container-item-error');
  })
}

//Функция открытия попапов
function opensPopup(popup) {
  resetInputsErrors();
  general.style.overflow = "hidden";
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupClick);
  document.addEventListener("keydown", closePopupEsc);
  enableValidation({
    formSelector:'.form',
    fieldsetSelector: '.popup__input-container',
    inputSelector: '.popup__container-item',
    inputErrorClass: 'popup__container-item-error',
    inputErrorActiveClass: 'popup__container-item-error_active',
    buttonSelector: '.popup__container-button',
    buttonInactiveClass: 'popup__container-button_inactive'
  });
}

//Функция закрытия попапов по ESC
function closePopupEsc() {
  event.key === "Escape" ? closePopup(document.querySelector(".popup_opened")) : false;
}

//Функция закрытия попапов по клику по подложке (фону)
function closePopupClick() {
  event.target.classList.contains("popup_opened") ? closePopup(document.querySelector(".popup_opened")) : false;
}

//Функция закрытия попапов
function closePopup(popup) {
  general.style.overflow = "";
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupClick);
  document.removeEventListener("keydown", closePopupEsc);
}

//Функция обработки формы профиля
function editProfile(event) {
  event.preventDefault();
  profileName.textContent = popupNameField.value;
  profileJobInfo.textContent = popupJobField.value;
  closePopup(popupEdit);
}

//Функция добавление карточки
function addCard() {
  event.preventDefault();
  cards.prepend(createCard(formAddCardLink.value, formAddCardName.value));
  closePopup(popupAddCard);
}

//Слушатели событий
cards.addEventListener("click", likeCard);
cards.addEventListener("click", deleteCard);
cards.addEventListener("click", imgCard);


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
  popup.querySelector(".popup__close-button").addEventListener("click", () => closePopup(popup))
);

formEdit.addEventListener("submit", editProfile);
formAdd.addEventListener("submit", addCard);

