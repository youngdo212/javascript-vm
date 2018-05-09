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

const myMoney = {
  100: 5,
  500: 5,
  1000: 5,
  5000: 2,
  10000: 2,
}

// class Wallet, vendingMachine, View

class Wallet {
  constructor(myMoney){
    this.myMoney=myMoney;
  }
  get totalMoney(){
    return Object.keys(this.myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*this.myMoney[money]
    },0)
  }
  useMoney(money){
    if(this.myMoney[money]){
      this.myMoney[money]-=1;
      return Number(money);
    }
  }
}

class VendingMachine {
  constructor(snackList){
    this.money=0;
    this.snackList= snackList
  }
  insertMoney(money){
    this.money += money;
  }
}

class View {
  constructor(){
    this.el = {}
  }
  getSearched(selector, target=document, name=selector){
    return this.el[name]=target.querySelector(selector);
  }
  templateRender(selector,template, target=document){
    return this.getSearched(selector, target=target).insertAdjacentHTML('beforeend', template)
  }
  updateText(selector,updateText, target=document){
    return this.getSearched(selector, target=target).innerText = updateText;
  }
  bindEvent(name, event, method){
    this.el[name].addEventListener(event, method);
  }
}

//  make Instance

const vendingMachine = new VendingMachine(snackList);
const wallet = new Wallet(myMoney);
const view = new View();

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

const walletMoneyButtonTemplate = Object.keys(wallet.myMoney).reduce((ac,moneyKind)=>{
  return ac+=`<li class="wallet-money-button">
                <button data-money="${moneyKind}" data-unit="원">${moneyKind} 원</button>
                <span class="money-count">${wallet.myMoney[moneyKind]}개</span>
              </li>`
},'')

const template = {
  snackTemplate,
  vendingMachineButtonTemplate,
  walletMoneyButtonTemplate,
};

// Rendering
const capturedTargetElementName = (e, elementName) => e.target.localName===elementName
  
const insertCoin = (e)=>{
  if(!capturedTargetElementName(e,'button')) return;
  const choseMoney =e.target.dataset.money
  const moneyCountElement = e.target.nextElementSibling
  let moneyCount = wallet.myMoney[choseMoney]
  if(moneyCount){
    const willInsertMoney = wallet.useMoney(choseMoney)
    moneyCountElement.innerText=`${wallet.myMoney[choseMoney]}개`
    vendingMachine.insertMoney(willInsertMoney);
    view.updateText('.total-my-assets .money', wallet.totalMoney)
    view.updateText('.diplay-inserted-money .money', vendingMachine.money)
  }
}

document.addEventListener("DOMContentLoaded", (e)=> {
  console.log("DOM fully loaded and parsed");
  view.templateRender('.snack-list', snackTemplate);
  view.templateRender('.number-buttons', vendingMachineButtonTemplate);
  view.templateRender('.money-button-list', walletMoneyButtonTemplate);
  view.updateText('.total-my-assets .money', wallet.totalMoney)
  view.updateText('.diplay-inserted-money .money', vendingMachine.money)
  view.bindEvent('.money-button-list','click', insertCoin)
});

 









