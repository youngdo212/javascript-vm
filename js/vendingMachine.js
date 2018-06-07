class VendingMachine{
  constructor({template}){
    this.template = template;
    this.totalMoney = document.querySelector("#vm_money_box>span");
    this.itemNames = Array.from(document.querySelectorAll(".item_name"));
    this.log = document.querySelector("#log");
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

    if(this.log.children.length >= 10) this.log.removeChild(this.log.firstElementChild);

    newLog.appendChild(text);
    this.log.appendChild(newLog);
  }
}