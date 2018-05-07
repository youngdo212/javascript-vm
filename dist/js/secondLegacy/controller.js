class VMController {
  constructor() {
  }


  init() {
    this.insertCoin();
    this.purchaseItems();
  }

  insertCoin() {
    const stores = vmView.slot.querySelectorAll('.coin__left');
    const coinButtons = vmView.slot.querySelectorAll('.coin-slot__buttons');
    const changeCoinBtnStatus = (idx) => {
      if (vmView.coin[idx].store <= 0) {
        coinButtons[idx].disabled = true;
        coinButtons[idx].style.backgroundColor = '#cfcfcf'
      }
    }

    const changeCoinStatus = (idx) => {
      vmView.selectDecision = '';
      vmView.coin[idx].store--;
      vmView.sumCoin -= vmView.coin[idx].value;
      vmView.inputCoin += vmView.coin[idx].value;
      vmView.totalCoin.innerText = `₩ ${vmView.sumCoin}원`;
      vmView.coinStatus.innerText = vmView.inputCoin;
      stores[idx].innerText = `${vmView.coin[idx].store}개`;
    }

    coinButtons.forEach((elem, idx) => {
      elem.addEventListener('click', event => {
        changeCoinStatus(idx);
        changeCoinBtnStatus(idx);
        vmView.validateItems();
        vmView.setMessage(`원하는 음료의 번호를 입력하세요`);
      })
    })
  }


  purchaseItems() {
    vmView.snacksList.forEach((elem, idx) => {
      const {id,working,price,name} = elem;

      if (id !== this.selectDecision) return;
      if (!working) return this.setMessage("고장난 상품입니다. 다시 눌러주세요");
      if (Number(this.coinStatus.innerText) >= price) {
        this.coinStatus.innerText -= price;
        vmView.inputCoin = Number(this.coinStatus.innerText);
        this.setMessage(`${name}(이)가 나왔습니다`);
        this.activateBtn();
      } else {
        this.setMessage("동전을 더 넣어주세요");
      }
    });
    this.selectDecision = '';
  }


  clickNumBtns(nums) {
    nums.forEach(elem => {
      elem.addEventListener('click', (event) => {
        vmView.selectDecision += event.target.innerText;
        vmView.setMessage(`입력 번호: ${vmView.selectDecision}`);
      })
    });
  }


  clickZeroBtn(num0) {
    num0.addEventListener('click', () => {
      vmView.selectDecision += '0';
      vmView.setMessage(`입력 번호: ${vmView.selectDecision}`);
    });
  }


  clickConfirmBtn(confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (Number(vmView.selectDecision) <= vmView.snacksList.length) {
        vmView.selectDecision = Number(vmView.selectDecision);
        console.log(vmView.selectDecision);
        
        vmView.inputCoin = Number(vmView.coinStatus.innerText);
        console.log(vmView.inputCoin);
        vmView.outputResult();
        
      } else {
        vmView.selectDecision = '';
        vmView.setMessage(`번호를 ${vmView.snacksList.length} 이하로 입력해주세요.`);
      }
    });
  }

  clickReturnBtn(returnBtn) {
    returnBtn.addEventListener('click', (event) => {
      vmView.setMessage('반환은 불가능합니다.');
    })
  }

}

