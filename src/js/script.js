import '../pages/index.css';
import Card from '../components/card.js'
import FormValidator from '../components/validate.js'
import {api} from '../components/api.js'
import Section from '../components/section.js'
import PopupWithImage from '../components/popupWithImage.js'
import PopupWithForm from '../components/popupWidthForm.js'
import PopupDeleteCard from '../components/popupDeleteCard.js'
import UserInfo from '../components/userInfo.js'
import {cards, renderLoading, profileEditButton, profileAvatar, formUpdateAvatar, formUpdateAvatarLink, profileName, profileJobInfo, formEdit, popupNameField, popupJobField, profileAddButton, formSelectors, formAdd, popupSelectors} from '../components/utils'


//Создание экземпляров классов
const userInformation = new UserInfo(profileAvatar, profileName, profileJobInfo);
const popupWithImage = new PopupWithImage(popupSelectors.popupImg);
const validateformAvatar = new FormValidator(formSelectors, formUpdateAvatar);
const validateformEditProfile = new FormValidator(formSelectors, formEdit);
const validateformAddCard = new FormValidator(formSelectors, formAdd);
const popupEditAvatar = new PopupWithForm(popupSelectors.popupUpdateAvatar, updateAvatar);
const popupEditProfile = new PopupWithForm(popupSelectors.popupEdit, editProfile);
const popupAddNewCard = new PopupWithForm(popupSelectors.popupAddCard, addCard);
const popupDeleteCard = new PopupDeleteCard(popupSelectors.deletePopup, function(){
  deleteCard(this.cardId, this.card, popupDeleteCard)
});
const renderItem = new Section (cards, (item, userInfo) => {
  const card = new Card(userInfo, item, '#element', api, (event) => {
    popupWithImage.open(event);
  },
  (delCardId, delCardElement) => {
    popupDeleteCard.open();
    popupDeleteCard.setSubmitHandler(delCardId, delCardElement)

  }
  );
  return card.createCard();

})


//Вызов методов
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddNewCard.setEventListeners();
validateformAvatar.enableValidation();
validateformEditProfile.enableValidation();
validateformAddCard.enableValidation();


// Получение данных пользователя (id) и отрисовка карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, initialCards]) => {
  userInformation.setUserInfo(userInfo);
  renderItem.initialCardsRenderer(initialCards, userInfo);
})
.catch(error => console.log(error))

//Функция обработки формы профиля
function editProfile(event) {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  api.updateUserInfo(popupNameField.value, popupJobField.value)
  .then((userInfo) => {
  profileName.textContent = userInfo.name;
  profileJobInfo.textContent = userInfo.about;
  this.close()
})
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
}

//Функция обработки формы добавления новой карточки
function addCard(event) {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  this.getInputValues();
  Promise.all([api.getUserInfo(), api.addNewCard(this._formValues.link, this._formValues.name)])
.then(([userInfo, addedCard]) => {
  const cardItem = renderItem.renderer(addedCard, userInfo);
  renderItem.addItem(cardItem);
    this.close();
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
}


// Функция обработки клика по иконке удаления
function deleteCard(cardId, card, popup) {
  renderLoading(true, popup.popupDeleteCardButton);
  api.eraseCard(cardId)
    .then((res) => {
      card.remove();
      popup.close();
      console.log(res.message);
    })
    .catch(error => console.log(error))
    .finally(() => renderLoading(false, popup.popupDeleteCardButton))
}

//Функция обновления аватара пользователя
function updateAvatar(event) {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  api.updateUserAvatar(formUpdateAvatarLink.value)
  .then((userInfo) => {
    profileAvatar.src = userInfo.avatar;
    this.close();
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
}

//Слушатели событий
profileAvatar.addEventListener("click", () => {
validateformAvatar.resetInputsErrors();
popupEditAvatar.open();
})

profileAddButton.addEventListener("click", () => {
  validateformAddCard.resetInputsErrors();
  popupAddNewCard.open()});

profileEditButton.addEventListener("click", () => {
  validateformEditProfile.resetInputsErrors();
  api.getUserInfo().then((userInfo) => {
    popupNameField.value = userInfo.name;
    popupJobField.value = userInfo.about;
    popupEditProfile.open();
})
.catch(error => console.log(error));
  })


