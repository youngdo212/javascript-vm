let slot = document.querySelector('.coin-slot__lists');
let selectButtonsLists = document.querySelector('.selector__buttons__lists');
const buttonLists = {
  buttonNums: selectButtonsLists.querySelectorAll('.selector__buttons__items'),
  buttonZero: document.querySelector('#selector__button__0'),
  buttonConfirm: document.querySelector('#selector__button__confirm'),
}
let selectDecision = '';

class Renders {
  constructor() {
    this.coinOutput = '';
    this.bevOutput = '';
    this.beverages = document.querySelector('.beverage__lists');
  }
  renderCoin(val) {
    val.forEach(elem => {
      this.coinOutput += `
      <li>
        <button class="coin-slot__buttons">${elem.name}</button>
          <p class="coin__left">${elem.store}개
        </button>
      </li>
      `
      sumCoin += elem.value * elem.store;
    })
    totalCoin.innerHTML = `₩ ${sumCoin}원`
    slot.innerHTML += this.coinOutput;
  }

  renderBeverage(val) {
    val.forEach((elem) => {
      this.bevOutput += `
      <li class="beverage__items">
        <p class="beverage__name">${elem.name}</p>
        <p class="beverage__price">
          <span class="beverage__id">${elem.id}. </span>
          ${elem.price}원
        </p>
      </li>
      `;
    });
    return this.beverages.innerHTML += this.bevOutput;
  }
}

class Monitors {
  constructor() {
    this.bevItems = render.beverages.querySelectorAll('.beverage__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
    this.statusScreen = document.querySelector('.selector__status__items');


  }

  activateBtn() {
    if (Number(this.coinStatus.innerHTML) >= 300) {
      buttonLists.buttonConfirm.disabled = false
      this.statusScreen.innerHTML = "음료를 골라주세요"
    } else {
      buttonLists.buttonConfirm.disabled = true;
    }
  }

  availableItems() {
    for (let i = 0; i < this.bevItems.length; i++) {
      Number(this.coinStatus.innerHTML) < bevLists[i].price ?
        this.bevItems[i].style.backgroundColor = '' :
        this.bevItems[i].style.backgroundColor = '#ffafaf';
    }
  }

  purchase() {
    bevLists.forEach(elem => {
      if (elem.id === selectDecision && elem.price <= Number(this.coinStatus.innerHTML)) {
        this.coinStatus.innerHTML -= elem.price;
        inputCoin = Number(this.coinStatus.innerHTML);
        this.statusScreen.innerHTML = `${elem.name}을 선택했습니다`;
        selectDecision = '';
        this.activateBtn();
      } else if (elem.id === selectDecision && elem.price > Number(this.coinStatus.innerHTML)) {
        this.statusScreen.innerHTML = "동전을 더 넣어주세요";
      }
    });
  }
}







class Selections {
  constructor() {
    this.coinButtons = slot.querySelectorAll('.coin-slot__buttons');
    this.stores = slot.querySelectorAll('.coin__left');
  }

  selectNums(val) {
    val.forEach(elem => {
      elem.addEventListener('click', (event) => {
        selectDecision += event.target.innerHTML;
        monitor.statusScreen.innerHTML = `입력 변호: ${selectDecision}`;
      })
    });
  }

  selectZero(val) {
    val.addEventListener('click', (event) => {
      selectDecision += '0';
    });
  }

  selectConfirm(val) {
    val.addEventListener('click', function (event) {
      selectDecision = Number(selectDecision);
      inputCoin = Number(monitor.coinStatus.innerHTML);
      monitor.purchase()
      monitor.availableItems();
    });
  }

  insertCoin() {
    for (let i = 0; i < this.coinButtons.length; i++) {
      this.coinButtons[i].addEventListener('click', (event) => {
        coin[i].store--;
        if (coin[i].store <= 0) {
          this.coinButtons[i].disabled = true;
          this.coinButtons[i].style.backgroundColor = '#cfcfcf'
        }

        sumCoin -= coin[i].value;
        inputCoin += coin[i].value;
        totalCoin.innerHTML = `₩ ${sumCoin}원`;
        monitor.coinStatus.innerHTML = inputCoin;
        this.stores[i].innerHTML = `${coin[i].store}개`;
        monitor.statusScreen.innerHTML = `원하는 음료의 번호를 입력하세요`;

        monitor.activateBtn();
        monitor.availableItems();
      })
    }
  }
}

const render = new Renders();
render.renderCoin(coin);
render.renderBeverage(bevLists);

const selection = new Selections();
selection.selectNums(buttonLists.buttonNums);
selection.selectZero(buttonLists.buttonZero);
selection.selectConfirm(buttonLists.buttonConfirm);
selection.insertCoin();

const monitor = new Monitors();