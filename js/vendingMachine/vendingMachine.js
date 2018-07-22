/*
자판기의 기능을 컨트롤하는 클래스
*/
class VendingMachine{
  constructor({itemList, totalMoney, selectButtonList, logBox, delayTime = 3000}){
    this.oItemList = itemList;
    this.oTotalMoney = totalMoney;
    this.oSelectButtonList = selectButtonList;
    this.oLogBox = logBox;
    this.delayTime = delayTime;
    this.selectedNumber = '';

    this.runTimeoutID = null;
    this.returnMoneyTimeoutID = null;

    this.oSelectButtonList.bindSelectItem(this.selectNumber.bind(this));
  }

  inputMoney(moneyData){
    let price = 0;

    Object.keys(moneyData).forEach(moneyUnit => {
      const count = moneyData[moneyUnit]
      price += Number(moneyUnit) * Number(count);
    })

    clearTimeout(this.returnMoneyTimeoutID);

    this.oTotalMoney.increase(price);
    this.oLogBox.appendMessage(`${price}원이 투입되었습니다!`);
    this.oItemList.highlight(this.oTotalMoney.get());
  }

  selectNumber(number){
    clearTimeout(this.runTimeoutID);
    clearTimeout(this.returnMoneyTimeoutID);

    this.selectedNumber += number;

    this.runTimeoutID = setTimeout(this.run.bind(this), this.delayTime);
  }

  run(){ // refactor
    const item = this.oItemList.getItem(this.selectedNumber);
    this.selectedNumber = '';

    if(!item){
      this.oLogBox.appendMessage('올바른 번호를 입력하세요');
      return;
    }

    const itemName = item.querySelector('.item_name').textContent;
    const price = item.dataset.price;

    this.oLogBox.appendMessage(`${itemName} 선택!`);
    this.oTotalMoney.decrease(price);
    this.oItemList.highlight(this.oTotalMoney.get())

    if(this.oTotalMoney.get() !== '0') this.returnMoneyTimeoutID = setTimeout(this.returnMoney.bind(this), this.delayTime);
  }

  returnMoney(){
    const change = this.oTotalMoney.return();
    this.oItemList.highlight(0);
    this.oLogBox.appendMessage(`잔돈이 반환되었습니다!`);
    this.throwMoney(change);
  }

  bindThrowMoney(handler){
    this.throwMoney = handler;
  }
}

export {VendingMachine};