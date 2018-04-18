class Renders {
  constructor() {
    this.beverages = document.querySelector('.beverage__lists');
    this.slot = document.querySelector('.coin-slot__lists');
  }

  init() {
    render.renderCoin(coin);
    render.renderBeverage(bevLists);
  }

  renderCoin(val) {
    let coinOutput = '';
    coinOutput = val.reduce((acc, curr) => {
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
    this.slot.innerHTML += coinOutput;
  };


  renderBeverage(val) {
    let bevOutput = '';
    bevOutput = val.reduce((acc, curr) => {
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
    return this.beverages.innerHTML += bevOutput;
  };
}


const render = new Renders();
render.init();



class Monitors {
  constructor() {
    this.selectDecision = '';
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
  };

  activateBtn() {
    Number(this.coinStatus.innerHTML) >= 300 ?
      vmControl.buttonConfirm.disabled = false :
      vmControl.buttonConfirm.disabled = true;
  };

  availableItems() {
    const bevItems = render.beverages.querySelectorAll('.beverage__items');
    bevItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerHTML) < bevLists[idx].price ?
        elem.style.backgroundImage = '' :
        elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    });
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
        this.selectDecision = '';
      }
    });
  }
}


const monitor = new Monitors();


class VMController {
  constructor() {
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
    this.stores = render.slot.querySelectorAll('.coin__left');
  }

  init() {
    const selectButtonsLists = document.querySelector('.selector__buttons__lists');
    let nums = selectButtonsLists.querySelectorAll('.selector__buttons__items');
    let zero = document.querySelector('#selector__button__0');

    vmControl.insertCoin();
    vmControl.clickBtns(nums, zero, vmControl.buttonConfirm);
    monitor.statusScreen.innerHTML = "동전을 넣어주세요"
  }

  insertCoin() {
    const stores = render.slot.querySelectorAll('.coin__left');
    const coinButtons = render.slot.querySelectorAll('.coin-slot__buttons');

    coinButtons.forEach((element, idx) => {
      element.addEventListener('click', event => {
        this.selectDecision = '';
        coin[idx].store--;

        if (coin[idx].store <= 0) {
          coinButtons[idx].disabled = true;
          coinButtons[idx].style.backgroundColor = '#cfcfcf'
        }

        sumCoin -= coin[idx].value;
        inputCoin += coin[idx].value;
        totalCoin.innerText = `₩ ${sumCoin}원`;
        monitor.coinStatus.innerText = inputCoin;
        stores[idx].innerText = `${coin[idx].store}개`;

        monitor.activateBtn();
        monitor.availableItems();
        monitor.statusScreen.innerText = `원하는 음료의 번호를 입력하세요`;
      })
    })
  }


  clickBtns(nums, zero, confirm) {

    nums.forEach(elem => {
      elem.addEventListener('click', (event) => {
        monitor.selectDecision += event.target.innerText;
        monitor.statusScreen.innerText = `입력 번호: ${monitor.selectDecision}`;
      })
    });

    zero.addEventListener('click', (event) => {
      monitor.selectDecision += '0';
      monitor.statusScreen.innerHTML = `입력 번호: ${monitor.selectDecision}`;
    });

    confirm.addEventListener('click', (event) => {
      monitor.selectDecision = Number(monitor.selectDecision);
      inputCoin = Number(monitor.coinStatus.innerHTML);
      monitor.purchase()
      monitor.availableItems();
    });
  }
}



const vmControl = new VMController(monitor);


vmControl.init();