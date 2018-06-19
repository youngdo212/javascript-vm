// 자판기의 데이터와 작동을 갖고 있는 클래스

class VendingMachine{
  constructor({template, itemData, vendingMachineWrap}){
    this.template = template;
    this.itemData = itemData;
    this.vendingMachineWrap = vendingMachineWrap;
    this.itemList = this.vendingMachineWrap.querySelector('.item_list');
    this.logBox = this.vendingMachineWrap.querySelector('.log_box');
    this.totalMoney = this.vendingMachineWrap.querySelector('.vm_money_box > span');
    this.selectedNumber = null;
    this.timeoutID = null;
    this.vendingMachineWrap.addEventListener('click', this.selectItem.bind(this));
    this.render();
    this.items = Array.from(this.itemList.children);
  }
  render(){
    let html = '';
    this.itemData.forEach(item => {
      html += this.template(item);
    })
    this.itemList.innerHTML = html;
  }
  inputMoney(price){
    this.increaseTotalMoney(price)
    this.printMessage(`${price}원이 투입되었습니다!`)
    this.highlightItems()
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
  isAvailableItem(item){
    return Number(item.dataset.price) <= Number(this.totalMoney.textContent);
  }
  highlightItem(item){
    item.querySelector('.item_name').classList.add('highlight');
  }
  deHighlightItem(item){
    item.querySelector('.item_name').classList.remove('highlight');
  }
  selectItem({target}){
    if(target.tagName !== 'BUTTON') return;

    this.selectNumber(target.textContent);
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(this.run.bind(this), 3000);
  }
  selectNumber(number){
    this.selectedNumber = this.selectedNumber || '';
    this.selectedNumber += number;
  }
  run(){
    const item = this.getItem(this.selectedNumber);

    if(!this.isValidItem(item)) return;

    const price = item.dataset.price;
    const itemName = item.querySelector('.item_name').textContent;

    this.decreaseTotalMoney(price);
    this.printMessage(`${itemName} 선택!`);
    this.highlightItems();
  }
  isValidItem(item){
    if(!item){
      this.printMessage('해당 번호의 아이템이 존재하지 않습니다');
      return false;
    }
    if(Number(item.dataset.price) > Number(this.totalMoney.textContent)){
      this.printMessage('돈이 부족합니다')
      return false;
    }

    return true;
  }
  getItem(number){
    this.selectedNumber = null;
    return this.itemList.querySelector(`[data-number='${number}']`);
  }
  decreaseTotalMoney(price){
    this.totalMoney.textContent -= price;
  }
}

export {VendingMachine};