class VMViewer {
  constructor(vmModel) {
    this.snacks = document.querySelector('.snack__lists');
    this.coinStatus = document.querySelector('.selector__status__coin');
    this.statusScreen = document.querySelector('.selector__status__items');
    this.totalCoin = document.querySelector('#coin__total');
    this.buttonConfirm = document.querySelector('#selector__button__confirm');
    this.buttonReturn = document.querySelector('#selector__button__return');
    this.buttonsLists = document.querySelector('.selector__buttons__lists');
    this.nums = this.buttonsLists.querySelectorAll('.selector__buttons__items');
    this.num0 = document.querySelector('#selector__button__0');
    this.slot = document.querySelector('.coin-slot__lists');
    this.stores = this.slot.querySelectorAll('.coin__left');
    this.vmModel = vmModel
    this.sumCoin = 0
    this.inputCoin = 0;
    this.coin = coin;
    this.snacksList = snacksList;
    this.selectDecision = '';
  }

  init() {
    this.slot.innerHTML += vmModel.renderCoin(this.coin);
    this.snacks.innerHTML += vmModel.renderSnacks(this.snacksList)
    this.statusScreen.innerHTML += vmModel.renderLoaders();
    this.totalCoin.innerText = `₩ ${this.sumCoin}원`

  }

  setMessage(message) {
    return this.statusScreen.innerText = message;
  }

  validateItems() {
    const snackItems = this.snacks.querySelectorAll('.snack__items');
    snackItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) >= snacksList[idx].price ?
        elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)' : elem.style.backgroundImage = '';
    });
  }



  outputResult() {
    if (this.selectDecision) {
      console.log(this.setMessage(''));
      console.log(vmModel.renderLoaders());
      setTimeout(() => {
        this.validateItems();
        vmControl.purchaseItems();
      }, 1750);
    } else {
      this.selectDecision = '';
      return this.setMessage('잘못된 방법입니다.');
    }
  }
}