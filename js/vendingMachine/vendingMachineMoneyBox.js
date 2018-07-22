/*
자판기의 담긴 돈을 처리하는 클래스
*/
class VendingMachineMoneyBox{
  constructor({totalMoney, moneyUnits} = {}){
    this.$totalMoney = totalMoney;
    this.moneyUnits = moneyUnits;
  }

  totalMoney(){
    return Number(this.$totalMoney.textContent);
  }

  // @param {number} price
  modifyMoney(price){
    this.$totalMoney.textContent = this.totalMoney() + price;
  }

  returnMoney(){
    let totalMoney = this.totalMoney();
    let change = this._makeChange(totalMoney, this.moneyUnits);

    this.modifyMoney(-totalMoney);

    return change;
  }

  // @param {Array} moneyUnits - array of numbers
  _makeChange(money, moneyUnits){
    let change = {};

    moneyUnits.forEach(price => {
      const [number, restMoney] = [Math.floor(money/price), money%price];
      if(number) change[price] = number;
      money = restMoney;
    })

    return change;
  }
}

export {VendingMachineMoneyBox};