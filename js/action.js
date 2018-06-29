// 자판기와 지갑을 조작하는 클래스

class Action{
  constructor({vendingMachine, wallet}){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.bindFunctions();
  }
  bindFunctions(){
    this.wallet.inputMoneyIntoMachine = this.inputMoneyIntoMachine.bind(this);
    this.vendingMachine.inputMoneyIntoWallet = this.inputMoneyIntoWallet.bind(this);
  }
  inputMoneyIntoMachine(price){
    this.vendingMachine.inputMoney(price);
  }
  inputMoneyIntoWallet(change){
    this.wallet.inputMoney(change);
  }
}

export {Action};