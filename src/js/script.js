import '../pages/index.css';
import {cards, likeCard, deleteCard, addCard, formAdd, popupAddCard} from '../components/card.js'
import {opensPopup, imgCard, closePopup, enableValidation} from  '../components/modal.js'

//Работа с DOM
const popup = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const profileName = document.querySelector(".profile__name");
const profileJobInfo = document.querySelector(".profile__job-info");
const formEdit = document.forms.edit;
const popupEdit = document.querySelector(".popup-edit");
const popupNameField = popupEdit.querySelector("#name");
const popupJobField = popupEdit.querySelector("#job");
const profileAddButton = document.querySelector(".profile__add-button");

//Вызов функции валидации форм и полей
enableValidation({
  formSelector:'.form',
  fieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__container-item',
  inputErrorClass: 'popup__container-item-error',
  inputErrorActiveClass: 'popup__container-item-error_active',
  buttonSelector: '.popup__container-button',
  buttonInactiveClass: 'popup__container-button_inactive'
});

//Функция обработки формы профиля
function editProfile() {
  event.preventDefault();
  profileName.textContent = popupNameField.value;
  profileJobInfo.textContent = popupJobField.value;
  closePopup(popupEdit);
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
