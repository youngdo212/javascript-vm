// 자판기와 지갑을 조작하는 클래스
class Action{
  constructor({vendingMachine, wallet}){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.timeoutID;
    this.init();
  }
  init(){
    document.addEventListener("click", this.clickEvent.bind(this))
  }
  clickEvent(evt){
    if(evt.target.className === 'money_button') this.selectMoney(evt.target);
    if(evt.target.className === 'itemSelect_button') this.selectItem(evt.target);
  }
  selectMoney(button){
    try{
      const money = this.wallet.takeOutMoney(button.dataset.price);
      this.vendingMachine.inputMoney(money);      
    }
    catch(e){
      console.log(e.message);
    }
  }
  selectItem(button){
    try{
      clearTimeout(this.timeoutID);
      this.vendingMachine.selectNumber(button.textContent);
      this.timeoutID = setTimeout(this.vendingMachine.selectItem.bind(this.vendingMachine), 3000);
    }
    catch(e){
      console.log(e.message);
    }
  }
}

export {Action};