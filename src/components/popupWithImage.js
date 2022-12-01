import Popup from './popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector)
    this._popupImgElem = document.querySelector(".popup__img-elem");
    this._popupImgCaption = document.querySelector(".popup__img-caption");
  }
open(event){
  this._popupImgCaption.textContent = event.target.alt,
  this._popupImgElem.setAttribute("src", event.target.src),
  this._popupImgElem.setAttribute("alt", event.target.alt),
  super.open();
}
}
