/** функция показывает ошибки валидности */
function showInputError(formElement, inputElement, config) {
  /** находим errorElement с ошибкой валидации */
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    /** добавляем класс и текст ошибки errorElement */
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
  }
  /** функция убирает отображения ошибки валидности */
  function hideInputError(formElement, inputElement, config) {
    /** находим errorElement с ошибкой валидации */
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    /** удаляем класс и текст ошибки errorElement */
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
  }

  /** функция проверки валидности */
function checkInputValidity(formElement, inputElement, config) {
    /** проверка валидности у inputElement */
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, config);
    } else {
      showInputError(formElement, inputElement, config);
    }
  }
/** функция проверки валидности у всех инпут */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

/** функция включения\выключения кнопки */
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    /** если не валиден инпут блокируем кнопку и добавляем класс у кнопки */
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    /** если валиден инпут разблокирем кнопку и удаляем класс у кнопки */
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}  

/** функция обработки событый */
function setEventListeners(formElement, config) {
    /** находим все инпуты */
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    /** находим кнопку формы */
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
      /** слушатель на имнпут */
      inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
      })
    })
}
/** функция валидации формы */
function enableValidation(config) {
  /** находим все формы */
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    })
  }

