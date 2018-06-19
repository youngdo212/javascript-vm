// 지갑의 데이터와 작동을 갖고 있는 클래스

class Wallet{
  constructor({walletWrap}){
    this.walletWrap = walletWrap;
    this.moneyCountList = this.walletWrap.querySelector('.money_count_list');
    this.totalmoney = this.walletWrap.querySelector('.wallet_money_box > span');
    
    this.inputMoneyIntoMachine = null;

    this.walletWrap.addEventListener('click', this.selectMoney.bind(this));
  }
  selectMoney({target}){
    if(target.tagName !== 'BUTTON') return;
    
    const price = target.dataset.price;
    const moneyCount = this.moneyCountList.querySelector(`[data-price='${price}']>span`);    
    
    if(this.isZeroCount(moneyCount)) return;

    this.decreaseMoneyCount(moneyCount)
    this.decreaseTotalMoney(price);
    this.inputMoneyIntoMachine(price);
  }
  isZeroCount(moneyCount){
    return moneyCount.textContent === '0';
  }
  decreaseMoneyCount(moneyCount){
    moneyCount.textContent -= 1;
  }
  decreaseTotalMoney(price){
    this.totalmoney.textContent -= price;
  }
}

export {Wallet};