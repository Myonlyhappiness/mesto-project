export default class Section {
  constructor({items, renderer}, selector){
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  initialCardsRenderer(){
this._items.reverse().forEach((item) => {
this._renderer(item);
})
  }

  addItem(element){
    this._selector.prepend(element);
  }
}
