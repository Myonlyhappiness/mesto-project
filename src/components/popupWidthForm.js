import Popup from "./popup";

export default class PopupWithForm extends Popup{
  constructor(selector, formCallback){
    super(selector)
    this._formCallback = formCallback;
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.elements)
  }

  getInputValues(){
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value)
  }

  open(){
    super.open();
  }

  close(){
    super.close();
    setTimeout(() => this._form.reset(), 200);

  }

  setEventListeners() {
    super.setEventListeners();
    this._formCallback = this._formCallback.bind(this);
    this._form.addEventListener("submit", this._formCallback);
  }
}
