/*
아이템들을 다루는 클래스
*/
class ItemList{
  constructor({itemList, template, itemData}){
    this.$itemList = itemList;
    this.oTemplate = template;
    this.render(itemData);
  }

  render(itemData){
    itemData.forEach(item => {
      this.$itemList.innerHTML += this.oTemplate.itemList(item);
    })
  }

  highlight(money){
    const items = this.$itemList.childNodes; // 클래스 변수로 선언할까?

    items.forEach(item => {
      this.isAvailableItem({item: item, money: money}) ? this.highlightItem(item) : this.deHighlightItem(item);
    })
  }

  isAvailableItem({item: {dataset: {price}}, money}){
    return Number(price) <= Number(money);
  }

  highlightItem(item){
    item.querySelector('.item_name').classList.add('highlight');
  }

  deHighlightItem(item){
    item.querySelector('.item_name').classList.remove('highlight');
  }

  getItem(number){ // refactor
    const item = this.$itemList.querySelector(`[data-number='${number}']`);

    if(!item) return null;

    const isHighlight = item.querySelector('.item_name').className.includes('highlight');

    if(!isHighlight) return null;

    return item;
  }
}

export {ItemList};