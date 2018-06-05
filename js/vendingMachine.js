class VendingMachine{
  constructor(){
    this.totalMoney = document.querySelector("#vm_money_box>span");
    this.log = document.querySelector("#log");
  }
  inputMoney(money){
    if(money == 0) return;
    this.totalMoney.textContent = Number(this.totalMoney.textContent) + money;
    this.logging(money + '원이 투입됐습니다');
  }
  logging(content){
    const newLog = document.createElement("DIV");
    const text = document.createTextNode(content);

    if(this.log.children.length >= 10) this.log.removeChild(this.log.firstElementChild);

    newLog.appendChild(text);
    this.log.appendChild(newLog);
  }
}