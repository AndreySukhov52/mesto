/** класс Popup  */
    export class Popup{
      constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
      };
    
      /** закрытие popup на кнопку ESC */
      _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
          this.close();
        };
      };
    
      /** закрытие popup */
      close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keydown", this._handleEscClose);
      };
    
      /** открытие popup */
      open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keydown", this._handleEscClose);
      };
    
      /** слушатели закрытия на крестик и затемнённую область вокруг формы */
      setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            this.close()
        };
        });
      };
    
    };