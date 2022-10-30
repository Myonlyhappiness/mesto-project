// Функция запуска валидации
function enableValidation(settings){
  const formList = Array.from(document.querySelectorAll(settings['formSelector']));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      const fieldsetList = Array.from(formElement.querySelectorAll(settings['fieldsetSelector']));
      fieldsetList.forEach((fieldsetItem) => setEventListeners(fieldsetItem, settings));
    });
  }

//Функция установки слушателей на поля ввода
function setEventListeners(fieldsetItem, settings) {
  const inputList = Array.from(fieldsetItem.querySelectorAll(settings['inputSelector']));
  const buttonElement = fieldsetItem.querySelector(settings['buttonSelector']);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', function () {
      checkInputValidity(fieldsetItem, inputItem, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

//Функция валидации(переключения) кнопки
function toggleButtonState(inputList, buttonElement, settings) {
  hasInvalidInput(inputList) ? (buttonElement.classList.add(settings['buttonInactiveClass']),
  buttonElement.disabled = true):
  (buttonElement.classList.remove(settings['buttonInactiveClass']), buttonElement.disabled = false);
}

//Функция проверки всех полей
function hasInvalidInput(inputList) {
  return inputList.some((item) => !item.validity.valid);
}

//Функция валидации
function checkInputValidity(fieldsetItem, inputItem, settings) {
  inputItem.validity.patternMismatch ? inputItem.setCustomValidity(inputItem.dataset.errorMessage):
  inputItem.setCustomValidity("");

  !inputItem.validity.valid ? showInputError(fieldsetItem, inputItem, settings, inputItem.validationMessage):
  hideInputError(fieldsetItem, inputItem, settings);
  }

  //Функция показа ошибки
function showInputError(fieldsetItem, inputItem, settings, errorMessage) {
  const errorElement = fieldsetItem.querySelector(`.${inputItem.id}-input-error`);
  inputItem.classList.add(settings['inputErrorClass']);
  errorElement.classList.add(settings['inputErrorActiveClass']);
  errorElement.textContent = errorMessage;
}

//Функция удаления ошибки
function hideInputError(fieldsetItem, inputItem, settings) {
  const errorElement = fieldsetItem.querySelector(`.${inputItem.id}-input-error`);
  inputItem.classList.remove(settings['inputErrorClass']);
  errorElement.classList.remove(settings['inputErrorActiveClass']);
  errorElement.textContent = ' ';
}

// Функция сброса ошибок полей
function resetInputsErrors() {
  Array.from(document.querySelectorAll('.popup__container-item-error_active')).forEach((item) => {
    item.classList.remove('popup__container-item-error_active');
    item.textContent = '';
  })

  Array.from(document.querySelectorAll('.popup__container-item-error')).forEach((item) => {
    item.classList.remove('popup__container-item-error');
  })
}

export {enableValidation, resetInputsErrors}
