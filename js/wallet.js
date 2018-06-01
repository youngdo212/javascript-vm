class Wallet{
  constructor({money}){
    this.money = money;
    this.moneyCountList = new MoneyCountList({
      moneyCountList: document.querySelector("#money_count_list")
    })
  }
  takeOutMoney(price){
    this.money.textContent = +this.money.textContent - price;
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