class VMController {
  constructor(vmView) {
    this.vmView = vmView;
    this.sumCoin = 0;
    this.inputCoin = 0;
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
  }
  
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


  clickNumBtns(nums) {
    nums.forEach(elem => {
      elem.addEventListener('click', (event) => {
        this.vmView.selectDecision += event.target.innerText;
        this.vmView.setMessage(`입력 번호: ${this.vmView.selectDecision}`);
      })
    });
  }

  clickZeroBtn(num0) {
    num0.addEventListener('click', () => {
      this.vmView.selectDecision += '0';
      this.vmView.setMessage(`입력 번호: ${this.vmView.selectDecision}`);
    });
  }

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

  clickReturnBtn(returnBtn) {
    returnBtn.addEventListener('click', (event) => {
      this.vmView.setMessage('반환은 불가능합니다.');
    })
  }
}