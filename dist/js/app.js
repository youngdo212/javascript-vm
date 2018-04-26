class VMModeler {
  constructor(vmControl) {
    this.vmControl = vmControl;
  }

  purchaseItems() {
    vmView.snacksList.forEach((elem, idx) => {
      const {
        id,
        working,
        price,
        name
      } = elem;

      if (id !== vmView.selectDecision) return;

      if (!working) {
        return vmView.setMessage("고장난 상품입니다. 다시 눌러주세요")
      };

      if (price <= Number(vmView.coinStatus.innerText)) {
        vmView.coinStatus.innerText -= price;
        vmView.inputCoin = Number(vmView.coinStatus.innerText);
        vmView.setMessage(`${name}(이)가 나왔습니다`);
        vmView.activateBtn();
      } else {
        vmView.setMessage("동전을 더 넣어주세요");
      }
    });
    vmView.selectDecision = '';
  }






  initRender(val, templateId) {
    let output = '';
    output = val.reduce((acc, curr) => {
      curr.hasOwnProperty('value')?vmView.sumCoin += curr.value * curr.store : '';
      return acc += vmView.template(templateId, curr);
    }, '')
    return output;
  }



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
    return loaderOutput;
  }
}




class VMViewer {
  constructor() {
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
    this.buttonZero = document.querySelector('#selector__button__0');
    this.statusScreen = document.querySelector('.selector__status__items');
    this.coinStatus = document.querySelector('.selector__status__coin');
    this.totalCoin = document.querySelector('#coin__total');
    this.slot = document.querySelector('.coin-slot__lists');
    this.snacks = document.querySelector('.snack__lists');
    this.snacksList = snacksList;
    this.selectDecision = '';
    this.inputCoin = 0;
    this.sumCoin = 0;
    this.coin = coin;
  }


  template(templateid, data) {
    return document.getElementById(templateid).innerHTML
      .replace(/{{(\w*)}}/g, (m, key) => data.hasOwnProperty(key) ? data[key] : "");
  }


  init() {
    this.snacks.innerHTML += vmModel.initRender(this.snacksList, 'snack__template');
    this.slot.innerHTML += vmModel.initRender(this.coin, 'coin-slot__template');
    this.totalCoin.innerText = `₩ ${this.sumCoin}원`
  }


  setMessage(message) {
    return this.statusScreen.innerText = message;
  }


  activateBtn() {
    Number(this.coinStatus.innerText) >= 300 ?
      this.buttonConfirm.disabled = false :
      this.buttonConfirm.disabled = true;
  }

  validateItems() {
    const snackItems = this.snacks.querySelectorAll('.snack__items');
    snackItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) < this.snacksList[idx].price ?
        elem.style.backgroundImage = '' : elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    });
  }
}



class VMController {
  constructor(vmView) {
    this.vmView = vmView;
  }

  init() {
    const buttonsLists = document.querySelector('.selector__buttons__lists');
    let nums = buttonsLists.querySelectorAll('.selector__buttons__items');
    this.insertCoin();
    this.clickBtns(nums, this.vmView.buttonZero, this.vmView.buttonConfirm);
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
        vmView.activateBtn();
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
      if (this.isVaild()) {
        this.vmView.setMessage('');
        vmView.statusScreen.innerHTML += vmModel.renderLoaders();
        setTimeout(() => {
          vmModel.purchaseItems();
          this.vmView.validateItems();
        }, 1750);
      } else {
        this.vmView.setMessage('잘못된 방법입니다.');
        this.vmView.selectDecision = '';
      }
    }
  }

  isVaild() {
    return this.vmView.selectDecision !== 0;
  }
}

const vmView = new VMViewer();
const vmControl = new VMController(vmView);
const vmModel = new VMModeler(vmControl);


vmView.init();
vmControl.init();