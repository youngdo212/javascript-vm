import {ItemList, VmTotalMoney, SelectButtonList, LogBox, VendingMachine} from "./vendingMachine.js"
import {MoneyButtonList, MoneyCountList, Wallet} from "./wallet.js"
import {Action} from "./Action.js"
import {itemData} from "./itemData.js"
import {Template} from "./template.js"

const itemList = new ItemList({
  itemList : document.querySelector('.item_list'),
  template: new Template(),
  itemData: itemData
});

const vmTotalMoney = new VmTotalMoney({
  totalMoney: document.querySelector('.total_money > span')
});

const selectButtonList = new SelectButtonList({
  selectButtonList: document.querySelector('.select_button_list')
});

const logBox = new LogBox({
  logBox: document.querySelector('.log_box')
})

const vm = new VendingMachine({
  itemList: itemList,
  totalMoney: vmTotalMoney,
  selectButtonList: selectButtonList,
  logBox: logBox
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