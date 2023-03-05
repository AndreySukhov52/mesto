import Popup from "./Popup.js"

export default class PopupConfirmation extends Popup {
  constructor(popup, handleDeleteClick) {
    super(popup);
    this._submitButton = this._popupElement.querySelector('.popup__button');
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._handleDeleteClick = handleDeleteClick;
  };

  renderLoading(isLoading) {
    if (isLoading === true) {
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = 'Да';
    }
  };

  open(card) {
    super.open()
    //this._id = id;
    this._card = card;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleDeleteClick(this._card);
    });
  };
};

