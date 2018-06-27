import {VendingMachine} from "./vendingMachine.js"
import {Wallet} from "./wallet.js"
import {Action} from "./Action.js"
import {itemData} from "./itemData.js"
import {makeItemHtml} from "./template.js"

const vm = new VendingMachine({
  vendingMachineWrap: document.querySelector('.vending_machine_wrap'),
  itemData: itemData,
  template: makeItemHtml
})

const wallet = new Wallet({
  walletWrap: document.querySelector('.walletWrap'),
  moneyData : {10: 10, 50: 10, 100: 10, 500: 10, 1000: 10, 5000: 5, 10000: 2}
})

wallet.init();

const action = new Action({
  vendingMachine: vm,
  wallet: wallet
})