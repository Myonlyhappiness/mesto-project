import '../pages/index.css';
import {cards, createCard} from '../components/card.js'
import {openPopup, closePopup} from  '../components/modal.js'
import {enableValidation, resetInputsErrors} from '../components/validate.js'

//Работа с DOM
const popupList = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const profileName = document.querySelector(".profile__name");
const profileJobInfo = document.querySelector(".profile__job-info");
const formEdit = document.forms.edit;
const popupEdit = document.querySelector(".popup-edit");
const popupNameField = popupEdit.querySelector("#name");
const popupJobField = popupEdit.querySelector("#job");
const profileAddButton = document.querySelector(".profile__add-button");
const formAdd = document.forms.add;
const formAddCardLink = formAdd.elements.link;
const formAddCardName = formAdd.elements.name;
const popupAddCard = document.querySelector(".popup-add-card");
const settings =  {
  formSelector:'form',
  //fieldsetSelector: 'popup__input-container',
  inputSelector: 'popup__container-item',
  inputErrorClass: 'popup__container-item-error',
  inputErrorActiveClass: 'popup__container-item-error_active',
  buttonSelector: 'popup__container-button',
  buttonInactiveClass: 'popup__container-button_inactive'
}


//Вызов функции валидации форм и полей
enableValidation(settings);

//Функция обработки формы профиля
function editProfile() {
  event.preventDefault();
  profileName.textContent = popupNameField.value;
  profileJobInfo.textContent = popupJobField.value;
  closePopup(popupEdit);
}

//Функция обработки формы добавления новой карточки
function addCard() {
  event.preventDefault();
  cards.prepend(createCard(formAddCardLink.value, formAddCardName.value));
  closePopup(popupAddCard);
}


//Слушатели событий
profileEditButton.addEventListener("click", () => {
  resetInputsErrors(settings);
  popupNameField.value = profileName.textContent;
  popupJobField.value = profileJobInfo.textContent;
  openPopup(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  resetInputsErrors(settings);
  formAdd.reset();
  openPopup(popupAddCard);
});

popupList.forEach((popup) =>
  popup.querySelector(".popup__close-button").addEventListener("click", () => closePopup(popup))
);

formEdit.addEventListener("submit", editProfile);
formAdd.addEventListener("submit", addCard);
