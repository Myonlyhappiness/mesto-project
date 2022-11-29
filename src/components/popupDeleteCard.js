import Popup from './popup.js'

export default class PopupDeleteCard extends Popup{
  constructor(selector, formCallback){
    super(selector)
    this._selector = selector
    this._formCallback = formCallback;

  }
  open(){
    super.open();
  }

  close(){
    super.close();
    this.popupDeleteCardButton.removeEventListener("click", this._formCallback);
  }

  _setEventListeners(){
    super._setEventListeners();
    this.popupDeleteCardButton = this._selector.querySelector('button[type="submit"]');
    this.popupDeleteCardButton.addEventListener("click", this._formCallback);
    }
  }
