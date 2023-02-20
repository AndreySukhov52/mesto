/** класс Card  */
export default class Card {
    /** конструктор класса  */
    constructor(data, handleCardClick, templateSelector) {
        this._title = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    };

    /** метод создания разметки карточки из template  */
    _getTemplateCard() {
        const cardElement = document.querySelector(this._templateSelector).content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    };

    /** метод удаления карточки  */
    _deleteCard() {
        this._newCard.remove();
        this._newCard = null;
    };

    /** метод активации лайка  */
    _clickLike() {
        this._likeButton.classList.toggle('element__like_activ');
    };

    /** метод для установки слушателей  */
    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => { this._deleteCard() });

        this._likeButton.addEventListener('click', () => { this._clickLike() });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    };

    /** метод создания карточки  */
    generateCard() {
        this._newCard = this._getTemplateCard();
        this._cardImage = this._newCard.querySelector('.element__image');
        this._deleteButton = this._newCard.querySelector('.element__delete');
        this._likeButton = this._newCard.querySelector('.element__like');
        this._imageTitle = this._newCard.querySelector('.element__text');
        
        this._imageTitle.textContent = this._title;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._setEventListeners();

        return this._newCard;
    };

    getCardName() {
        return this._title;
    };

    getCardLink() {
        return this._link;
    };

};



