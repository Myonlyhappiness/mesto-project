export default class Section {
  constructor(selector, renderer){
    this._container = document.querySelector(selector);
    this.renderer = renderer;
  }

  initialCardsRenderer(items, userInfo){
this._items = items;
this._items.reverse().forEach((item) => {
this.addItem(this.renderer(item, userInfo));
})
  }

  addItem(element){
    this._container.prepend(element);
  }
}
