let template = {
  getInputMoneyLogMsg(money){
    return `${money}원이 투입되었습니다!`
  },
  getSelectItemLogMsg(itemName){
    return `${itemName} 선택!`
  }
}

let vm = new VendingMachine({
  template: template
});
let wallet = new Wallet();

let action = new Action({
  vendingMachine: vm,
  wallet: wallet
});