class Gaia {
  constructor() {
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
    this.slot = document.querySelector('.coin-slot__lists');
    this.beverages = document.querySelector('.beverage__lists');
    this.totalCoin = document.querySelector('#coin__total');
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
    
    this.vmControl = new VMController();
    this.bevLists = bevLists;
    this.vmView = vmView;

    this.sumCoin = 0;
    this.inputCoin = 0;
    
    this.coin = coin;
    this.selectDecision = '';
  }

 

  /* ======================================================================================================================== */
  

  /* ======================================================================================================================== */
  
  validateItems() {
    const bevItems = vmTemplate.beverages.querySelectorAll('.beverage__items');
    bevItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) >= bevLists[idx].price ?
        elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)' : elem.style.backgroundImage = '';
    });
  }
  /* ======================================================================================================================== */
  purchaseItems() {
    bevLists.forEach((elem, idx) => {
      const {
        id,
        working,
        price,
        name
      } = elem;

      if (id !== this.selectDecision) return;
      if (!working) return this.setMessage("고장난 상품입니다. 다시 눌러주세요");

      if (Number(this.coinStatus.innerText) >= price) {
        this.coinStatus.innerText -= price;
        vmControl.inputCoin = Number(this.coinStatus.innerText);
        this.setMessage(`${name}(이)가 나왔습니다`);
        this.activateBtn();
      } else {
        this.setMessage("동전을 더 넣어주세요");
      }
    });
    this.selectDecision = '';
  }
  /* ======================================================================================================================== */
  outputResult() {
    if (vmView.selectDecision) {
      this.setMessage('');
      vmTemplate.renderLoaders();
      setTimeout(() => {
        this.purchaseItems();
        this.validateItems();
      }, 1750);
    } else {
      this.setMessage('잘못된 방법입니다.');
      this.selectDecision = '';
    }
  }
  /* ======================================================================================================================== */


  init() {
    this.renderCoin(this.coin);
    this.renderBeverage(this.bevLists);
  }

  /* ======================================================================================================================== */

  renderCoin(val) {
    let coinOutput = '';
    coinOutput = val.reduce((acc, curr) => {
      vmControl.sumCoin += curr.value * curr.store;
      return acc += `
      <li>
        <button class="coin-slot__buttons">${curr.name}</button>
          <p class="coin__left">${curr.store}개
        </button>
      </li>
      `
    }, '')
    this.totalCoin.innerText = `₩ ${vmControl.sumCoin}원`
    this.slot.innerHTML += coinOutput;
  }

  /* ======================================================================================================================== */

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
  }

  /* ======================================================================================================================== */


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

  /* ======================================================================================================================== */

  init() {
    const buttonsLists = document.querySelector('.selector__buttons__lists');
    const buttonReturn = document.querySelector('#selector__button__return');
    const num0 = document.querySelector('#selector__button__0');
    let nums = buttonsLists.querySelectorAll('.selector__buttons__items');
    this.vmView.setMessage("동전을 넣어주세요");
    this.insertCoin();
    this.clickNumBtns(nums);
    this.clickZeroBtn(num0);
    this.clickConfirmBtn(this.buttonConfirm);
    this.clickReturnBtn(buttonReturn);
  }

  /* ======================================================================================================================== */

  insertCoin() {
    const stores = vmTemplate.slot.querySelectorAll('.coin__left');
    const coinButtons = vmTemplate.slot.querySelectorAll('.coin-slot__buttons');

    const changeCoinBtnStatus = (idx) => {
      if (coin[idx].store <= 0) {
        coinButtons[idx].disabled = true;
        coinButtons[idx].style.backgroundColor = '#cfcfcf'
      }
    }

    const changeCoinStatus = (idx) => {
      this.vmView.selectDecision = '';
      vmTemplate.coin[idx].store--;
      this.sumCoin -= coin[idx].value;
      this.inputCoin += coin[idx].value;
      vmTemplate.totalCoin.innerText = `₩ ${this.sumCoin}원`;
      this.vmView.coinStatus.innerText = this.inputCoin;
      stores[idx].innerText = `${coin[idx].store}개`;
    }

    coinButtons.forEach((elem, idx) => {
      elem.addEventListener('click', event => {
        changeCoinStatus(idx);
        changeCoinBtnStatus(idx);
        this.vmView.activateBtn();
        this.vmView.validateItems();
        this.vmView.setMessage(`원하는 음료의 번호를 입력하세요`);
      })
    })
  }
  /* ======================================================================================================================== */


  clickNumBtns(nums) {
    nums.forEach(elem => {
      elem.addEventListener('click', (event) => {
        this.vmView.selectDecision += event.target.innerText;
        this.vmView.setMessage(`입력 번호: ${this.vmView.selectDecision}`);
      })
    });
  }
  /* ======================================================================================================================== */

  clickZeroBtn(num0) {
    num0.addEventListener('click', () => {
      this.vmView.selectDecision += '0';
      this.vmView.setMessage(`입력 번호: ${this.vmView.selectDecision}`);
    });
  }
  /* ======================================================================================================================== */

  clickConfirmBtn(confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (Number(this.vmView.selectDecision) <= bevLists.length) {
        this.vmView.selectDecision = Number(this.vmView.selectDecision);
        this.inputCoin = Number(this.vmView.coinStatus.innerText);
        this.vmView.outputResult();
      } else {
        this.vmView.selectDecision = '';
        this.vmView.setMessage(`번호를 ${bevLists.length} 이하로 입력해주세요.`);
      }
    });
  }
  /* ======================================================================================================================== */
  clickReturnBtn(returnBtn) {
    returnBtn.addEventListener('click', (event) => {
      this.vmView.setMessage('반환은 불가능합니다.');
    })
  }
}


const gaia = new Gaia();

gaia();


class VMController {
  consturctor() {

  }
}




