/*
자판기의 담긴 돈을 처리하는 클래스
*/
class VmTotalMoney{
  constructor({totalMoney}){
    this.totalMoney = totalMoney;
  }

  get(){
    return this.totalMoney.textContent;
  }

  increase(price){
    this.totalMoney.textContent = Number(this.totalMoney.textContent) + Number(price);
  }

  decrease(price){
    this.totalMoney.textContent = Number(this.totalMoney.textContent) - Number(price);
  }

  return(){
    const totalMoney = this.totalMoney.textContent;
    const change = this.makeChange(totalMoney);

    this.decrease(totalMoney);

    return change;
  }

  makeChange(money){
    const change = {};
    const priceUnits = [10000, 5000, 1000, 500, 100, 50, 10];

    priceUnits.forEach(price => {
      const [count, remainder] = [Math.floor(money/price), money%price];
      if(count) change[price] = count;
      money = remainder;
    })

    return change;
  }
}

/*
아이템 선택 버튼에 이벤트를 등록하는 클래스
*/
class SelectButtonList{
  constructor({selectButtonList}){
    this.selectButtonList = selectButtonList
  }

  bindSelectItem(handler){
    this.selectButtonList.addEventListener('click', ({target}) => {
      if(target.tagName !== 'BUTTON') return;
      handler(target.textContent);
    })
  }
}

/*
log box에 로그를 찍는 클래스
*/
class LogBox{
  constructor({logBox}){
    this.logBox = logBox;
  }

  printMessage(message){
    const log = document.createElement("DIV");
    const text = document.createTextNode(message);
    log.appendChild(text);

    if(this.logBox.children.length >= 10) this.logBox.removeChild(this.logBox.firstElementChild);

    this.logBox.appendChild(log);
  }
}

/*
아이템들을 다루는 클래스
*/
class ItemList{
  constructor({itemList, template, itemData}){
    this.itemList = itemList;
    this.template = template;
    this.render(itemData);
  }

  render(itemData){
    itemData.forEach(item => {
      this.itemList.innerHTML += this.template.itemList(item);
    })
  }

  highlight(money){
    const items = this.itemList.childNodes; // 클래스 변수로 선언할까?

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
    const item = this.itemList.querySelector(`[data-number='${number}']`);

    if(!item) return null;

    const isHighlight = item.querySelector('.item_name').className.includes('highlight');

    if(!isHighlight) return null;

    return item;
  }
}

/*
자판기의 기능을 컨트롤하는 클래스
*/
class VendingMachine{
  constructor({itemList, totalMoney, selectButtonList, logBox, delayTime = 3000}){
    this.itemList = itemList;
    this.totalMoney = totalMoney;
    this.selectButtonList = selectButtonList;
    this.logBox = logBox;
    this.delayTime = delayTime;
    this.selectedNumber = '';

    this.runTimeoutID = null;
    this.returnMoneyTimeoutID = null;

    this.selectButtonList.bindSelectItem(this.selectNumber.bind(this));
  }

  inputMoney(moneyData){
    let price = 0;

    Object.keys(moneyData).forEach(moneyUnit => {
      const count = moneyData[moneyUnit]
      price += Number(moneyUnit) * Number(count);
    })

    clearTimeout(this.returnMoneyTimeoutID);

    this.totalMoney.increase(price);
    this.logBox.printMessage(`${price}원이 투입되었습니다!`);
    this.itemList.highlight(this.totalMoney.get());
  }

  selectNumber(number){
    clearTimeout(this.runTimeoutID);
    clearTimeout(this.returnMoneyTimeoutID);

    this.selectedNumber += number;

    this.runTimeoutID = setTimeout(this.run.bind(this), this.delayTime);
  }

  run(){ // refactor
    const item = this.itemList.getItem(this.selectedNumber);
    this.selectedNumber = '';

    if(!item){
      this.logBox.printMessage('올바른 번호를 입력하세요');
      return;
    }

    const itemName = item.querySelector('.item_name').textContent;
    const price = item.dataset.price;

    this.logBox.printMessage(`${itemName} 선택!`);
    this.totalMoney.decrease(price);
    this.itemList.highlight(this.totalMoney.get())

    if(this.totalMoney.get()) this.returnMoneyTimeoutID = setTimeout(this.returnMoney.bind(this), this.delayTime);
  }

  returnMoney(){
    const change = this.totalMoney.return();
    this.itemList.highlight(0);
    this.logBox.printMessage(`잔돈이 반환되었습니다!`);
    this.throwMoney(change);
  }

  bindThrowMoney(handler){
    this.throwMoney = handler;
  }
}

export {ItemList, VmTotalMoney, SelectButtonList, LogBox, VendingMachine};