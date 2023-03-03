export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    this._spanErrors = Array.from(this._form.querySelectorAll('.popup__input-error'));
  };

  /** метод показывает ошибки валидности */
  _showInputError(inputElement) {
    /** находим errorElement с ошибкой валидации */
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    /** добавляем класс и текст ошибки errorElement */
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  /** метод убирает отображения ошибки валидности */
  _hideInputError(inputElement) {
    /** находим errorElement с ошибкой валидации */
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    /** удаляем класс и текст ошибки errorElement */
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  /** метод проверки валидности у всех инпут */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  /** метод включения\выключения кнопки */
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  /** метод проверки валидности */
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement)
    }
  };

  /** метод обработки событый */
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  /** метод валидации формы */
  enableValidation() {
    this._setEventListeners();
  };

  /** метод отключает кнопку в форме добавления карточки при первом открытии */
  disableAddCardPopupButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  /** метод активирует кнопку профиля при открытии попапа */
  switchProfileButtonMode() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  /**  метод скрывает спаны с ошибкой и удаляет стили невалидных инпутов */
  resetValidation() {
    this._spanErrors.forEach((span) => {
      span.textContent = '';
    })
    this._inputList.forEach((input) => {
      input.classList.remove(this._config.inputErrorClass);
    })
  };
};