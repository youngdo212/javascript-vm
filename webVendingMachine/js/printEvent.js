class Wallet {
  constructor(money){
    this.money=money;
  }
  useMoney(money){
    if(this.money>=money) this.money-=money;
  }
}
class VendingMachine {
  constructor(){
    this.money=0;
  }
  insertMoney(money){
    this.money += money
  }
}
const vendingMachine = new VendingMachine();

const wallet = new Wallet(23500);
const totalMoneyElement = document.querySelector('.total-my-assets .money')
const vmMoneyElement = document.querySelector('.diplay-inserted-money .money')

totalMoneyElement.innerText = `${wallet.money}`

const walletButtons = document.querySelector('.money-button-list');
walletButtons.addEventListener('click',(e)=>{
    if(e.target.className!=="money-button") return;
      const choseMoney = Number(e.target.innerText.split('원')[0])
      if(wallet.money<choseMoney) return;
        wallet.useMoney(choseMoney);
        totalMoneyElement.innerText = `${wallet.money}`   
        vendingMachine.insertMoney(choseMoney);
        vmMoneyElement.innerText = `${vendingMachine.money}`
})




