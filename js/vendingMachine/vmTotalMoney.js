/*
자판기의 담긴 돈을 처리하는 클래스
*/
class VmTotalMoney{
  constructor({totalMoney, priceUnits}){
    this.$totalMoney = totalMoney;
    this.priceUnits = priceUnits;
  }

  get(){
    return this.$totalMoney.textContent;
  }

  increase(price){
    this.$totalMoney.textContent = Number(this.$totalMoney.textContent) + Number(price);
  }

  decrease(price){
    this.$totalMoney.textContent = Number(this.$totalMoney.textContent) - Number(price);
  }

  return(){
    const totalMoney = this.$totalMoney.textContent;
    const change = this.makeChange(totalMoney);

    this.decrease(totalMoney);

    return change;
  }

  makeChange(money){
    const change = {};

    this.priceUnits.forEach(price => {
      const [count, remainder] = [Math.floor(money/price), money%price];
      if(count) change[price] = count;
      money = remainder;
    })

    return change;
  }
}

export {VmTotalMoney};