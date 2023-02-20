class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
      };

    /** открытие popup */
    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
      };
    
    /** закрытие popup */
    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
      };

    /** закрытие popup на кнопку ESC */
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
          this.closePopup();
        }
      };

    /** слушатели закрытия на крестик и затемнённую область вокруг формы */
    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => {
          this.closePopup();
        });
        this._popup.addEventListener('mousedown', (evt) => {
          if (evt.target === evt.currentTarget) {
            this.closePopup();
          }
        });
      };
    };
    
    export { Popup };