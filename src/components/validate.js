// Функция запуска валидации
function enableValidation(settings){
  const formList = Array.from(document.querySelectorAll(`.${settings['formSelector']}`));
    formList.forEach((formElement) => setEventListeners(formElement, settings));
    }

//Функция установки слушателей на поля ввода
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(`.${settings['inputSelector']}`));
  const buttonElement = formElement.querySelector(`.${settings['buttonSelector']}`);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', function () {
      checkInputValidity(formElement, inputItem, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

//Функция валидации(переключения) кнопки
function toggleButtonState(inputList, buttonElement, settings) {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(settings['buttonInactiveClass'])
    buttonElement.disabled = true;
  }
   else{
    buttonElement.classList.remove(settings['buttonInactiveClass']);
    buttonElement.disabled = false;
  }
}

//Функция проверки всех полей
function hasInvalidInput(inputList) {
  return inputList.some((item) => !item.validity.valid);
}

//Функция валидации
function checkInputValidity(formElement, inputItem, settings) {
  if(inputItem.validity.patternMismatch){
    inputItem.setCustomValidity(inputItem.dataset.errorMessage)}
    else{
      inputItem.setCustomValidity("");
    }

  if(!inputItem.validity.valid){
    showInputError(formElement, inputItem, settings, inputItem.validationMessage);
  }
  else {
    hideInputError(formElement, inputItem, settings);
  }
  }

  //Функция показа ошибки
function showInputError(formElement, inputItem, settings, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputItem.id}-input-error`);
  inputItem.classList.add(settings['inputErrorClass']);
  errorElement.classList.add(settings['inputErrorActiveClass']);
  errorElement.textContent = errorMessage;
}

//Функция удаления ошибки
function hideInputError(formElement, inputItem, settings) {
  const errorElement = formElement.querySelector(`.${inputItem.id}-input-error`);
  inputItem.classList.remove(settings['inputErrorClass']);
  errorElement.classList.remove(settings['inputErrorActiveClass']);
  errorElement.textContent = ' ';
}

// Функция сброса ошибок полей
function resetInputsErrors(settings) {
  Array.from(document.querySelectorAll(`.${settings['inputErrorActiveClass']}`)).forEach((item) => {

    item.classList.remove(settings['inputErrorActiveClass']);
    item.textContent = '';
  })

  Array.from(document.querySelectorAll(`.${settings['inputErrorClass']}`)).forEach((item) => {
    item.classList.remove(settings['inputErrorClass']);
  })
}

export {enableValidation, resetInputsErrors}
