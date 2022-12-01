import Popup from './popup.js'

export default class PopupDeleteCard extends Popup{
  constructor(selector, formCallback){
    super(selector)
    this._popup = document.querySelector(selector);
    this.popupDeleteCardButton = this._popup.querySelector('button[type="submit"]');
    this._formCallback = formCallback;
    this._formCallback = this._formCallback.bind(this);
  }

  setSubmitHandler(cardId, card){
  this.cardId = cardId;
  this.card = card;
  }

  setEventListeners(){
    super.setEventListeners();
    this.popupDeleteCardButton.addEventListener("click", this._formCallback);
  }
  }
