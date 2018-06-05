class Action{
  constructor({vendingMachine, wallet}){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.init();
  }
  init(){
    document.addEventListener("click", this.clickEvent.bind(this))
  }
  clickEvent(evt){
    if(evt.target.className === 'money_button') this.selectMoney(evt.target);
  }
  selectMoney(button){
    try{
      const money = this.wallet.takeOutMoney(button.dataset.price);
      this.vendingMachine.inputMoney(money);      
    }
    catch(e){
      alert(e.message);
    }
  }
}
