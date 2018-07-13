import {VendingMachine} from "./vendingMachine.js"
import {MoneyButtonList, MoneyCountList, Wallet} from "./wallet.js"
import {Action} from "./Action.js"
import {itemData} from "./itemData.js"
import {makeItemHtml} from "./template.js"

const vm = new VendingMachine({
  vendingMachineWrap: document.querySelector('.vending_machine_wrap'),
  itemData: itemData,
  template: makeItemHtml
})

const moneyButtonList = new MoneyButtonList({
  moneyButtonList: document.querySelector('.money_button_list')
})

const moneyCountList = new MoneyCountList({
  moneyCountList: document.querySelector('.money_count_list')
})

const wallet = new Wallet({
  moneyButtonList: moneyButtonList,
  moneyCountList: moneyCountList,
  totalMoney: document.querySelector('.wallet_money_box > span'),
  moneyData : {10: 10, 50: 10, 100: 10, 500: 10, 1000: 10, 5000: 5, 10000: 2}
})

const action = new Action({
  vendingMachine: vm,
  wallet: wallet
})