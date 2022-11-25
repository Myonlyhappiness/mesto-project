
//Работа с DOM
const cards = document.querySelector(".cards");
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

export {cards, renderLoading, popupList, profileEditButton, profileAvatar, popupUpdateAvatar, formUpdateAvatar, formUpdateAvatarLink, profileName, profileJobInfo, formEdit, popupEdit, popupNameField, popupJobField, profileAddButton, formAdd, formAddCardLink, formAddCardName, popupAddCard, formSelectors}
