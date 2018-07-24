import {ItemList} from "../../js/vendingMachine/itemList.js"

function initializeDOM(){
  document.body.innerHTML = `
  <ul class='item_list'></ul>
  `
}

beforeEach(() => {
  initializeDOM();
});


test("_isAvailableItem: 물건의 가격이 돈보다 작거나 같다면 true를 반환한다", () => {
  let itemList = new ItemList({
    itemList: document.querySelector('.item_list')
  });
  let money = 3000;
  let item = document.createElement('li');
  item.setAttribute('data-price', 2000);

  expect(itemList._isAvailableItem(item, money)).toBe(true)
})


test("_isAvailableItem: 물건의 가격이 돈보다 크다면 false를 반환한다", () => {
  let itemList = new ItemList({
    itemList: document.querySelector('.item_list')
  });
  let money = 1000;
  let item = document.createElement('li');
  item.setAttribute('data-price', 2000);

  expect(itemList._isAvailableItem(item, money)).toBe(false);
})


test("_highlightItem: 물건의 클래스에 highlight이 정상적으로 추가된다", () => {
  let itemList = new ItemList({
    itemList: document.querySelector('.item_list')
  });
  let item = document.createElement('li');
  item.innerHTML = `
  <dl>
    <dt class='item_name'>콜라</dt>
    <dd>1. 500</dd>
  </dl>
  `

  // when
  itemList._highlightItem(item);

  expect(item.querySelector('.item_name').className.includes('highlight')).toBe(true);
})


test("_deHighlightItem: 물건의 클래스에 highlight이 정상적으로 삭제된다", () => {
  let itemList = new ItemList({
    itemList: document.querySelector('.item_list')
  });
  let item = document.createElement('li');
  item.innerHTML = `
  <dl>
    <dt class='item_name highlight'>콜라</dt>
    <dd>1. 500</dd>
  </dl>
  `

  // when
  itemList._deHighlightItem(item);

  expect(item.querySelector('.item_name').className.includes('highlight')).toBe(false);
})