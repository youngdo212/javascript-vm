// class Wallet, vendingMachine, View
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

const buttonTextList = [1,2,3,4,5,6,7,8,9,0,"선택","취소"]

const myMoney = {
  100: 5,
  500: 5,
  1000: 5,
  5000: 2,
  10000: 2,
}
class WalletModel {
  constructor(myMoney){
    this.myMoney=myMoney;
    this.controller = null;
  }
  get totalMoney(){
    return Object.keys(this.myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*this.myMoney[money]
    },0)
  }
  useMoney(data){
    if(this.myMoney[data.money]){
      this.myMoney[data.money]-=1;
      data.totalMoney = this.totalMoney
      data.moneyCount = this.myMoney[data.money]
      this.emit('reRenderWallet',data)
      return Number(data.money)
    }
  }
  emit(eventName, data){
    this.controller.catch(eventName, data);
  }
}

// STEP6
// [O] 돈 이 입력되면 로그 창에 돈이 입력되었다고 나온다.
// [O]    돈이 입력되었을 때 로그를 저장한다.  
//        어떻게 저장할지 list 형태로 concat or push
// [O]-- 로그의 3개 까지는 관련 메시지들을 만들어서 컨트롤러에게 보내준다.
// [O] 컨트롤러는 메시지들을 가지고 rendering을 해준다. 

// [] 자판기에 돈이 입력되면.입력된 돈으로 살 수 있는 목록을 보여준다
//    [O] 살 수 있는 목록을 가지고 온다. 
//    [] html파일에 상품이름과 컨트롤러에 보내준 상품이름이 같으면 스타일을 변경한다.    

class VendingMachineModel {
  constructor(snackList){
    this.money=0;
    this.snackList= snackList
    this.controller = null;
    this.logHistoryList = [];
    this.actions = {
      'insertMoney': (data)=> `<p class="log">${data}원이 입력되었습니다</p>`
    }
  }
  insertMoney(data){
    this.money += Number(data.money);
    data.insertedMoney = this.money
    this.writeLog('insertMoney', data.money)
    this.emit('displayBuyableList',this.getBuyableList())    
    this.emit('reRenderVendingMachineMoney', data)
  }
  getBuyableList(){
    const buyableList = this.snackList.filter(({price})=>price<=this.money)
    return buyableList
  }
  emit(eventName, data){
    this.controller.catch(eventName, data);
  }
  writeLog(type, data){
    const logData = {type, data}
    this.logHistoryList = this.logHistoryList.concat(logData)
    const latestHistorys = this.logHistoryList.slice(-3)
    this.makelogMsgs(latestHistorys);
  }
  makelogMsgs(latestHistorys){
    const latestMsgTemplate =  latestHistorys.reduce(
      (ac,{type, data})=>{
        return ac+=this.getMessageByType(type,data)
      },``)
    this.emit('reRenderLog',latestMsgTemplate)
  }
  getMessageByType(type, data){
    return this.actions[type](data)
  }
}

class VendingMachineView {
  constructor(){
    this.snackListEl = this.getSearched('.snack-list')
    this.selectButtonsEl = this.getSearched('.number-buttons')
    this.moneyButtonListEl = this.getSearched('.money-button-list')
    this.myTotalMoneyEl = this.getSearched('.total-my-assets .money')
    this.insertedMoneyEl = this.getSearched('.diplay-inserted-money .money')
    this.displayLogEl = this.getSearched('.display-log-box')
    this.controller = null;
  }
  getSearched(selector, target=document){
    return target.querySelector(selector);
  }
  getSearchedAll(selector, target=document){
    return target.querySelectorAll(selector);
  }
  updateText(el,updateText){
    return el.innerText = updateText;
  }
  setAttribute(el, attributesName, attributesValue){
    el.setAttribute(attributesName, attributesValue);
  }
  innerHTML(el, html){
    return el.innerHTML = html
  }
  addClass(el, className){
    return el.classList.add(className)
  }
  initRender(template, data){
    const {snackTemplate, selectButtonTemplate, walletMoneyButtonTemplate} = template
    const {snackList, buttonTextList, myMoney} = data
    this.snackListEl.insertAdjacentHTML('beforeend', snackTemplate(snackList))
    this.selectButtonsEl.insertAdjacentHTML('beforeend', selectButtonTemplate(buttonTextList))
    this.moneyButtonListEl.insertAdjacentHTML('beforeend', walletMoneyButtonTemplate(myMoney))
    this.myTotalMoneyEl.innerText = Object.keys(myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*myMoney[money]
    },0)
  }
  handleMoneyButtonClicked({target}){
    if(!target.localName==="button") return;
    const moneyCountEl = target.nextElementSibling
    const moneyCount =  Number(moneyCountEl.dataset.count)
    if(!moneyCount) return;
    const eventData = {
      money: target.dataset.money,
      moneyCountEl,
      totalMoneyEl: this.myTotalMoneyEl,
      insertedMoneyEl: this.insertedMoneyEl,
    }
    this.emit('useMoney', eventData)
  }
  emit(eventName, data){
    this.controller.catch(eventName, data);
  }
  bindEvents(){
    this.selectButtonsEl.addEventListener('click', e =>this.handleSelectButtonClicked(e));
    this.moneyButtonListEl.addEventListener('click', e =>this.handleMoneyButtonClicked(e));
    return this;
  }
  handleSelectButtonClicked(e){
    
  }
}

