class Renders {
  constructor() {
    this.beverages = document.querySelector('.beverage__lists');
    this.slot = document.querySelector('.coin-slot__lists');
  }

  init() {
    this.renderCoin(coin);
    this.renderBeverage(bevLists);
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
    totalCoin.innerText = `₩ ${sumCoin}원`
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

  renderLoaders() {
    let loaderOutput = '';
    loaderOutput += `
    <div class="spinner__container">
      <ul class="spinner__cont">
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
      </ul>
    </div>
    `;
    return monitor.statusScreen.innerHTML += loaderOutput;
  }
}




class Monitors {
  constructor() {
    this.selectDecision = '';
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
  }

  activateBtn() {
    Number(this.coinStatus.innerText) >= 300 ?
      vmControl.buttonConfirm.disabled = false :
      vmControl.buttonConfirm.disabled = true;
  }

  validateItems() {
    const bevItems = render.beverages.querySelectorAll('.beverage__items');
    bevItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) < bevLists[idx].price ?
        elem.style.backgroundImage = '' :
        elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    });
  }



  purchaseItems() {
    bevLists.forEach((elem, idx) => {

      if (this.isValidate(elem)) {
        this.coinStatus.innerText -= elem.price;
        inputCoin = Number(this.coinStatus.innerText);
        this.statusScreen.innerText = `${elem.name}가 나왔습니다`;
        this.selectDecision = '';
        this.activateBtn();

      } else if (this.isNotValidate(elem)) {
        this.statusScreen.innerText = "동전을 더 넣어주세요";
        this.selectDecision = '';

      } else if (this.isNotWorking(elem)) {
        this.statusScreen.innerText = "고장난 상품입니다. 다시 눌러주세요";
        this.selectDecision = '';
      }
    });
  }

  isValidate(val) {
    return val.id === this.selectDecision &&
      val.price <= Number(this.coinStatus.innerText) &&
      val.working;
  }

  isNotValidate(val) {
    return val.id === this.selectDecision &&
      val.price > Number(this.coinStatus.innerText) &&
      val.working;
  }

  isNotWorking(val) {
    return val.id === this.selectDecision &&
      val.price <= Number(this.coinStatus.innerText) &&
      !val.working;
  }
}



class VMController {
  constructor(monitor) {
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
    this.stores = render.slot.querySelectorAll('.coin__left');
    this.monitor = monitor;
  }

  init() {
    const buttonsLists = document.querySelector('.selector__buttons__lists');
    const zero = document.querySelector('#selector__button__0');
    let nums = buttonsLists.querySelectorAll('.selector__buttons__items');
    this.insertCoin();
    this.clickBtns(nums, zero, this.buttonConfirm);
    this.monitor.statusScreen.innerText = "동전을 넣어주세요"
  }

  insertCoin() {
    const stores = render.slot.querySelectorAll('.coin__left');
    const coinButtons = render.slot.querySelectorAll('.coin-slot__buttons');
    const changeCoinBtnStatus = (idx) => {
      if (coin[idx].store <= 0) {
        coinButtons[idx].disabled = true;
        coinButtons[idx].style.backgroundColor = '#cfcfcf'
      }
    }

    const changeCoinStatus = (idx) => {
      this.monitor.selectDecision = '';
      coin[idx].store--;
      sumCoin -= coin[idx].value;
      inputCoin += coin[idx].value;
      totalCoin.innerText = `₩ ${sumCoin}원`;
      this.monitor.coinStatus.innerText = inputCoin;
      stores[idx].innerText = `${coin[idx].store}개`;
    }


    coinButtons.forEach((element, idx) => {
      element.addEventListener('click', event => {
        changeCoinStatus(idx)
        changeCoinBtnStatus(idx);
        this.monitor.activateBtn();
        this.monitor.validateItems();
        this.monitor.statusScreen.innerText = `원하는 음료의 번호를 입력하세요`;
      })
    })
  }

  clickBtns(nums, zero, confirm) {
    nums.forEach(elem => {
      elem.addEventListener('click', (event) => {
        this.monitor.selectDecision += event.target.innerText;
        this.monitor.statusScreen.innerText = `입력 번호: ${this.monitor.selectDecision}`;
      })
    });

    zero.addEventListener('click', (event) => {
      this.monitor.selectDecision += '0';
      this.monitor.statusScreen.innerText = `입력 번호: ${this.monitor.selectDecision}`;
    });

    confirm.addEventListener('click', (event) => {

      if (Number(this.monitor.selectDecision) <= 32) {
        this.monitor.selectDecision = Number(this.monitor.selectDecision);
        inputCoin = Number(this.monitor.coinStatus.innerText);
        outputResult();
      } else {
        this.monitor.selectDecision = '';
        this.monitor.statusScreen.innerHTML = `번호를 ${bevLists.length} 이하로 입력해주세요.`;
      }


    });

    const outputResult = () => {
      if (this.isVaild()) {
        this.monitor.statusScreen.innerHTML = '';
        render.renderLoaders();
        setTimeout(() => {
          this.monitor.purchaseItems();
          this.monitor.validateItems();
        }, 1750);
      } else {
        this.monitor.statusScreen.innerHTML = '잘못된 방법입니다.';
        this.monitor.selectDecision = '';
      }
    }
  }

  isVaild() {
    return this.monitor.statusScreen.innerHTML !== '동전을 넣어주세요' &&
      this.monitor.coinStatus.innerText !== '0' &&
      this.monitor.selectDecision !== 0;
  }
}

const render = new Renders();
const monitor = new Monitors();
const vmControl = new VMController(monitor);


render.init();
vmControl.init();