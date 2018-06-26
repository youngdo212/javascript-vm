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
  inputMoney(change){
    for(let price in change){
      let count = change[price]; // 한번에 받아오기
      this.increaseMoney(price, count);
    }
  }
  increaseMoney(price, count){
    const moneyCount = this.moneyCountList.querySelector(`[data-price='${price}']>span`);

    while(count-- > 0){
      this.increaseMoneyCount(moneyCount); // decrease와 중복
      this.increaseTotalMoney(price); // decrease와 중복
    }
  }
  increaseMoneyCount(moneyCount){
    moneyCount.textContent = Number(moneyCount.textContent) + 1;
  }
  increaseTotalMoney(price){
    this.totalmoney.textContent = Number(this.totalmoney.textContent) + Number(price);
  }
}

export {Wallet};