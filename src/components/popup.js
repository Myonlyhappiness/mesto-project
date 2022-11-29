export default class Popup {
  constructor(selector){
    this._selector = selector;
    this._generalSelector = document.querySelector(".general");
  }

  open(){
  this._generalSelector.style.overflowY = "hidden";
  this._selector.classList.add("popup_opened");
  this._setEventListeners();
}

  close(){
  this._generalSelector.style.overflow = "";
  this._selector.classList.remove("popup_opened");
  this._selector.removeEventListener("mousedown", this._closePopupBackgroundClick);
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

  _setEventListeners(){
    this._selector.addEventListener("mousedown", (event) => this._closePopupBackgroundClick(event));
    this._selector.querySelector(".popup__close-button").addEventListener("click", () => this.close(this._selector))
    document.addEventListener("keydown", (event) => this._handleEscClose(event));
  }
}
