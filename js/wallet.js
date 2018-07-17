/*
지갑의 돈 버튼을 담는 클래스
*/
class MoneyButtonList{
  constructor({moneyButtonList}){
    this.$moneyButtonList = moneyButtonList;
  }
  
  bindSelectMoney(handler){
    this.$moneyButtonList.addEventListener('click', ({target}) => {
      if(target.tagName !== 'BUTTON') return;
      handler(target.dataset.price);
    })
  }
}

/*
지갑의 돈 개수를 담는 클래스
*/
class MoneyCountList{
  constructor({moneyCountList}){
    this.moneyCounts = this.makeMoneyCountDict(moneyCountList.querySelectorAll('li'))
  }

  // @param {nodeList} moneyCountList
  makeMoneyCountDict(moneyCountList){
    return Array.from(moneyCountList).reduce((dict, moneyCount) => (dict[moneyCount.dataset.price] = moneyCount, dict), {});
  }

  // @param {Object} moneyData - {price: manipulateCount}
  manipulateCount(moneyData){
    const priceCountPairs = Object.entries(moneyData);

    for(let [price, count] of priceCountPairs){
      const targetCountElem = this.moneyCounts[price].firstElementChild;
      targetCountElem.textContent = Number(targetCountElem.textContent) + Number(count);
    }
  }

  calculate(){
    return Object.keys(this.moneyCounts).reduce((totalMoney, price) => {
      const count = this.moneyCounts[price].firstElementChild.textContent;
      totalMoney += Number(price) * Number(count);
      return totalMoney
    }, 0);
  }

  isZeroCount(price){
    return this.moneyCounts[price].firstElementChild.textContent === '0';
  }
}

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
    this.takeOutMoney = handler;
  }

  selectMoney(price){
    if(this.oMoneyCountList.isZeroCount(price)) return;

    this.oMoneyCountList.manipulateCount({[price] : -1});
    this.$totalMoney.textContent = this.oMoneyCountList.calculate();
    this.takeOutMoney({[price] : 1})
  }

  inputMoney(moneyData){
    this.oMoneyCountList.manipulateCount(moneyData);
    this.$totalMoney.textContent = this.oMoneyCountList.calculate();    
  }
}

export {MoneyButtonList, MoneyCountList, Wallet};