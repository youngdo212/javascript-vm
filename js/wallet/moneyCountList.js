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

export {MoneyCountList}