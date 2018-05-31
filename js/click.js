class VendingMachine{
  constructor(){
    this.buttonList = document.querySelector("#money_button_list");
    this.moneyNumberList = document.querySelector("#money_number_list").children;
    this.walletTotalMoney = document.querySelector("#total_money_box>span");
    this.inputMoney = document.querySelector("#input_money_box>span");
  }
  init(){
    this.buttonList.addEventListener("click", this.clickEvent.bind(this));
  }
  clickEvent(evt){
    if(evt.target.tagName === "BUTTON"){
      const index = evt.target.getAttribute("index");
      const amount = evt.target.getAttribute("amount");
      this.action(index, Number(amount));
    }
  }
  action(index, amount){
    if(this.moneyNumberList[index].firstElementChild.textContent > 0){
      this.decreaseMoneyNumber(index);
      this.decreaseWalletMoney(amount);
      this.increaseInputMoney(amount);
    }
  }
  decreaseMoneyNumber(index){
    const target = this.moneyNumberList[index].firstElementChild;
    target.textContent = Number(target.textContent) -1;
  }
  decreaseWalletMoney(amount){
    const target = this.walletTotalMoney;
    target.textContent = Number(target.textContent) - amount;
  }
  increaseInputMoney(amount){
    const target = this.inputMoney;
    target.textContent = Number(target.textContent) + amount;
  }
}

let vendingMachine = new VendingMachine();
vendingMachine.init();