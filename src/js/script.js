import '../pages/index.css';
import {Card} from '../components/card.js'
import {openPopup, closePopup} from  '../components/modal.js'
import {enableValidation, resetInputsErrors} from '../components/validate.js'
import {api} from '../components/api.js'
import {cards, renderLoading, popupList, profileEditButton, profileAvatar, popupUpdateAvatar, formUpdateAvatar, formUpdateAvatarLink, profileName, profileJobInfo, formEdit, popupEdit, popupNameField, popupJobField, profileAddButton, formAdd, formAddCardLink, formAddCardName, popupAddCard, settings} from '../components/utils'



// Получение данных пользователя (id) и отрисовка карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, initialCards]) => {
  profileAvatar.src = userInfo['avatar'];
  profileName.textContent = userInfo.name;
  profileJobInfo.textContent = userInfo.about;
  initialCards.reverse().forEach((item) => {
    const card = new Card(userInfo, item, '#element', api);
    cards.prepend(card.createCard());
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

profileEditButton.addEventListener("click", () => {
  popupNameField.value = profileName.textContent;
  popupJobField.value = profileJobInfo.textContent;
  resetInputsErrors(formEdit, settings);
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