class VmController {
  constructor(vendingMachine,wallet,vendingMachineView){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.vendingMachineView = vendingMachineView;
  }
  catch(eventName, data){
    this[eventName](data)
  }
  useMoney(data){
    this.wallet.useMoney(data)
    this.insertMoney(data)
  }
  reRenderWallet(data){
    this.vendingMachineView.updateText(data.moneyCountEl, `${data.moneyCount}개`);
    this.vendingMachineView.setAttribute(data.moneyCountEl,'data-count',data.moneyCount);
    this.vendingMachineView.updateText(data.totalMoneyEl, data.totalMoney);
  }
  insertMoney(data){
    this.vendingMachine.insertMoney(data);
  }
  reRenderVendingMachineMoney(data){
    this.vendingMachineView.updateText(data.insertedMoneyEl, `${data.insertedMoney}`)
  }
  displayBuyableList(snackList){
    const snackListEl =this.vendingMachineView.snackListEl;
    snackList.forEach(({id}) => {
      const matchedItem = this.vendingMachineView.getSearched(`[data-id="${id}"]`, snackListEl)
      this.vendingMachineView.addClass(matchedItem, 'red')
    });
  }
  reRenderLog(data){
    const displayLogEl = this.vendingMachineView.displayLogEl
    this.vendingMachineView.innerHTML(displayLogEl, data);
    this.vendingMachineView.addClass(displayLogEl.lastElementChild, 'now')
  }
}

// template
const template = {
  snackTemplate: (snackList)=>{
    return snackList.reduce((ac,c)=>{
      return ac+=`<li data-id="${c.id}" class="snack-list-item">
          <div class="snack-name-container">
              <span class="snak-name">${c.name}</span>
          </div>
          <div class="label-price">
              <span class="snack-number">${c.id}</span>
              <span class="snack-price">${c.price}</span>
          </div>
        </li>`
    },'')
  },
  selectButtonTemplate: (buttonTextList)=> {
    return buttonTextList.reduce((ac,c)=>{
      return ac+=` <li><button class="select-button">${c}</button></li>`
    }, '');
  },
  walletMoneyButtonTemplate: (moneyObj)=> {
    return  Object.keys(moneyObj).reduce((ac,moneyKind)=>{
      return ac+=`<li class="wallet-money-button">
                    <button data-money="${moneyKind}" data-unit="원">${moneyKind} 원</button>
                    <span class="money-count" data-count="${moneyObj[moneyKind]}">${moneyObj[moneyKind]}개</span>
                  </li>`
    },'')
  }
};

//  make Instance

const vendingMachine = new VendingMachineModel(snackList);
const wallet = new WalletModel(myMoney);
const vendingMachineView = new VendingMachineView();
const vendingMachineController = new VmController(vendingMachine,wallet, vendingMachineView);

// bind Controller 
vendingMachine.controller = vendingMachineController;
wallet.controller = vendingMachineController;
vendingMachineView.controller = vendingMachineController;


// event design






// Rendering

/// event
  


/// domLoad

document.addEventListener("DOMContentLoaded", (e)=> {
  console.log("DOM fully loaded and parsed");
  // rendering 
  const renderingData = {
    snackList,
    buttonTextList,
    myMoney,
  }
  vendingMachineView.initRender(template, renderingData)
  vendingMachineView.bindEvents()
});

 
// 1. Eventclick된다 거른다
// 2. 보낸다 컨트롤러에게
// 3. 컨트롤러는 받는다 이벤트 이름과 data를 받는다 
// 4. 받은 것에 매칭되는 모델ex  wallet 에게 보내준디 
// 5. 모델은 이벤트를 받고 UseMoney 를 해준다
// 6. Update가 되면









