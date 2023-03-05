/** класс Card  */
export default class Card {
  /** конструктор класса  */
  constructor(data, userId, templateSelector, handleCardClick, handleLikeClick, handleDeleteButtonClick) {
    this._data = data
    this._itemName = data.name;
    this._itemLink = data.link;
    this._likes = data.likes;
    this._cardId = data._id
    this._userId = userId
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._isUserCard = userId === data.owner._id;
    this._element = this._getTemplate();
    this._elementImg = this._cardElement.querySelector('.element__image'); //найдем картинку 
    this._elementTitle = this._cardElement.querySelector('.element__text'); //заголовок
    this._elementDelete = this._cardElement.querySelector('.element__delete');
    this._elementLike = this._cardElement.querySelector('.element__like'); //добавляем функциональность лайкам
    this._counterLikes = this._cardElement.querySelector('.element__count-like');
  };

  /**  Проверка юзер-лайков */
  checkUserLikes() {
    return this._likes.some(item => item._id === this._userId);
  };

  /**  ID карточки */
  getIdCard() {
    return this._cardId
  };

  /**  Трансформ лайка после проверки */
  colorLikes() {
    if (this.checkUserLikes()) {
      this._addLike()
    } else {
      this._deleteLike()
    }
  };

  /**  Добавить лайк */
  _addLike() {
    this._elementLike.classList.add('element__like_activ')
  };

  /**  Удалить лайк */
  _deleteLike() {
    this._elementLike.classList.remove('element__like_activ')
  };

  _setListenersItems() {
    this._elementDelete.addEventListener('click', () => {
      this._handleDeleteButtonClick(this);
    });

    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
      this.colorLikes()
    });
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._itemName, this._itemLink);
    });

    if (!this._isUserCard) {
      this._elementDelete.remove();
      this._elementDelete = null;
    }
  };

  _getTemplate() {
    /**  забираем разметку из HTML и клонируем элемент */
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    /**  вернём DOM-элемент карточки */
    return this._cardElement;
  };

  createElements() {
    this._elementTitle.textContent = this._itemName;
    this._elementImg.alt = this._itemName;
    this._elementImg.src = this._itemLink
    this._counterLikes.textContent = this._likes.length;
    this.setLikes(this._likes)
    this._setListenersItems();
    return this._element;
  };

  /**  Установить лайк */
  setLikes(likesList) {
    this._likes = likesList
    this._counterLikes.textContent = this._likes.length
    this.colorLikes()
  };

  /**  удалить карточку со страницы */
  delCard() {
    this._element.remove();
    this._element = null;
  };
};
