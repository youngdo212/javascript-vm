// 자판기의 데이터와 작동을 갖고 있는 클래스

class VendingMachine{
  constructor({vendingMachineWrap, itemData, template, delayTime = 3000}){
    this.vendingMachineWrap = vendingMachineWrap;
    this.itemList = this.vendingMachineWrap.querySelector('.item_list');
    this.logBox = this.vendingMachineWrap.querySelector('.log_box');
    this.totalMoney = this.vendingMachineWrap.querySelector('.vm_money_box > span');
    this.delayTime = delayTime
    this.selectedNumber = '';
    this.runTimeoutID = null;
    this.returnMoneyTimeoutID = null;
    this.items = null;
    this.inputMoneyIntoWallet = null;

    this.render({data: itemData, template: template});
    this.collectItems();
    this.addAllEventListener();
  }
  addAllEventListener(){
    this.vendingMachineWrap.addEventListener('click', this.selectItem.bind(this));
  }
  render({data, template}){
    this.itemList.innerHTML = data.reduce((html, elem) => html+template(elem), '');
  }
  collectItems(){
    this.items = this.itemList.childNodes;
  }
  inputMoney(price){
    clearTimeout(this.returnMoneyTimeoutID);
    this.increaseTotalMoney(price);
    this.printMessage(`${price}원이 투입되었습니다!`);
    this.highlightItems();
  }
  increaseTotalMoney(price){
    this.totalMoney.textContent = Number(this.totalMoney.textContent) + Number(price);
  }
  printMessage(message){
    const log = document.createElement("DIV");
    const text = document.createTextNode(message);

    if(this.logBox.children.length >= 10) this.logBox.removeChild(this.logBox.firstElementChild);

    log.appendChild(text);
    this.logBox.appendChild(log);
  }
  highlightItems(){
    this.items.forEach(item=>{
      this.isAvailableItem(item) ? this.highlightItem(item) : this.deHighlightItem(item);
    })
  }
  isAvailableItem({dataset:{price}}){
    return Number(price) <= Number(this.totalMoney.textContent);
  }
  highlightItem(item){
    item.querySelector('.item_name').classList.add('highlight');
  }
  deHighlightItem(item){
    item.querySelector('.item_name').classList.remove('highlight');
  }
  selectItem({target:{tagName, textContent}}){
    if(tagName !== 'BUTTON') return;
    this.selectNumber(textContent);
    clearTimeout(this.runTimeoutID);
    clearTimeout(this.returnMoneyTimeoutID);
    this.runTimeoutID = setTimeout(this.run.bind(this), this.delayTime);
  }
  selectNumber(number){
    this.selectedNumber = this.selectedNumber || '';
    this.selectedNumber += number;
  }
  run(){
    const item = this.getItem(this.selectedNumber);
    
    if(!this.isValidItem(item)) return;
    
    this.returnMoneyTimeoutID = setTimeout(this.returnMoney.bind(this), this.delayTime);
    const price = item.dataset.price;
    const itemName = item.querySelector('.item_name').textContent;

    this.decreaseTotalMoney(price);
    this.printMessage(`${itemName} 선택!`);
    this.highlightItems();
  }
  isValidItem(item){
    return this.isWrongNumber(item) ? false : this.isExpensive(item) ? false : true;
  }
  isWrongNumber(item){
    if(!item){
      this.printMessage('해당 번호의 아이템이 존재하지 않습니다');
      return true;
    }
    return false
  }
  isExpensive(item){
    if(Number(item.dataset.price) > Number(this.totalMoney.textContent)){
      this.printMessage('돈이 부족합니다')
      return true;
    }
    return false
  }
  getItem(number){
    this.selectedNumber = '';
    return this.itemList.querySelector(`[data-number='${number}']`);
  }
  decreaseTotalMoney(price){
    this.totalMoney.textContent -= price;
  }
  returnMoney(){
    const totalMoney = this.totalMoney.textContent;
    const change = this.makeChange(totalMoney);

    this.decreaseTotalMoney(totalMoney);
    this.highlightItems();
    this.printMessage(`${totalMoney}원이 반환되었습니다`);
    this.inputMoneyIntoWallet(change);
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

export {VendingMachine};