
//Работа с DOM
const cards = ".cards";
const profileEditButton = document.querySelector(".profile__info-edit");
const profileAvatar = document.querySelector(".profile__avatar");
const formUpdateAvatar = document.forms.avatar;
const formUpdateAvatarLink = formUpdateAvatar.elements.link;
const profileName = document.querySelector(".profile__name");
const profileJobInfo = document.querySelector(".profile__job-info");
const formAdd = document.forms.add;
const formEdit = document.forms.edit;
const popupNameField = document.querySelector("#name");
const popupJobField = document.querySelector("#job");
const profileAddButton = document.querySelector(".profile__add-button");

const popupSelectors = {
  deletePopup: '.popup-delete-card',
  popupUpdateAvatar: '.popup-update-avatar',
  popupEdit: '.popup-edit',
  popupAddCard: '.popup-add-card',
  popupImg: '.popup-img'
}
const formSelectors =  {
  formSelector:'form',
  inputSelector: 'popup__container-item',
  inputErrorClass: 'popup__container-item-error',
  inputErrorActiveClass: 'popup__container-item-error_active',
  buttonSelector: 'popup__container-button',
  buttonInactiveClass: 'popup__container-button_inactive'
}


//Функция смены названия кнопки во время обработки запроса к серверу
function renderLoading(isLoading, submitButtonText){
  if (isLoading){
    if(submitButtonText.value === "accept"){
      submitButtonText.textContent = "Удаление.."
    }
    else
    submitButtonText.textContent = "Сохранение.."
  }
  else {
    if(submitButtonText.value === "create"){
      submitButtonText.textContent = "Создать"
    }
    else if(submitButtonText.value === "accept"){
      submitButtonText.textContent = "Да"
    }
    else if(submitButtonText.value === "save"){
      submitButtonText.textContent = "Сохранить"
    }
   }
}

export {cards, renderLoading, profileEditButton, profileAvatar, formUpdateAvatar, formUpdateAvatarLink, profileName, profileJobInfo, formEdit, popupNameField, popupJobField, profileAddButton, formSelectors, formAdd, popupSelectors}
