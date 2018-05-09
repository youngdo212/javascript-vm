


class VMTemplate {
  constructor(vmView) {
    this.vmView = vmView;
  }

  showItems(val, templateId) {
    return val.reduce((acc, curr) => acc += this.vmView.template(templateId, curr), '')
  }

  sumMoney(val) {
    return val.reduce((acc, curr) => this.vmView.coinSum += curr.store * curr.value, '');
  }

  showLoaders() {
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
    return output;
  }
}



class VMViewer {
  constructor(coin, snacksList) {
    this.coin = coin;
    this.snacksList = snacksList;
    this.slotEl = $qs('.coin-slot__lists');
    this.screen = $qs('.selector__status__items');
    this.coinStatus = $qs('.selector__status__coin');
    this.coinTotal = $qs('#coin__total');
    this.snacksEl = $qs('.snack__lists');
    this.coinSum = 0;
    this.inputCoin = 0;
  }

  isSelected() {
    return this.snacksList.filter((elem, idx) => elem.id === vmControl.selectDecision);
  }

  template(templateid, data) {
    return document.getElementById(templateid).innerHTML
      .replace(/{{(\w*)}}/g, (match, key) => data.hasOwnProperty(key) ? data[key] : "");
  }

  setMessage(message) {
    return this.screen.innerText = message;
  }

  validateItems() {
    const snackItems = $qsa('.snack__items', this.snacksEl);
    snackItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) < this.snacksList[idx].price ?
        elem.style.backgroundImage = '' : elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    });
  }
}


class VMController {
  constructor(vmView, vmTemplate) {
    this.vmView = vmView;
    this.vmTemplate = vmTemplate;
    this.buttonConfirm = $qs('#selector__button__confirm');
    this.selectDecision = '';
  }

  init() {
    const ul = $qs('.selector__buttons__lists');
    // const nums = $qsa('.selector__buttons__items', ul);
    const buttonZero = $qs('#selector__button__0');

    this.getItems();
    this.insert();
    this.selectBtns(ul, buttonZero, this.buttonConfirm);
    this.vmView.setMessage("동전을 넣어주세요");
  }

  getItems() {
    this.vmView.snacksEl.innerHTML += vmTemplate.showItems(this.vmView.snacksList, 'snack__template');
    this.vmView.slotEl.innerHTML += vmTemplate.showItems(this.vmView.coin, 'coin-slot__template');
    this.vmView.coinTotal.innerText = vmTemplate.sumMoney(this.vmView.coin);
  }


  activateBtn() {
    return Number(this.vmView.coinStatus.innerText) >= 300 ?
      this.buttonConfirm.disabled = false : this.buttonConfirm.disabled = true;
  }


  insert() {
    const coinButtons = $qsa('.coin-slot__buttons', this.vmView.slotEl);
    const disableCoinBtn = (idx) => {
      if (coin[idx].store <= 0) {
        coinButtons[idx].disabled = true;
        coinButtons[idx].style.backgroundColor = '#cfcfcf';
      }
    }

    const editStatus = (idx) => {
      const stores = $qsa('.coin__left', this.vmView.slotEl);
      let { coin, coinSum, coinTotal, coinStatus } = this.vmView;
      this.selectDecision = '';
      coin[idx].store--;
      coinTotal.innerText -= coin[idx].value;
      this.vmView.inputCoin += coin[idx].value;
      coinStatus.innerText = this.vmView.inputCoin;
      stores[idx].innerText = `${coin[idx].store}개`;
    }

    coinButtons.forEach((elem, idx) => {
      $on(elem, 'click', event => {
        editStatus(idx)
        disableCoinBtn(idx);
        this.activateBtn();
        this.vmView.validateItems();
        this.vmView.setMessage(`원하는 음료의 번호를 입력하세요`);
      })
    })
  }


  selectItems() {
    const { vmView } = this;
    this.vmView.isSelected().forEach((elem, idx) => {
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
    this.selectDecision = '';
  }


  selectBtns(ul) {
    $on(ul, 'click', event => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.id !== 'selector__button__return' && event.target.id !== 'selector__button__confirm') {
          this.selectDecision += event.target.innerText;
          this.vmView.setMessage(`입력 번호: ${this.selectDecision}`);
        } else if (event.target.id === 'selector__button__confirm') {
          if (Number(this.selectDecision) <= vmView.snacksList.length) {
            this.selectDecision = Number(this.selectDecision);
            vmView.inputCoin = Number(this.vmView.coinStatus.innerText);
            showResult();
          } else {
            this.selectDecision = '';
            this.vmView.setMessage(`번호를 ${vmView.snacksList.length} 이하로 입력해주세요.`);
          }
        }
      }
    });

    const showResult = () => {
      if (this.selectDecision !== 0) {
        this.vmView.setMessage('');
        this.vmView.screen.innerHTML += this.vmTemplate.showLoaders();
        setTimeout(() => {
          this.selectItems();
          this.vmView.validateItems();
        }, 1500);
      } else {
        this.vmView.setMessage('잘못된 방법입니다.');
        this.selectDecision = '';
      }
    }
  }
}

const vmView = new VMViewer(coin, snacksList);
const vmTemplate = new VMTemplate(vmView);
const vmControl = new VMController(vmView, vmTemplate);


vmControl.init();