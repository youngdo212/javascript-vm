// 자판기의 데이터와 작동을 갖고 있는 클래스
class VendingMachine{
  constructor({template}){
    this.template = template;
    this.totalMoney = document.querySelector("#vm_money_box>span");
    this.items = Array.from(document.querySelectorAll(".item_name"));
    this.logBox = document.querySelector("#log_box");
  }
  inputMoney(money){
    this.totalMoney.textContent = Number(this.totalMoney.textContent) + money;
    this.highlightItem();
    this.logging(this.template.getInputMoneyLogMsg(money));
  }
  highlightItem(){
    this.dehighlightAll();
    this.items.filter(item => +item.dataset.price <= +this.totalMoney.textContent)
    .forEach(item => {
      item.classList.add("highlight");
    })
  }
  dehighlightAll(){
    this.items.forEach(item =>{
      item.classList.remove('highlight');
    })
  }
  getItem(number){
    const item = this.items.filter(item => item.dataset.number === number).pop();
    if(!item) throw new Error(`일치하는 번호의 물품이 없습니다 : ${number}`);
    return item
  }
  selectItem(number){
    const targetItem = this.getItem(number);
    this.decreaseMoney(+targetItem.dataset.price);
    this.logging(this.template.getSelectItemLogMsg(targetItem.textContent));
    this.highlightItem();
  }
  decreaseMoney(money){
    if(+this.totalMoney.textContent < money) throw new Error('자판기 금액이 부족합니다');
    this.totalMoney.textContent -= money;
  }
  logging(content){
    const newLog = document.createElement("DIV");
    const text = document.createTextNode(content);

    if(this.logBox.children.length >= 10) this.logBox.removeChild(this.logBox.firstElementChild);

    newLog.appendChild(text);
    this.logBox.appendChild(newLog);
  }
}