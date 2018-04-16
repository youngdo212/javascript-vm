class Renders {
  constructor() {
    this.coinOutput = '';
    this.bevOutput = '';
    this.beverages = document.querySelector('.beverage__lists');
    this.slot = document.querySelector('.coin-slot__lists');
  }


  renderCoin(val) {
    this.coinOutput = val.reduce((acc, curr) => {
      sumCoin += curr.value * curr.store;
      return acc += `
      <li>
        <button class="coin-slot__buttons">${curr.name}</button>
          <p class="coin__left">${curr.store}개
        </button>
      </li>
      `
    }, '')
    totalCoin.innerHTML = `₩ ${sumCoin}원`
    this.slot.innerHTML += this.coinOutput;
  };

  renderBeverage(val) {
    this.bevOutput = val.reduce((acc, curr) => {
      return acc += `
      <li class="beverage__items">
        <p class="beverage__name">${curr.name}</p>
        <p class="beverage__price">
          <span class="beverage__id">${curr.id}. </span>
          ${curr.price}원
        </p>
      </li>
      `;
    }, '');
    return this.beverages.innerHTML += this.bevOutput;
  };
}


const render = new Renders();
render.renderCoin(coin);
render.renderBeverage(bevLists);





class Monitors {
  constructor() {
    this.selectDecision = '';
    this.bevItems = render.beverages.querySelectorAll('.beverage__items');
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
  };

  activateBtn() {
    Number(this.coinStatus.innerHTML) >= 300 ?
      control.buttonLists.buttonConfirm.disabled = false :
      control.buttonLists.buttonConfirm.disabled = true;
  };

  availableItems() {
    for (let i = 0; i < this.bevItems.length; i++) {
      Number(this.coinStatus.innerHTML) < bevLists[i].price ?
        this.bevItems[i].style.backgroundImage = '' :
        this.bevItems[i].style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    }
  }

  purchase() {
    bevLists.forEach(elem => {
      if (elem.id === this.selectDecision && elem.price <= Number(this.coinStatus.innerHTML) && elem.working) {
        this.coinStatus.innerHTML -= elem.price;
        inputCoin = Number(this.coinStatus.innerHTML);
        this.statusScreen.innerHTML = `${elem.name}을 선택했습니다`;
        this.selectDecision = '';
        this.activateBtn();
      } else if (elem.id === this.selectDecision && elem.price > Number(this.coinStatus.innerHTML) && elem.working) {
        this.statusScreen.innerHTML = "동전을 더 넣어주세요";
        control.monitor.selectDecision = '';
      }
    });
  }
}


const monitor = new Monitors();




class Controls {
  constructor() {
    this.selectButtonsLists = document.querySelector('.selector__buttons__lists');
    this.buttonLists = {
      buttonNums: this.selectButtonsLists.querySelectorAll('.selector__buttons__items'),
      buttonZero: document.querySelector('#selector__button__0'),
      buttonConfirm: document.querySelector('#selector__button__confirm'),
    };
    this.coinButtons = render.slot.querySelectorAll('.coin-slot__buttons');
    this.stores = render.slot.querySelectorAll('.coin__left');
    this.monitor = monitor;
  }

  insertCoin() {
    for (let i = 0; i < this.coinButtons.length; i++) {
      this.coinButtons[i].addEventListener('click', (event) => {
        this.monitor.selectDecision = '';
        coin[i].store--;
        if (coin[i].store <= 0) {
          this.coinButtons[i].disabled = true;
          this.coinButtons[i].style.backgroundColor = '#cfcfcf'
        }
        sumCoin -= coin[i].value;
        inputCoin += coin[i].value;
        totalCoin.innerHTML = `₩ ${sumCoin}원`;
        this.monitor.coinStatus.innerHTML = inputCoin;
        this.stores[i].innerHTML = `${coin[i].store}개`;
        this.monitor.activateBtn();
        this.monitor.availableItems();
        this.monitor.statusScreen.innerHTML = `원하는 음료의 번호를 입력하세요`;
      })
    }
  }

  selectNums(val) {
    val.forEach(elem => {
      elem.addEventListener('click', (event) => {
        this.monitor.selectDecision += event.target.innerHTML;
        this.monitor.statusScreen.innerHTML = `입력 변호: ${this.monitor.selectDecision}`;
      })
    });
  }

  selectZero(val) {
    val.addEventListener('click', (event) => {
      this.monitor.selectDecision += '0';
    });
  }

  selectConfirm(val) {
    val.addEventListener('click', (event) => {
      this.monitor.selectDecision = Number(this.monitor.selectDecision);
      inputCoin = Number(this.monitor.coinStatus.innerHTML);
      this.monitor.purchase()
      this.monitor.availableItems();
    });
  }
}


const control = new Controls();


control.insertCoin();
control.selectNums(control.buttonLists.buttonNums);
control.selectZero(control.buttonLists.buttonZero);
control.selectConfirm(control.buttonLists.buttonConfirm);
control.monitor.statusScreen.innerHTML = "동전을 넣어주세요"