class VMModel {
  consturctor() {}

  init() {
    vmView.setMessage("동전을 넣어주세요");
    vmControl.clickNumBtns(vmView.nums);
    vmControl.clickZeroBtn(vmView.num0);
    vmControl.clickConfirmBtn(vmView.buttonConfirm);
    vmControl.clickReturnBtn(vmView.buttonReturn);
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
    return coinOutput;
  }

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
    return snackOutput;
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