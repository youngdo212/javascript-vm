// 자판기의 데이터와 작동을 갖고 있는 클래스
class VendingMachine{
  constructor({template}){
    this.template = template;
    this.totalMoney = document.querySelector("#vm_money_box>span");
    this.itemNames = Array.from(document.querySelectorAll(".item_name"));
    this.logBox = document.querySelector("#log_box");
  }
  inputMoney(money){
    this.totalMoney.textContent = Number(this.totalMoney.textContent) + money;
    this.highlightItem(Number(this.totalMoney.textContent));
    this.logging(this.template.getInputMoneyLogMsg(money));
  }
  highlightItem(totalMoney){
    this.itemNames.forEach(itemName =>{
      if(+itemName.dataset.price <= totalMoney){
        itemName.classList.add("highlight");
      }
    })
  }
  logging(content){
    const newLog = document.createElement("DIV");
    const text = document.createTextNode(content);

    if(this.logBox.children.length >= 10) this.logBox.removeChild(this.logBox.firstElementChild);

    newLog.appendChild(text);
    this.logBox.appendChild(newLog);
  }
}