// static data  snackList and vmButtonTextList

const snackList = [
  { "id": 1, "name": "콜라", "price": 500, "working": true },
  { "id": 2, "name": "사이다", "price": 1000, "working": true },
  { "id": 3, "name": "파인애플맛 환타", "price": 400, "working": true },
  { "id": 4, "name": "포도맛 환타", "price": 300, "working": true },
  { "id": 5, "name": "레몬에이드", "price": 900, "working": true },
  { "id": 6, "name": "봉봉", "price": 1200, "working": true },
  { "id": 7, "name": "코코아주스", "price": 1000, "working": true },
  { "id": 8, "name": "콜라제로", "price": 1000, "working": true },
  { "id": 9, "name": "파워에이드", "price": 2000, "working": true },
  { "id": 10, "name": "초코우유", "price": 1000, "working": true },
  { "id": 11, "name": "초코우유2", "price": 700, "working": true },
  { "id": 12, "name": "초코우유3", "price": 600, "working": true },
  { "id": 13, "name": "딸바우유", "price": 1000, "working": true },
  { "id": 14, "name": "바나나우유", "price": 500, "working": true },
  { "id": 15, "name": "커피우유", "price": 1000, "working": true },
  { "id": 16, "name": "알로에", "price": 1200, "working": true },
  { "id": 17, "name": "콘칩", "price": 1000, "working": true },
  { "id": 18, "name": "새우깡", "price": 1000, "working": true },
  { "id": 19, "name": "감자칩", "price": 2000, "working": true },
  { "id": 20, "name": "칸쵸", "price": 1000, "working": true },
  { "id": 21, "name": "아몬드", "price": 450, "working": true },
  { "id": 22, "name": "다크초콜릿", "price": 1500, "working": true },
  { "id": 23, "name": "가나초콜릿", "price": 1200, "working": true },
  { "id": 24, "name": "견과류", "price": 900, "working": true },
  { "id": 25, "name": "육포", "price": 1000, "working": true },
  { "id": 26, "name": "오징어포", "price": 900, "working": true },
  { "id": 27, "name": "미니땅콩", "price": 4000, "working": true },
  { "id": 28, "name": "오징어", "price": 2300, "working": true },
  { "id": 29, "name": "{고장}", "price": 1000, "working": false },
  { "id": 30, "name": "신라면", "price": 700, "working": true },
  { "id": 31, "name": "진라면", "price": 800, "working": true },
  { "id": 32, "name": "포도맛 환타", "price": 1000, "working": true }
]

const vmButtonTextList = [1,2,3,4,5,6,7,8,9,0,"선택","취소"]

// class  money, Mo ,wallet, vm ,
class Money {
  constructor(value, unit='원'){
    this.moneyKinds = [10,50,100,500,1000,5000,10000,50000]
    if(this.moneyKinds.includes(value)){
      this.value = value
      this.unit =  unit;
    }
    else{
      console.log(`화폐는 ${this.moneyKinds}의 해당 돈으로만 만들 수 있습니다`)
    }
  }
}

class Wallet {
  constructor(myMoney){
    this.myMoney=myMoney;
    this.totalMoney = this.myMoney.reduce((ac,money)=>{
      return ac+=money.value
    },0)
    this.moneyKinds = this.myMoney.reduce((ac,money)=>{
     ac[money.value] = ac[money.value]===undefined ? 1 : ac[money.value]+=1
     return ac;
    },{}) 
  }
  useMoney(money){
    if(this.moneyKinds[money]){
      this.moneyKinds[money]-=1;
      const getMoney = this.getMoney(money);
      this.totalMoney-=getMoney.value
      return getMoney;
    }
  }
  getMoney(price){
    for(let i =0; i<this.myMoney.length; i++){
      if(this.myMoney[i].value===price){
        const money = this.myMoney[i]
        this.myMoney = this.myMoney.slice(0,i).concat(this.myMoney.slice(i+1))
        return money;
      }
    }
  }
}



class VendingMachine {
  constructor(snackList){
    this.money=0;
    this.snackList= snackList
  }
  insertMoney(money){
    if(money.constructor!==Money) console.log('인지할 수 있는 돈을 입력해주세요')
    else {
      this.money += money.value
    }
    
  }
}
class RenderingView {
  getSearched(selector, target=document){
    return target.querySelector(selector)
  }
  templateRender(selector,template, target=document){
    return this.getSearched(selector, target=target).insertAdjacentHTML('beforeend', template)
  }
  updateText(selector,updateText, target=document){
    return this.getSearched(selector, target=target).innerText = updateText;
  }
}

//  make Instance

const myMoney = [
  new Money(100),new Money(100),new Money(100),new Money(100),new Money(100),
  new Money(1000),new Money(1000),new Money(1000),new Money(1000),new Money(1000),
  new Money(5000),new Money(5000),new Money(10000),new Money(10000)
]

const vendingMachine = new VendingMachine(snackList);
const wallet = new Wallet(myMoney);
const rederingView = new RenderingView();

// template

const snackTemplate = vendingMachine.snackList.reduce((ac,c)=>{
  return ac+=`<li class="snack-list-item">
      <div class="snack-name-container">
          <span class="snak-name">${c.name}</span>
      </div>
      <div class="label-price">
          <span class="snack-number">${c.id}</span>
          <span class="snack-price">${c.price}</span>
      </div>
    </li>`
},'')

const vendingMachineButtonTemplate = vmButtonTextList.reduce((ac,c)=>{
  return ac+=` <li><button class="select-button">${c}</button></li>`
}, '');

const walletMoneyButtonTemplate = Object.keys(wallet.moneyKinds).reduce((ac,moneyKind)=>{
  return ac+=`<li class="wallet-money-button">
                <button data-money="${moneyKind}" data-unit="원">${moneyKind} 원</button>
                <span class="money-count">${wallet.moneyKinds[moneyKind]}개</span>
              </li>`
},'')

// Rendering

const viewUpdateWalletTotal = ()=>rederingView.updateText('.total-my-assets .money', wallet.totalMoney)
const viewUpdateInsertedMoney = ()=>rederingView.updateText('.diplay-inserted-money .money', vendingMachine.money)
// const viewUpdateWallet = ()=>rederingView.templateRender('.money-button-list', walletMoneyButtonTemplate)

document.addEventListener("DOMContentLoaded", (e)=> {
  console.log("DOM fully loaded and parsed");
  rederingView.templateRender('.snack-list', snackTemplate);
  rederingView.templateRender('.number-buttons', vendingMachineButtonTemplate);
  rederingView.templateRender('.money-button-list', walletMoneyButtonTemplate);
  viewUpdateInsertedMoney();
  viewUpdateWalletTotal();
});










