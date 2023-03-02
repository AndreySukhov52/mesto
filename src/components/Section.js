export class Section {
    constructor({renderer}, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    };
  
    /** добавляет карточку в контейнер(element) */
    addItem(element){
      this._container.append(element);
    };
  
    /** метод добавляет карточку в начало */
    addNewItem(element) {
      this._container.prepend(element);
    };
  
   /** метод рендерит карточку */
    renderItems(items) {
  
      items.forEach((item) => {
        this._renderer(item);
      });
    };
  
  };