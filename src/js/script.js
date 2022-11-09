import '../pages/index.css';
import {cards, createCard} from '../components/card.js'
import {openPopup, closePopup} from  '../components/modal.js'
import {enableValidation, resetInputsErrors} from '../components/validate.js'
import {getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateUserAvatar} from '../components/api.js'
import {renderLoading} from '../components/utils'

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

// Получение данный пользователя (id) и отрисовка карточек
Promise.all([getUserInfo(), getInitialCards()])
.then(res => {
  const [userInfo, initialCards] = res;
  return [userInfo, initialCards];

})
.then(([userInfo, initialCards]) => {
  profileAvatar.src = userInfo['avatar'];
  profileName.textContent = userInfo.name;
  profileJobInfo.textContent = userInfo.about;
  initialCards.reverse().forEach((item) => {
    cards.prepend(createCard(userInfo, item));
     });
})
.catch(error => console.log(error))
enableValidation(settings);

//Функция обработки формы профиля
function editProfile(event) {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  updateUserInfo(popupNameField.value, popupJobField.value)
  .then((res) => {
  profileName.textContent = res.name;
  profileJobInfo.textContent = res.about;
  closePopup(popupEdit);
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
}

//Функция обработки формы добавления новой карточки
function addCard(event) {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);

  Promise.all([getUserInfo(), addNewCard(formAddCardLink.value, formAddCardName.value)])
  .then(res => {
    const [userInfo, addedCard] = res;
    return [userInfo, addedCard];
  })
.then(([userInfo, addedCard]) => {
    cards.prepend(createCard(userInfo, addedCard));
    closePopup(popupAddCard);
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
}

//Функция обновления аватара пользователя
function updateAvatar(event) {
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

//Слушатели событий
profileAvatar.addEventListener("click", () => {
  resetInputsErrors(formUpdateAvatar, settings);
  formUpdateAvatar.reset();
  openPopup(popupUpdateAvatar);
  })

profileEditButton.addEventListener("click", (event) => {
  resetInputsErrors(formEdit, settings);
  popupNameField.value = profileName.textContent;
  popupJobField.value = profileJobInfo.textContent;
  openPopup(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  resetInputsErrors(formAdd, settings);
  formAdd.reset();
  openPopup(popupAddCard);
});

popupList.forEach((popup) =>
  popup.querySelector(".popup__close-button").addEventListener("click", () => closePopup(popup))
);

formEdit.addEventListener("submit", editProfile);
formAdd.addEventListener("submit", addCard);
formUpdateAvatar.addEventListener("submit", updateAvatar);
