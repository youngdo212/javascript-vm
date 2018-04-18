class Renders {
  constructor() {
    this.coinOutput = '';
    this.bevOutput = '';
    this.beverages = document.querySelector('.beverage__lists');
    this.slot = document.querySelector('.coin-slot__lists');
  }

  init() {
    render.renderCoin(coin);
    render.renderBeverage(bevLists);
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
render.init();




class Monitors {
  constructor() {
    this.selectDecision = '';
    this.bevItems = render.beverages.querySelectorAll('.beverage__items');
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
  };

  activateBtn() {
    Number(this.coinStatus.innerHTML) >= 300 ?
      vmControl.buttonConfirm.disabled = false :
      vmControl.buttonConfirm.disabled = true;
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
        vmControl.monitor.selectDecision = '';
      }
    });
  }
}


const monitor = new Monitors();


class VMController {
  constructor() {
    this.selectButtonsLists = document.querySelector('.selector__buttons__lists');
    this.buttonNums = this.selectButtonsLists.querySelectorAll('.selector__buttons__items');
    this.buttonZero = document.querySelector('#selector__button__0');
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
    this.coinButtons = render.slot.querySelectorAll('.coin-slot__buttons');
    this.stores = render.slot.querySelectorAll('.coin__left');
  }

  init() {
    vmControl.insertCoin();
    vmControl.selectZero(vmControl.buttonZero);
    vmControl.selectNums(vmControl.buttonNums);
    vmControl.selectConfirm(vmControl.buttonConfirm);
    monitor.statusScreen.innerHTML = "동전을 넣어주세요"
  }

  insertCoin() {
    this.coinButtons.forEach((element, idx) => {
      element.addEventListener('click', event => {
        monitor.selectDecision = '';
        coin[idx].store--;

        if (coin[idx].store <= 0) {
          this.coinButtons[idx].disabled = true;
          this.coinButtons[idx].style.backgroundColor = '#cfcfcf'
        }

        sumCoin -= coin[idx].value;
        inputCoin += coin[idx].value;
        totalCoin.innerHTML = `₩ ${sumCoin}원`;
        monitor.coinStatus.innerHTML = inputCoin;
        this.stores[idx].innerHTML = `${coin[idx].store}개`;

        monitor.activateBtn();
        monitor.availableItems();
        monitor.statusScreen.innerHTML = `원하는 음료의 번호를 입력하세요`;
      })
    })
  }

  selectZero(val) {
    val.addEventListener('click', (event) => {
      monitor.selectDecision += '0';
      monitor.statusScreen.innerHTML = `입력 번호: ${monitor.selectDecision}`;
    });
  }

  selectNums(val) {
    val.forEach(elem => {
      elem.addEventListener('click', (event) => {
        monitor.selectDecision += event.target.innerText;
        monitor.statusScreen.innerText = `입력 번호: ${monitor.selectDecision}`;
      })
    });
  }

  selectConfirm(val) {
    val.addEventListener('click', (event) => {
      monitor.selectDecision = Number(monitor.selectDecision);
      inputCoin = Number(monitor.coinStatus.innerHTML);
      monitor.purchase()
      monitor.availableItems();
    });
  }
}


const vmControl = new VMController(monitor);


vmControl.init();