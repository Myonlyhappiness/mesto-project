export default class Popup {
  constructor(selector){
    this._popup = document.querySelector(selector);
    this._generalSelector = document.querySelector(".general");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupBackgroundClick = this._closePopupBackgroundClick.bind(this)
  }

  open(){
  this._generalSelector.style.overflowY = "hidden";
  this._popup.classList.add("popup_opened");
  document.addEventListener("keydown", this._handleEscClose);
}

  close(){
  this._generalSelector.style.overflow = "";
  this._popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", this._handleEscClose);
}

  _handleEscClose(event){
    if (event.key === "Escape"){
      this.close()}
  }

  _closePopupBackgroundClick(event){
    if(event.target.classList.contains("popup_opened"))
    {this.close()};
    if(event.target.classList.contains("popup-delete-card"))
    {this.close()};
  }

  setEventListeners(){
    this._popup.addEventListener("mousedown", this._closePopupBackgroundClick);
    this._popup.querySelector(".popup__close-button").addEventListener("click", () => this.close())
  }
}
