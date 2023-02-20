import { Popup } from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector, image, title) {
      super(selector);
      this._image = image;
      this._title = title;
    };
  
    openPopup(title, link) {
      this._image.src = link;
      this._title.textContent = title;
      this._image.alt = title;
      super.openPopup();
    };
  };

