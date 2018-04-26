class VMModeler {  
  constructor() {}

  init() {
    this.renderCoin(coin);
    this.renderSnacks(snacksList);
  }

  renderCoin(val) {
    let coinOutput = '';
    coinOutput = val.reduce((acc, curr) => {
      vmView.sumCoin += curr.value * curr.store;
      return acc += `
      <li>
        <button class="coin-slot__buttons">${curr.name}</button>
          <p class="coin__left">${curr.store}개
        </button>
      </li>
      `
    }, '')
    vmView.totalCoin.innerText = `₩ ${vmView.sumCoin}원`
    vmView.slot.innerHTML += coinOutput;
  };

  renderSnacks(val) {
    let snackOutput = '';
    snackOutput = val.reduce((acc, curr) => {
      return acc += `
      <li class="snack__items">
        <p class="snack__name">${curr.name}</p>
        <p class="snack__price">
          <span class="snack__id">${curr.id}. </span>
          ${curr.price}원
        </p>
      </li>
      `;
    }, '');
    return vmView.snacks.innerHTML += snackOutput;
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
    return vmView.statusScreen.innerHTML += loaderOutput;
  }
}




class VMViewer {
  constructor() {
    this.snacks = document.querySelector('.snack__lists');
    this.slot = document.querySelector('.coin-slot__lists');

    this.selectDecision = '';
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
    this.totalCoin = document.querySelector('#coin__total');
    this.sumCoin = 0
    this.inputCoin = 0;


  }

  setMessage(message) {
    return this.statusScreen.innerText = message;
  }


  activateBtn() {
    Number(this.coinStatus.innerText) >= 300 ?
      vmControl.buttonConfirm.disabled = false :
      vmControl.buttonConfirm.disabled = true;
  }

  validateItems() {
    const bevItems = this.snacks.querySelectorAll('.snack__items');
    bevItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) < snacksList[idx].price ?
        elem.style.backgroundImage = '' :
        elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    });
  }

  purchaseItems() {
    snacksList.forEach((elem, idx) => {
      const {
        id,
        working,
        price,
        name
      } = elem;

      if (id !== this.selectDecision) return;
      if (!working) return this.setMessage("고장난 상품입니다. 다시 눌러주세요");
      if (price <= Number(this.coinStatus.innerText)) {
        this.coinStatus.innerText -= price;
        this.inputCoin = Number(this.coinStatus.innerText);
        this.setMessage(`${name}(이)가 나왔습니다`);
        this.activateBtn();
      } else {
        this.setMessage("동전을 더 넣어주세요");
      }
    });
    this.selectDecision = '';
  }
}

class VMController {
  constructor(vmView) {
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
    this.stores = vmView.slot.querySelectorAll('.coin__left');
    this.vmView = vmView;
  }

  init() {
    const buttonsLists = document.querySelector('.selector__buttons__lists');
    const zero = document.querySelector('#selector__button__0');
    let nums = buttonsLists.querySelectorAll('.selector__buttons__items');
    this.insertCoin();
    this.clickBtns(nums, zero, this.buttonConfirm);
    this.vmView.setMessage("동전을 넣어주세요");
  }

  insertCoin() {
    const stores = vmView.slot.querySelectorAll('.coin__left');
    const coinButtons = vmView.slot.querySelectorAll('.coin-slot__buttons');
    const changeCoinBtnStatus = (idx) => {
      if (coin[idx].store <= 0) {
        coinButtons[idx].disabled = true;
        coinButtons[idx].style.backgroundColor = '#cfcfcf'
      }
    }

    const changeCoinStatus = (idx) => {
      this.vmView.selectDecision = '';
      coin[idx].store--;
      vmView.sumCoin -= coin[idx].value;
      vmView.inputCoin += coin[idx].value;
      vmView.totalCoin.innerText = `₩ ${vmView.sumCoin}원`;
      this.vmView.coinStatus.innerText = vmView.inputCoin;
      stores[idx].innerText = `${coin[idx].store}개`;
    }

    coinButtons.forEach((element, idx) => {
      element.addEventListener('click', event => {
        changeCoinStatus(idx)
        changeCoinBtnStatus(idx);
        this.vmView.activateBtn();
        this.vmView.validateItems();
        this.vmView.setMessage(`원하는 음료의 번호를 입력하세요`);
      })
    })
  }


  clickBtns(nums, zero, confirm) {
    nums.forEach(elem => {
      elem.addEventListener('click', (event) => {
        this.vmView.selectDecision += event.target.innerText;
        this.vmView.setMessage(`입력 번호: ${this.vmView.selectDecision}`);
      })
    });

    zero.addEventListener('click', (event) => {
      this.vmView.selectDecision += '0';
      this.vmView.setMessage(`입력 번호: ${this.vmView.selectDecision}`);
    });

    confirm.addEventListener('click', (event) => {

      if (Number(this.vmView.selectDecision) <= snacksList.length) {
        this.vmView.selectDecision = Number(this.vmView.selectDecision);
        vmView.inputCoin = Number(this.vmView.coinStatus.innerText);
        outputResult();
      } else {
        this.vmView.selectDecision = '';
        this.vmView.setMessage(`번호를 ${snacksList.length} 이하로 입력해주세요.`);
      }
    });

    const outputResult = () => {
      if (this.isVaild()) {
        this.vmView.setMessage('');
        vmModel.renderLoaders();
        setTimeout(() => {
          this.vmView.purchaseItems();
          this.vmView.validateItems();
        }, 1750);
      } else {
        this.vmView.setMessage('잘못된 방법입니다.');
        this.vmView.selectDecision = '';
      }
    }
  }

  isVaild() {
    return this.vmView.coinStatus.innerText !== '0' &&
      this.vmView.selectDecision !== 0;
  }
}

const vmModel = new VMModeler();
const vmView = new VMViewer();
const vmControl = new VMController(vmView);


vmModel.init();
vmControl.init();