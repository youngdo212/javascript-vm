import {VendingMachine} from "./vendingMachine.js"
import {Wallet} from "./wallet.js"
import {Action} from "./Action.js"

let template = {
  getInputMoneyLogMsg(money){
    return `${money}원이 투입되었습니다!`
  },
  getSelectItemLogMsg(itemName){
    return `${itemName} 선택!`
  }
}

let vm = new VendingMachine({
  template: template,
  vendingMachineWrap : document.querySelector('#vendingMachineWrap')
});
let wallet = new Wallet({
  walletWrap: document.querySelector('#walletWrap')
});

let action = new Action({
  vendingMachine: vm,
  wallet: wallet
});