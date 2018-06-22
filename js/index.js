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
  walletWrap: document.querySelector('.walletWrap')
})

const action = new Action({
  vendingMachine: vm,
  wallet: wallet
})