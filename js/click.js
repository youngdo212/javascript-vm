class MoneyButton{
  constructor({moneyButtonList, moneyCountList, vendingMachine, wallet}){
    this.moneyButtonList = moneyButtonList;
    this.moneyCountList = moneyCountList;
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.init();
  }
  init(){
    this.moneyButtonList.addEventListener("click", this.inputMoneyToMachine.bind(this));
  }
  inputMoneyToMachine(evt){
    const price = Number(evt.target.dataset.price);
    if(evt.target.tagName === "BUTTON" && this.moneyCountList.getCount(price) > 0){
      this.moneyCountList.countDown(price);
      this.wallet.takeOutMoney(price);
      this.vendingMachine.inputMoney(price);
    }else return;
  }
}

class MoneyCountList{
  constructor({moneyCountList}){
    this.moneyCountList = moneyCountList;
  }
  getCount(type){
    return this.moneyCountList.querySelector(`[data-price="${type}"]>span`).textContent;
  }
  countDown(type){
    const target = this.moneyCountList.querySelector(`[data-price="${type}"]>span`);
    target.textContent -= 1;
  }
}

class VendingMachine{
  constructor({money}){
    this.money = money;
  }
  inputMoney(price){
    this.money.textContent = +this.money.textContent + price;
  }
}

class Wallet{
  constructor({money}){
    this.money = money;
  }
  takeOutMoney(price){
    this.money.textContent = +this.money.textContent - price;
  }
}

let vm = new VendingMachine({
  money: document.querySelector("#vm_money_box").firstElementChild
})


let wallet = new Wallet({
  money: document.querySelector("#total_money_box").firstElementChild
})

let moneyCountList = new MoneyCountList({
  moneyCountList: document.querySelector("#money_count_list")
})

let moneyButton = new MoneyButton({
  moneyButtonList: document.querySelector("#money_button_list"),
  moneyCountList: moneyCountList,
  vendingMachine: vm,
  wallet: wallet
})