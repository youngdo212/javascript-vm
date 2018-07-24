/*
MoneyButtonList, MoneyCountList 클래스를 생성자 인자로 받아 컨트롤 하는 전체 지갑 클래스
*/
class Wallet{
  constructor({moneyButtonList, moneyCountList, totalMoney, moneyData = {}}){
    this.oMoneyButtonList = moneyButtonList;
    this.oMoneyCountList = moneyCountList;
    this.$totalMoney = totalMoney;

    this.inputMoney(moneyData);
    this.oMoneyButtonList.bindSelectMoney(this.selectMoney.bind(this));
  }

  bindTakeOutMoney(handler){
    this.bTakeOutMoney = handler;
  }

  selectMoney(price){
    if(this.oMoneyCountList.isZeroCount(price)) return;

    this.oMoneyCountList.manipulateCount({[price] : -1});
    this.$totalMoney.textContent = this.oMoneyCountList.calculate();
    this.bTakeOutMoney({[price] : 1})
  }

  inputMoney(moneyData){
    this.oMoneyCountList.manipulateCount(moneyData);
    this.$totalMoney.textContent = this.oMoneyCountList.calculate();    
  }
}

export {Wallet};