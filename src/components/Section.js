export default class Section {
	constructor({ renderer }, selectorContainer) {
		this._renderer = renderer; 			 // функция, которая отвечает за создание и отрисовку на странице
		this._container = selectorContainer; // селектор контейнера
	};

	/**  перебирает изначальный массив – initialCards, выуживая из него данные для каждой отдельной карточки. */
	renderItems(items) {

		items.forEach((item) => {
		  this._renderer(item);
		});
	  };

	/** формирует карточку и добавляет ее на странице (в начале списка) */
	addItem(element) {
		this._container.prepend(element);
	};

	addItemAppend(element) {
		this._container.append(element)
	};
};