import '../pages/index.css';
import {Card} from '../components/card.js'
import FormValidator from '../components/validate.js'
import {api} from '../components/api.js'
import Section from '../components/section.js'
import PopupWithImage from '../components/popupWithImage.js'
import PopupWithForm from '../components/popupWidthForm.js'
import PopupDeleteCard from '../components/popupDeleteCard.js'
import UserInfo from '../components/userInfo.js'
import {cards, renderLoading, profileEditButton, profileAvatar, popupUpdateAvatar, formUpdateAvatar, formUpdateAvatarLink, profileName, profileJobInfo, formEdit, popupEdit, popupNameField, popupJobField, profileAddButton, popupAddCard, formSelectors, deletePopup} from '../components/utils'


const userInfo = new UserInfo({profileName, profileJobInfo}, api);

// Получение данных пользователя (id) и отрисовка карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, initialCards]) => {
  profileAvatar.src = userInfo['avatar'];
  profileName.textContent = userInfo.name;
  profileJobInfo.textContent = userInfo.about;
  const cardsList = new Section({
      items: initialCards,
      renderer: (item) => {
        const card = new Card(userInfo, item, '#element', api, (event) => {
          const popupImg = document.querySelector(".popup-img");
          const popupWithImage = new PopupWithImage(popupImg);
          popupWithImage.open(event);
        },
        (delCardId, delCardElement) => {
          const popupDeleteCard = new PopupDeleteCard(deletePopup, function() {
            deleteCard(delCardId, delCardElement, popupDeleteCard);
          });
          popupDeleteCard.open();
        }
        );
        const cardElement = card.createCard();
        cardsList.addItem(cardElement);
      }
    }, cards)

    cardsList.initialCardsRenderer();
})
.catch(error => console.log(error))

//Функция обработки формы профиля
function editProfile(event) {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  userInfo.setUserInfo(popupNameField, popupJobField, () => this.close())
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
}

//Функция обработки формы добавления новой карточки
function addCard(event) {
  event.preventDefault();
  const submitButtonText = event.submitter;
  renderLoading(true, submitButtonText);
  this._getInputValues();
  Promise.all([api.getUserInfo(), api.addNewCard(this._formAddCardLink, this._formAddCardName)])
.then(([userInfo, addedCard]) => {
  const card = new Card(userInfo, addedCard, '#element', api,
  (event) => {
    const popupImg = document.querySelector(".popup-img");
    const popupWithImage = new PopupWithImage(popupImg);
    popupWithImage.open(event);
  },

  (delCardId, delCardElement) => {
    const popupDeleteCard = new PopupDeleteCard(deletePopup, function() {
      deleteCard(delCardId, delCardElement, popupDeleteCard)
    });
    popupDeleteCard.open();
  });

  const cardContainer = new Section ({}, cards)
  cardContainer.addItem(card.createCard());
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
  .then((res) => {
    console.log(res);
    profileAvatar.src = res['avatar'];
    this.close();
  })
  .catch(error => console.log(error))
  .finally(() => renderLoading(false, submitButtonText))
}

//Слушатели событий
profileAvatar.addEventListener("click", () => {
  const formAvatar = new FormValidator(formSelectors, formUpdateAvatar);
  formAvatar.enableValidation();
  const popupWithForm = new PopupWithForm(popupUpdateAvatar, updateAvatar);
  popupWithForm.open();
  })

profileEditButton.addEventListener("click", () => {
  userInfo.getUserInfo().then((res) => {
    popupNameField.value = res.name;
    popupJobField.value = res.about;
    const formEditProfile = new FormValidator(formSelectors, formEdit);
    formEditProfile.enableValidation();
    const popupWithForm = new PopupWithForm(popupEdit, editProfile);
    popupWithForm.open();
})
.catch(error => console.log(error));
  })

profileAddButton.addEventListener("click", () => {
  const formAdd = document.forms.add;
  const formAddCard = new FormValidator(formSelectors, formAdd);
  formAddCard.enableValidation();
  const popupWithForm = new PopupWithForm(popupAddCard, addCard);
  popupWithForm.open();
});
