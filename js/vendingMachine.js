class VendingMachine{
  constructor(){
    this.totalMoney = document.querySelector("#vm_money_box>span");
  }
  inputMoney(money){
    this.totalMoney.textContent = Number(this.totalMoney.textContent) + money;
  }
}