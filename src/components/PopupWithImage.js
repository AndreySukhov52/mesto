import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector('.popup__fullscreen');
    this._imgTitle = this._popup.querySelector('.popup__title-mesto');
  };

  open({ value }) {
    this._imgTitle.textContent = value.name;
    this._img.src = value.link;
    this._img.alt = value.name;
    super.open();
  };
};