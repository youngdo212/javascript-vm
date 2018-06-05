class VendingMachine{
  constructor({template}){
    this.template = template;
    this.totalMoney = document.querySelector("#vm_money_box>span");
    this.log = document.querySelector("#log");
  }
  inputMoney(money){
    this.totalMoney.textContent = Number(this.totalMoney.textContent) + money;
    this.logging(this.template.inputMoney(money));
  }
  logging(content){
    const newLog = document.createElement("DIV");
    const text = document.createTextNode(content);

    if(this.log.children.length >= 10) this.log.removeChild(this.log.firstElementChild);

    newLog.appendChild(text);
    this.log.appendChild(newLog);
  }
}