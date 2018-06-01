class VendingMachine{
  constructor({money}){
    this.money = money;
  }
  inputMoney(price){
    this.money.textContent = +this.money.textContent + price;
  }
}