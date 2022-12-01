export default class FormValidator {
  constructor(formSelectors, formElement){
    this._formSelectors = formSelectors;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._formSelectors['inputSelector']}`));
    this._buttonElement = this._formElement.querySelector(`.${this._formSelectors['buttonSelector']}`);
  }

  // Функция запуска валидации
    enableValidation(){
      this._setEventListeners();
      }

  //Функция установки слушателей на поля ввода
    _setEventListeners() {
      this._inputList.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
          this._checkInputValidity(inputItem);
          this._toggleButtonState();
          });
        });
    }

  //Функция валидации(переключения) кнопки
    _toggleButtonState() {
      if(this._hasInvalidInput()){
        this._buttonElement.classList.add(this._formSelectors['buttonInactiveClass'])
        this._buttonElement.disabled = true;
      }
      else{
        this._buttonElement.classList.remove(this._formSelectors['buttonInactiveClass']);
        this._buttonElement.disabled = false;
      }
    }

  //Функция проверки всех полей
    _hasInvalidInput() {
      return this._inputList.some((item) => !item.validity.valid);
}

  //Функция валидации
    _checkInputValidity(inputItem) {
      if(inputItem.validity.patternMismatch){
        inputItem.setCustomValidity(inputItem.dataset.errorMessage)}
      else{
        inputItem.setCustomValidity("");
      }

      if(!inputItem.validity.valid){
        this._showInputError(inputItem, inputItem.validationMessage);
      }
      else {
        this._hideInputError(inputItem);
      }
    }

  //Функция показа ошибки
    _showInputError(inputItem, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputItem.id}-input-error`);
      inputItem.classList.add(this._formSelectors['inputErrorClass']);
      errorElement.classList.add(this._formSelectors['inputErrorActiveClass']);
      errorElement.textContent = errorMessage;
}

  //Функция удаления ошибки
    _hideInputError(inputItem) {
      const errorElement = this._formElement.querySelector(`.${inputItem.id}-input-error`);
      inputItem.classList.remove(this._formSelectors['inputErrorClass']);
      errorElement.classList.remove(this._formSelectors['inputErrorActiveClass']);
      errorElement.textContent = ' ';
    }

  // Функция сброса ошибок полей и валидации(переключения) кнопки при открытии попапов
    resetInputsErrors() {
      this._toggleButtonState();
      Array.from(document.querySelectorAll(`.${this._formSelectors['inputErrorActiveClass']}`)).forEach((item) => {
        item.classList.remove(this._formSelectors['inputErrorActiveClass']);
        item.textContent = '';
      })
      Array.from(document.querySelectorAll(`.${this._formSelectors['inputErrorClass']}`)).forEach((item) => {
        item.classList.remove(this._formSelectors['inputErrorClass']);
      })
    }
}
