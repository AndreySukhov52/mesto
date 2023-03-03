import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
		super(popupSelector);
		this._img = this._popupElement.querySelector('.popup__fullscreen')
		this._imgTitle = this._popupElement.querySelector('.popup__title-mesto')
	};

	open(name, link) {
		this._imgTitle.textContent = name;
		this._img.src = link;
		this._img.alt = name;
		super.open();
	};
};
