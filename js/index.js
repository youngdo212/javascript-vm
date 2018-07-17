import {ItemList} from "./vendingMachine/itemList.js"
import {VmTotalMoney} from "./vendingMachine/vmTotalMoney.js"
import {SelectButtonList} from "./vendingMachine/selectButtonList.js"
import {LogBox} from "./vendingMachine/logBox.js"
import {VendingMachine} from "./vendingMachine/vendingMachine.js"

import {MoneyButtonList} from "./wallet/moneyButtonList.js"
import {MoneyCountList} from "./wallet/moneyCountList.js"
import {Wallet} from "./wallet/wallet.js"

import {itemData} from "./itemData.js"
import {Template} from "./template.js"

class Action{
  constructor({vendingMachine, wallet}){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.bindFunctions();
  }
  bindFunctions(){
    this.wallet.bindTakeOutMoney(this.inputMoneyIntoMachine.bind(this));
    this.vendingMachine.bindThrowMoney(this.inputMoneyIntoWallet.bind(this));
  }
  inputMoneyIntoMachine(price){
    this.vendingMachine.inputMoney(price);
  }
  inputMoneyIntoWallet(change){
    this.wallet.inputMoney(change);
  }
}

const itemList = new ItemList({
  itemList : document.querySelector('.item_list'),
  template: new Template(),
  itemData: itemData
});

const vmTotalMoney = new VmTotalMoney({
  totalMoney: document.querySelector('.total_money > span'),
  priceUnits: [10000, 5000, 1000, 500, 100, 50, 10]
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