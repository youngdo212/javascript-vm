// 지갑의 데이터와 작동을 갖고 있는 클래스

class Wallet{
  constructor({walletWrap, moneyData}){
    this.walletWrap = walletWrap;
    this.moneyData = moneyData;
    this.moneyButtons = this.walletWrap.querySelectorAll('.money_button_list > li > button');
    this.moneyCountList = this.walletWrap.querySelector('.money_count_list');
    this.totalMoney = this.walletWrap.querySelector('.wallet_money_box > span');
    this.moneyCountElems = this.makeMoneyCountElemDict();
    this.inputMoneyIntoMachine = null;
  }
  init(){
    this.render();
    this.addEventListener();
    this.calcTotalMoney();
    this.moneyData = null;
  }
  render(){
    for(let [price, count] of Object.entries(this.moneyData)){
      const moneyCountElem = this.moneyCountElems[price];
      moneyCountElem.textContent = count;
    }
  }
  addEventListener(){
    this.walletWrap.addEventListener('click', this.selectMoney.bind(this));
  }
  makeMoneyCountElemDict(){
    const moneyCountElemDict = {};

    this.moneyButtons.forEach( button => {
      const price = button.dataset.price;
      const moneyCountElem = this.moneyCountList.querySelector(`[data-price='${price}']>span`);
      moneyCountElemDict[price] = moneyCountElem;
    })

    return moneyCountElemDict
  }
  calcTotalMoney(){
    let totalMoney = 0;

    for(let [price, {textContent:count}] of Object.entries(this.moneyCountElems)){
      totalMoney += price * count;
    }

    this.totalMoney.textContent = totalMoney;
  }
  selectMoney({target}){
    if(target.tagName !== 'BUTTON') return;
    
    const price = target.dataset.price;
    const moneyCountElem = this.moneyCountElems[price];
    
    if(this.isZeroCount(moneyCountElem)) return;

    this.manipulateMoneyCount(moneyCountElem, -1);
    this.calcTotalMoney();
    this.inputMoneyIntoMachine(price);
  }
  isZeroCount(moneyCountElem){
    return moneyCountElem.textContent === '0';
  }
  manipulateMoneyCount(moneyCountElem, count){
    moneyCountElem.textContent = Number(moneyCountElem.textContent) + count;
  }
  inputMoney(change){
    for(let [price, count] of Object.entries(change)){
      const moneyCountElem = this.moneyCountElems[price];
      this.manipulateMoneyCount(moneyCountElem, count);
    }
    this.calcTotalMoney();
  }
}

export {Wallet};