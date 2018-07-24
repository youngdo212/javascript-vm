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

export {MoneyButtonList}