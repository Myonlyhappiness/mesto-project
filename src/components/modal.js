import {enableValidation, resetInputsErrors} from '../components/validate.js'

//Функция открытия попапов
function opensPopup(popup) {
  resetInputsErrors();
  document.querySelector(".general").style.overflowY = "hidden";
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupClick);
  document.addEventListener("keydown", closePopupEsc);
}

// Функция попапа с картинкой карточки
function imgCard() {
  const popupImg = document.querySelector(".popup-img");
  const popupImgElem = document.querySelector(".popup__img-elem");
  const popupImgCaption = document.querySelector(".popup__img-caption");
  event.target.classList.contains("card__photo") ? (
  popupImgCaption.textContent = event.target.alt,
  popupImgElem.setAttribute("src", event.target.src),
  popupImgElem.setAttribute("alt", event.target.alt),
  opensPopup(popupImg)) : false;
}

//Функция закрытия попапов
function closePopup(popup) {
  document.querySelector(".general").style.overflow = "";
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupClick);
  document.removeEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапов по ESC
function closePopupEsc() {
  event.key === "Escape" ? closePopup(document.querySelector(".popup_opened")) : false;
}

//Функция закрытия попапов по клику по подложке (фону)
function closePopupClick() {
  event.target.classList.contains("popup_opened") ? closePopup(document.querySelector(".popup_opened")) : false;
}


export {opensPopup, imgCard, closePopup, enableValidation};
