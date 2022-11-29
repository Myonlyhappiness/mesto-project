import Popup from "./popup";

export default class PopupWithForm extends Popup{
  constructor(selector, formCallback){
    super(selector)
    this._formCallback = formCallback;
    this._form = selector.querySelector("form");
  }

  _getInputValues(){
    this._formAddCardLink = this._form.elements.link.value;
    this._formAddCardName = this._form.elements.link.name;
  }

  open(){
    super.open();
  }

  close(){
    super.close();
    setTimeout(() => this._form.reset(), 200);
    this._form.removeEventListener("submit", this._formCallback);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formCallback = this._formCallback.bind(this);
    this._form.addEventListener("submit", this._formCallback);
  }
}
