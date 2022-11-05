const general = document.querySelector(".general");
const popupImg = document.querySelector(".popup-img");
const popupImgElem = document.querySelector(".popup__img-elem");
const popupImgCaption = document.querySelector(".popup__img-caption");


//Функция открытия попапов
function openPopup(popup) {
  general.style.overflowY = "hidden";
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupClick);
  document.addEventListener("keydown", closePopupEsc);
}

// Функция попапа с картинкой карточки
function openImgCard() {
  popupImgCaption.textContent = event.target.alt,
  popupImgElem.setAttribute("src", event.target.src),
  popupImgElem.setAttribute("alt", event.target.alt),
  openPopup(popupImg);
}

//Функция закрытия попапов
function closePopup(popup) {
  general.style.overflow = "";
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", closePopupClick);
  document.removeEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапов по ESC
function closePopupEsc() {
  if (event.key === "Escape"){
  closePopup(document.querySelector(".popup_opened"))}
}

//Функция закрытия попапов по клику по подложке (фону)
function closePopupClick() {
  if(event.target.classList.contains("popup_opened"))
  {closePopup(event.target)};
  if(event.target.classList.contains("popup-delete-card"))
  {closePopup(event.target)};
}


export {openPopup, openImgCard, closePopup};
