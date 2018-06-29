// 지갑의 데이터와 작동을 갖고 있는 클래스

class Wallet{
  constructor({walletWrap, moneyData}){
    this.walletWrap = walletWrap;
    this.moneyData = moneyData;
    this.totalMoney = this.walletWrap.querySelector('.wallet_money_box > span');
    this.moneyCountElems = this.makeMoneyCountElemDict();
    this.inputMoneyIntoMachine = null;
  }
  init(){
    this.render();
    this.addAllEventListener();
    this.calcTotalMoney();
    this.moneyData = null;
  }
  render(){
    const entries = Object.entries(this.moneyData);
    for(let [price, count] of entries){
      const moneyCountElem = this.moneyCountElems[price];
      moneyCountElem.textContent = count;
    }
  }
  addAllEventListener(){
    this.walletWrap.addEventListener('click', this.selectMoney.bind(this));
  }
  makeMoneyCountElemDict(){
    const moneyCountElemDict = {};
    const moneyButtons = this.walletWrap.querySelectorAll('.money_button_list > li > button');
    const moneyCountList = this.walletWrap.querySelector('.money_count_list');

    moneyButtons.forEach( button => {
      const price = button.dataset.price;
      const moneyCountElem = moneyCountList.querySelector(`[data-price='${price}']>span`);
      moneyCountElemDict[price] = moneyCountElem;
    })

    return moneyCountElemDict
  }
  calcTotalMoney(){
    let totalMoney = 0;
    const entries = Object.entries(this.moneyCountElems);

    for(let [price, {textContent:count}] of entries){
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
    const entries = Object.entries(change);
    for(let [price, count] of entries){
      const moneyCountElem = this.moneyCountElems[price];
      this.manipulateMoneyCount(moneyCountElem, count);
    }
    this.calcTotalMoney();
  }
}

export {Wallet};