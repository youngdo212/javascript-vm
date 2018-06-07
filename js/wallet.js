// 지갑의 데이터와 작동을 갖고 있는 클래스
class Wallet{
  constructor(){
    this.moneyButtonList = document.querySelector("#money_button_list");
    this.moneyCountList = document.querySelector("#money_count_list");
    this.totalMoney = document.querySelector("#total_money_box>span");
  }
  takeOutMoney(price){
    const targetCount = this.moneyCountList.querySelector(`[data-price="${price}"]>span`);
    const targetButton = this.moneyButtonList.querySelector(`[data-price="${price}"]`);
    const money = Number(targetButton.dataset.price);

    if(targetCount.textContent == 0) throw new Error('지갑에 돈이 부족합니다');

    this.decreaseCount(targetCount);
    this.decreaseMoney(money);
    return money;
  }
  decreaseCount(targetCount){
    targetCount.textContent -= 1;
  }
  decreaseMoney(money){
    this.totalMoney.textContent -= money;
  }
}