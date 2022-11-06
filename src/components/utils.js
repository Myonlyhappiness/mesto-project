function renderLoading(isLoading, submitButtonText){
  if (isLoading){
    if(submitButtonText.value === "accept"){
      submitButtonText.textContent = "Удаление.."
    }
    else
    submitButtonText.textContent = "Сохранение.."
  }
  else {
    if(submitButtonText.value === "create"){
      submitButtonText.textContent = "Создать"
    }
    if(submitButtonText.value === "accept"){
      submitButtonText.textContent = "Да"
    }
    else if(submitButtonText.value === "save"){
      submitButtonText.textContent = "Сохранить"
    }
   }
}

export {renderLoading}
