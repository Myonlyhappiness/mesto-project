import Popup from './popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector)
  }
open(event){
  const popupImgElem = document.querySelector(".popup__img-elem");
  const popupImgCaption = document.querySelector(".popup__img-caption");
  popupImgCaption.textContent = event.target.alt,
  popupImgElem.setAttribute("src", event.target.src),
  popupImgElem.setAttribute("alt", event.target.alt),
  super.open();
}
}
