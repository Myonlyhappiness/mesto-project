import '../pages/index.css';
import {cards, createCard} from '../components/card.js'
import {openPopup, closePopup} from  '../components/modal.js'
import {enableValidation, resetInputsErrors, setEventListeners} from '../components/validate.js'
import {getUserInfo, updateUserInfo, addNewCard, updateUserAvatar} from '../components/api.js'
import {initialCards} from '../components/card.js'

//Работа с DOM
const popupList = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const profileAvatar = document.querySelector(".profile__avatar");
const popupUpdateAvatar = document.querySelector(".popup-update-avatar");
const formUpdateAvatar = document.forms.avatar;
const formUpdateAvatarLink = formUpdateAvatar.elements.link;
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
  inputSelector: 'popup__container-item',
  inputErrorClass: 'popup__container-item-error',
  inputErrorActiveClass: 'popup__container-item-error_active',
  buttonSelector: 'popup__container-button',
  buttonInactiveClass: 'popup__container-button_inactive'
}

//Получение информации в профиль и получение айди
getUserInfo()
.then((res) => {
  profileAvatar.src = res['avatar'];
  profileName.textContent = res.name;
  profileJobInfo.textContent = res.about;
  initialCards(res['_id']);
})
.catch(error => console.log(error))

//Вызов функции валидации форм и полей
enableValidation(settings);

//Функция обработки формы профиля
function editProfile() {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  updateUserInfo(popupNameField.value, popupJobField.value)
  .then((res) => {
  profileName.textContent = res.name;
  profileJobInfo.textContent = res.about;
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
  closePopup(popupEdit);
}

//Функция обработки формы добавления новой карточки
function addCard() {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  getUserInfo()
  .then((res) => {
   const pageOwner = res['_id']
   addNewCard(formAddCardLink.value, formAddCardName.value)
   .then((res) => {
    cards.prepend(createCard(res['_id'], res.link, res.name, res.owner['_id'], res.likes, pageOwner));
  })
  .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
  closePopup(popupAddCard);
}

//Функция обновления аватара пользователя
function updateAvatar() {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  updateUserAvatar(formUpdateAvatarLink.value)
  .then((res) => {
    profileAvatar.src = res['avatar'];
    closePopup(popupUpdateAvatar);
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
}

function renderLoading(isLoading, submitButtonText){
  if (isLoading){
    submitButtonText.textContent = "Сохранение.."
  }
  else {
    if(submitButtonText.value === "create"){
      submitButtonText.textContent = "Создать"
    }
    else if(submitButtonText.value === "save"){
      submitButtonText.textContent = "Сохранить"
    }
   }
}

//Слушатели событий
profileAvatar.addEventListener("click", () => {
  resetInputsErrors(settings);
  formUpdateAvatar.reset();
  openPopup(popupUpdateAvatar);
  setEventListeners(formEdit, settings);
  })


profileEditButton.addEventListener("click", () => {
  resetInputsErrors(settings);
  popupNameField.value = profileName.textContent;
  popupJobField.value = profileJobInfo.textContent;
  openPopup(popupEdit);
  setEventListeners(formEdit, settings);
});

profileAddButton.addEventListener("click", () => {
  resetInputsErrors(settings);
  formAdd.reset();
  openPopup(popupAddCard);
  setEventListeners(formAdd, settings);
});

popupList.forEach((popup) =>
  popup.querySelector(".popup__close-button").addEventListener("click", () => closePopup(popup))
);

formEdit.addEventListener("submit", editProfile);
formAdd.addEventListener("submit", addCard);
formUpdateAvatar.addEventListener("submit", updateAvatar);
