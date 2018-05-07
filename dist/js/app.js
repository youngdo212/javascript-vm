class VMModeler {

  constructor(vmView) {
    this.vmView = vmView;
  }

  initRender(val, templateId) {
    return val.reduce((acc, curr) => acc += this.vmView.template(templateId, curr), '')
  }

  isRightSelected() {
    return this.vmView.snacksList.filter((elem, idx) => elem.id === this.vmView.selectDecision);
  }

  sumMoney(val) {
    return val.reduce((acc, curr) => this.vmView.sumCoin += curr.store * curr.value, '');
  }

  renderLoaders() {
    let output = `
    <div class="spinner__container">
      <ul class="spinner__cont">
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
      </ul>
    </div>
    `
    return output
  }
}



class VMViewer {
  constructor(snacksList, coin) {
    this.slotEl = document.querySelector('.coin-slot__lists');
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
    this.totalCoin = document.querySelector('#coin__total');
    this.snacksEl = document.querySelector('.snack__lists');
    this.snacksList = snacksList;
    this.coin = coin;
    this.selectDecision = '';
    this.sumCoin = 0;
    this.inputCoin = 0;
  }

  template(templateid, data) {
    return document.getElementById(templateid).innerHTML
      .replace(/{{(\w*)}}/g, (m, key) => data.hasOwnProperty(key) ? data[key] : "");
  }


  setMessage(message) {
    return this.statusScreen.innerText = message;
  }


  validateItems() {
    const snackItems = this.snacksEl.querySelectorAll('.snack__items');
    snackItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) < this.snacksList[idx].price ?
        elem.style.backgroundImage = '' : elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    });
  }
}




class VMController {
  constructor(vmView, vmModel) {
    this.vmView = vmView;
    this.vmModel = vmModel;
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
  }

  init() {
    const buttonsLists = document.querySelector('.selector__buttons__lists');
    const buttonZero = document.querySelector('#selector__button__0');
    const nums = buttonsLists.querySelectorAll('.selector__buttons__items');

    this.renders();
    this.insertCoin();
    this.clickBtns(nums, buttonZero, this.buttonConfirm);
    this.vmView.setMessage("동전을 넣어주세요");
  }

  renders() {
    this.vmView.snacksEl.innerHTML += vmModel.initRender(this.vmView.snacksList, 'snack__template');
    this.vmView.slotEl.innerHTML += vmModel.initRender(this.vmView.coin, 'coin-slot__template');
    this.vmView.totalCoin.innerText = vmModel.sumMoney(this.vmView.coin);
  }


  activateBtn() {
    return Number(this.vmView.coinStatus.innerText) >= 300 ? 
    this.buttonConfirm.disabled = false : this.buttonConfirm.disabled = true;
  }


  insertCoin() {
    const coinButtons = this.vmView.slotEl.querySelectorAll('.coin-slot__buttons');
    const changeCoinBtnStatus = (idx) => {
      if (coin[idx].store <= 0) {
        coinButtons[idx].disabled = true;
        coinButtons[idx].style.backgroundColor = '#cfcfcf';
      }
    }

    const changeCoinStatus = (idx) => {
      const stores = this.vmView.slotEl.querySelectorAll('.coin__left');
      let { selectDecision, coin, sumCoin, totalCoin, coinStatus } = this.vmView
      selectDecision = '';
      coin[idx].store--;
      totalCoin.innerText -= coin[idx].value;
      this.vmView.inputCoin += coin[idx].value;
      coinStatus.innerText = this.vmView.inputCoin;
      stores[idx].innerText = `${coin[idx].store}개`;
    }

    coinButtons.forEach((elem, idx) => {
      elem.addEventListener('click', event => {
        changeCoinStatus(idx)
        changeCoinBtnStatus(idx);
        this.activateBtn();
        this.vmView.validateItems();
        this.vmView.setMessage(`원하는 음료의 번호를 입력하세요`);
      })
    })
  }


  purchaseItems() {
    const { vmView } = this
    this.vmModel.isRightSelected().forEach((elem, idx) => {
      const { id, working, price, name } = elem;
      if (!working) return vmView.setMessage("고장난 상품입니다. 다시 눌러주세요");
      if (price <= Number(vmView.coinStatus.innerText)) {
        vmView.coinStatus.innerText -= price;
        vmView.inputCoin = Number(vmView.coinStatus.innerText);
        vmView.setMessage(`${name}(이)가 나왔습니다`);
        this.activateBtn();
      } else {
        vmView.setMessage("동전을 더 넣어주세요");
      }
    });
    vmView.selectDecision = '';
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
      if (Number(this.vmView.selectDecision) <= vmView.snacksList.length) {
        this.vmView.selectDecision = Number(this.vmView.selectDecision);
        vmView.inputCoin = Number(this.vmView.coinStatus.innerText);
        outputResult();
      } else {
        this.vmView.selectDecision = '';
        this.vmView.setMessage(`번호를 ${vmView.snacksList.length} 이하로 입력해주세요.`);
      }
    });

    const outputResult = () => {
      if (this.vmView.selectDecision !== 0) {
        this.vmView.setMessage('');
        this.vmView.statusScreen.innerHTML += vmModel.renderLoaders();
        setTimeout(() => {
          this.purchaseItems();
          this.vmView.validateItems();
        }, 1500);
      } else {
        this.vmView.setMessage('잘못된 방법입니다.');
        this.vmView.selectDecision = '';
      }
    }
  }
}

const vmView = new VMViewer(snacksList, coin);
const vmModel = new VMModeler(vmView);
const vmControl = new VMController(vmView, vmModel);


vmControl.init();