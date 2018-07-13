// 지갑의 데이터와 작동을 갖고 있는 클래스

class MoneyButtonList{
  constructor({moneyButtonList}){
    this.moneyButtonList = moneyButtonList;
  }
  
  bindSelectMoney(handler){
    this.moneyButtonList.addEventListener('click', ({target}) => {
      if(target.tagName !== 'BUTTON') return;
      handler(target.dataset.price);
    })
  }
}

class MoneyCountList{
  constructor({moneyCountList}){
    this.moneyCounts = Array.from(moneyCountList.querySelectorAll('li'))
    .reduce((dict, moneyCount) => (dict[moneyCount.dataset.price] = moneyCount, dict), {}); // 너무 복잡?
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
    let totalMoney = 0;

    Object.keys(this.moneyCounts).forEach(price => {
      const count = this.moneyCounts[price].firstElementChild.textContent;
      totalMoney += Number(price) * Number(count);
    });

    return totalMoney;
  }
}

class Wallet{
  constructor({moneyButtonList, moneyCountList, totalMoney, moneyData = {}}){
    this.moneyButtonList = moneyButtonList;
    this.moneyCountList = moneyCountList;
    this.totalMoney = totalMoney;

    this.inputMoney(moneyData);
    this.moneyButtonList.bindSelectMoney(this.selectMoney.bind(this));
  }

  bindTakeOutMoney(handler){
    this.takeOutMoney = handler;
  }

  selectMoney(price){
    this.moneyCountList.manipulateCount({[price] : -1});
    this.totalMoney.textContent = this.moneyCountList.calculate();
    this.takeOutMoney(price)
  }

  inputMoney(moneyData){
    this.moneyCountList.manipulateCount(moneyData);
    this.totalMoney.textContent = this.moneyCountList.calculate();    
  }
}

export {MoneyButtonList, MoneyCountList, Wallet};