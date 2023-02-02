/** класс Card  */
class Card {
    /** конструктор класса  */
    constructor(data, templateSelector, fullScreenCard) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openFullScreenCard = fullScreenCard;
    }

    /** метод создания разметки карточки из template  */
    _getTemplateCard() {
        const cardElement = document.querySelector(this._templateSelector).content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    /** метод заполнения карточки данными  */
    _setData() {
        this._newCard.querySelector('.element__text').textContent = this._name;
        this._newCard.querySelector('.element__image').src = this._link;
        this._newCard.querySelector('.element__image').alt = this._name;
    }

    /** метод удаления карточки  */
    _deleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    /** метод активации лайка  */
    _clickLike() {
        this._likeButton.classList.toggle('element__like_activ');
    }

    /** метод для установки слушателей  */
    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => { this._deleteCard() });

        this._likeButton.addEventListener('click', () => { this._clickLike() });

        this._cardImage.addEventListener('click', () => { this._openFullScreenCard(this._name, this._link) });
    }

    /** метод создания карточки  */
    generateCard() {
        this._newCard = this._getTemplateCard();
        this._cardImage = this._newCard.querySelector('.element__image');
        this._deleteButton = this._newCard.querySelector('.element__delete');
        this._likeButton = this._newCard.querySelector('.element__like');
        this._setData();
        this._setEventListeners();

        return this._newCard;
    }
};

export { Card };


