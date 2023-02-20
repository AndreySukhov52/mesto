export default class Section {
    constructor({ items, renderer }, selector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    };

    /** добавляет карточку в контейнер(element) */
    addItem(element) {
        this._container.append(element);
    };

    /** метод рендерит карточку */
    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item));
    };

    /** метод добавляет карточку в начало */
    addLeftItem(element) {
        this._container.prepend(element);
    };
};