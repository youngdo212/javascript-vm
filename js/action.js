// 자판기와 지갑을 조작하는 클래스

class Action{
  constructor({vendingMachine, wallet}){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.init();
  }
  init(){
    this.wallet.inputMoneyIntoMachine = this.inputMoneyIntoMachine.bind(this);
  }
  inputMoneyIntoMachine(price){
    this.vendingMachine.inputMoney(price);
  }
}

export {Action};