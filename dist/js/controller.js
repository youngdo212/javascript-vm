const { $qs, $qsa, $on } = require('./helpers');

var controllerObj = {
  init: function() {
    const ul = $qs('.selector__buttons__lists');
    const buttonZero = $qs('#selector__button__0');
    this.getItems();
    this.insert();
    this.selectBtns(ul, buttonZero, this.buttonConfirm);
    this.vmView.setMessage("동전을 넣어주세요");
  },

  getItems: function() {
    this.vmView.snacksEl.innerHTML += vmTemplate.showItems(this.vmView.snacksList, 'snack__template');
    this.vmView.slotEl.innerHTML += vmTemplate.showItems(this.vmView.coin, 'coin-slot__template');
    this.vmView.coinTotal.innerText = vmTemplate.sumMoney(this.vmView.coin);
  },

  activateBtn: function() {
    return Number(this.vmView.coinStatus.innerText) >= 300 ?
      this.buttonConfirm.disabled = false : this.buttonConfirm.disabled = true;
  },

  insert: function() {
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
  },


  selectItems: function() {
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
  },


  selectBtns: function(ul) {
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

function VMController(vmView, vmTemplate) {
  return {
    vmView: vmView,
    vmTemplate: vmTemplate,
    buttonConfirm: $qs('#selector__button__confirm'),
    selectDecision: ''
  }
}

module.exports = controllerObj