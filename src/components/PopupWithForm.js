import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
	constructor(popupSelector, submitForm) {
		super(popupSelector);
		this._submitForm = submitForm;
		this._form = this._popupElement.querySelector('.popup__form');
		this._inputs = this._popupElement.querySelectorAll('.popup__input');
		this._submitButtonElement = this._popupElement.querySelector('.popup__button');
	};

	/** _getInputValues - приватный метод: собрать данные всех полей формы. */
	_getInputValues() {
		this._formValues = {};
		this._inputs.forEach((input) => {
			this._formValues[input.name] = input.value
		});
		return this._formValues;
	};

	/** перезаписать родительский метод setEventListeners */
	setEventListeners() {
		super.setEventListeners();
		this._popupElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitForm(this._getInputValues());
		});
	};

	/** перезаписать родительский метод close */
	close() {

		this._form.reset();
		super.close();
	};

	/** изменить текст кнопки submit в процессе обмена данными с сервером */
	renderLoading(isLoading) {
		if (isLoading === true) {
			this._submitButtonElement.textContent = 'Сохранение...';
		} else {
			this._submitButtonElement.textContent = 'Сохранить';
		}
	};
};