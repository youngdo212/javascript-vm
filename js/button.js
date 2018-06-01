class MoneyButton{
  constructor({moneyButtonList, moneyCountList, vendingMachine, wallet}){
    this.moneyButtonList = moneyButtonList;
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.init();
  }
  init(){
    this.moneyButtonList.addEventListener("click", this.inputMoneyToMachine.bind(this));
  }
  inputMoneyToMachine(evt){
    const price = Number(evt.target.dataset.price);
    if(evt.target.tagName === "BUTTON" && this.wallet.moneyCountList.getCount(price) > 0){
      this.wallet.moneyCountList.countDown(price);
      this.wallet.takeOutMoney(price);
      this.vendingMachine.inputMoney(price);
    }else return;
  }
}

let wallet = new Wallet({
  money: document.querySelector("#total_money_box").firstElementChild,
})

let vm = new VendingMachine({
  money: document.querySelector("#vm_money_box").firstElementChild
})

let moneyButton = new MoneyButton({
  moneyButtonList: document.querySelector("#money_button_list"),
  vendingMachine: vm,
  wallet: wallet
})