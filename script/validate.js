function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
  }
  
  function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
  }

function checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, config);
    } else {
      showInputError(formElement, inputElement, config);
    }
  }

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputList.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement, config);
    })
}

  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement, config) => {
        setEventListeners(formElement, config);
    })
  }

