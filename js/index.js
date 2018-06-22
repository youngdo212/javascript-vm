import {VendingMachine} from "./vendingMachine.js"
import {Wallet} from "./wallet.js"
import {Action} from "./Action.js"
import {itemData} from "./itemData.js"

function makeItemHtml({number, name, price}){
  return `<li class="item" data-number=${number} data-price=${price}>
  <dl>
    <dt class='item_name'>${name}</dt>
    <dd>${number}. ${price}</dd>
  </dl>
  </li>`
}

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