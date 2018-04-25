class VMController {
  constructor(vmView) {
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
    this.buttonReturn = document.querySelector('#selector__button__return');
    this.vmView = vmView;
  }

  init() {
    const buttonsLists = document.querySelector('.selector__buttons__lists');
    const zero = document.querySelector('#selector__button__0');
    let nums = buttonsLists.querySelectorAll('.selector__buttons__items');

    this.vmView.setMessage("동전을 넣어주세요");
    this.insertCoin();
    this.clickNumBtns(nums);
    this.clickZeroBtn(zero);
    this.clickConfirmBtn(this.buttonConfirm);
    this.clickReturnBtn(this.buttonReturn);
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
      this.vmView.selectDecision = '';
      coin[idx].store--;
      sumCoin -= coin[idx].value;
      inputCoin += coin[idx].value;
      totalCoin.innerText = `₩ ${sumCoin}원`;
      this.vmView.coinStatus.innerText = inputCoin;
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

  clickNumBtns(nums) {
    nums.forEach(elem => {
      elem.addEventListener('click', (event) => {
        this.vmView.selectDecision += event.target.innerText;
        this.vmView.setMessage(`입력 번호: ${this.vmView.selectDecision}`);
      })
    });
  }

  clickZeroBtn(zero) {
    zero.addEventListener('click', () => {
      this.vmView.selectDecision += '0';
      this.vmView.setMessage(`입력 번호: ${this.vmView.selectDecision}`);
    });
  }

  clickConfirmBtn(confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (Number(this.vmView.selectDecision) <= bevLists.length) {
        this.vmView.selectDecision = Number(this.vmView.selectDecision);
        inputCoin = Number(this.vmView.coinStatus.innerText);
        this.vmView.outputResult();
      } else {
        this.vmView.selectDecision = '';
        this.vmView.setMessage(`번호를 ${bevLists.length} 이하로 입력해주세요.`);
      }
    });
  }

  clickReturnBtn(returnBtn) {
    returnBtn.addEventListener('click', (event) => {
      this.vmView.setMessage('반환은 불가능합니다.');
    })
  }
}