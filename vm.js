const vm = {
  inputNumber: null,
  nextEvent: null,

  template: {
    printExport(commaedCharge) {
      const result = `<span class="controller__progress-log">잔돈 ${
        commaedCharge
      } 반환</span><br>`;

      return result;
    },
    printMoneyIncrease(commaedMoney) {
      const result = `<span class="controller__progress-log">${
        commaedMoney
      }이 투입됐음.</span><br>`;

      return result;
    },
    printSelectedProduct(selectedProductId, selectedProductName) {
      const result = `<span class="controller__progress-log">${
        selectedProductId
      }번 ${selectedProductName} 선택됨</span><br>`;

      return result;
    }
  },

  calculateInput(target) {
    let calculatedInput = null;

    if (this.inputNumber === null) {
      this.inputNumber = pi(target.dataset.input) - 1;
    } else {
      calculatedInput =
        (this.inputNumber + 1) * 10 + pi(target.dataset.input) - 1;

      this.inputNumber = calculatedInput;
    }
  },

  clickButton({ target }) {
    this.calculateInput(target);
    clearTimeout(this.nextEvent);
    if (this.isWarning()) return;

    this.nextEvent = setTimeout(() => {
      this.decreaseCharge();
      this.printSelectedProduct();
      this.lightSwitch();
      this.inputNumber = null;

      this.nextEvent = setTimeout(() => {
        this.printExport(this.controller__charge);
        this.lightSwitch();
      }, 3000);
    }, 3000);
  },

  clickWallet({ target }) {
    const nextElement = target.nextElementSibling;
    const { dataset: { money: stringifyMoney } } = target;
    const money = pi(stringifyMoney);

    if (!money || nextElement.dataset.remain === `0`) return;

    this.increaseCharge(money);
    this.printMoneyIncrease(money);
    this.decreaseRemain(nextElement, money);
    this.decreaseTotal(money);
    this.lightSwitch();
  },

  decreaseCharge() {
    const presentCharge = pi(this.controller__charge.dataset.charge);
    const selectedProductPrice = pi(
      this.productList[this.inputNumber].querySelector(`[data-price]`).dataset
        .price
    );
    const calculatedCharge = presentCharge - selectedProductPrice;
    let commaedCharge = null;

    this.controller__charge.dataset.charge = calculatedCharge;
    commaedCharge = this.joinComma(calculatedCharge);
    this.controller__charge.innerHTML = commaedCharge;
  },

  decreaseRemain(nextElement, money) {
    const calculatedRemain = pi(nextElement.dataset.remain) - 1;
    let replacedRemain = null;

    nextElement.dataset.remain = calculatedRemain;
    nextElement.innerHTML = calculatedRemain + `개`;
  },

  decreaseTotal(money) {
    const presentWalletTotal = pi(this.wallet__amount.dataset.total);
    const calculatedTotal = presentWalletTotal - money;
    let commedTotal = null;

    this.wallet__amount.dataset.total = calculatedTotal;
    commaedTotal = this.joinComma(calculatedTotal);
    this.wallet__amount.innerHTML = commaedTotal;
  },

  isWarning() {
    const { inputNumber } = this;
    const presentCharge = pi(this.controller__charge.dataset.charge);
    const selectedProductDom = this.productList[inputNumber];
    const selectedProductPrice = selectedProductDom.querySelector(
      `[data-price]`
    ).dataset.price;
    const isBroken =
      selectedProductDom.querySelector(`[data-productname]`).dataset
        .productname === `{고장}`;
    let isError = true;

    if (inputNumber < 0 || inputNumber > this.productList.length) {
      alert(`없는 번호입니다.`);
    } else if (selectedProductPrice > presentCharge) {
      alert(`현재 잔액으로 구매할 수 없는 상품입니다.`);
    } else if (isBroken) {
      alert(`고장으로 인해 구매할 수 없는 상품입니다.`);
    } else {
      isError = false;
    }

    if (isError) this.inputNumber = null;

    return isError;
  },

  increaseCharge(money) {
    const calculatedCharge = pi(this.controller__charge.dataset.charge) + money;
    let commaedCharge = null;

    this.controller__charge.dataset.charge = calculatedCharge;
    commaedCharge = this.joinComma(calculatedCharge);
    this.controller__charge.innerHTML = commaedCharge;
  },

  increaseRemain(presentCharge) {
    const units = Array.from(
      document.querySelectorAll(`.wallet__status > li > [data-money]`)
    ).reverse();
    const presentTotal = pi(this.wallet__amount.dataset.total);
    let copiedPresentCharge = presentCharge;
    let calculatedTotal = null;
    let commaedCharge = null;
    let money = null;
    let quotient = null;
    let nextBrother = null;
    let calculatedRemain = null;

    units.forEach(v => {
      money = pi(v.dataset.money);

      if (money > 0) {
        quotient = pi(copiedPresentCharge / money);
        nextBrother = v.nextElementSibling;

        if (quotient > 0) {
          calculatedRemain = pi(nextBrother.dataset.remain) + quotient;

          copiedPresentCharge -= quotient * money;
          nextBrother.dataset.remain = calculatedRemain;
          nextBrother.innerHTML = calculatedRemain + `개`;
        }
      }
    });

    calculatedTotal = presentTotal + presentCharge;
    commaedCharge = this.joinComma(calculatedTotal);
    this.wallet__amount.innerHTML = commaedCharge;
    this.wallet__amount.dataset.total = calculatedTotal;
  },

  joinComma(input) {
    const result = input.toLocaleString() + `원`;

    return result;
  },

  printExport() {
    const presentCharge = pi(this.controller__charge.dataset.charge);
    const commaedCharge = this.joinComma(presentCharge);

    if (presentCharge > 0) {
      this.increaseRemain(presentCharge);
    }

    this["controller__progress-box"].insertAdjacentHTML(
      `beforeend`,
      this.template.printExport(commaedCharge)
    );

    this.controller__charge.dataset.charge = 0;
    this.controller__charge.innerHTML = `0원`;
  },

  printMoneyIncrease(money) {
    const commaedMoney = this.joinComma(money);

    this["controller__progress-box"].insertAdjacentHTML(
      `beforeend`,
      this.template.printMoneyIncrease(commaedMoney)
    );
  },

  printSelectedProduct() {
    const selectedProductId = this.productList[this.inputNumber]
      .querySelector(`.product__info__index`)
      .innerHTML.slice(0, -1);
    const selectedProductName = this.productList[
      this.inputNumber
    ].querySelector(`[data-productname]`).dataset.productname;

    $(`.controller__progress-box`).insertAdjacentHTML(
      `beforeend`,
      this.template.printSelectedProduct(selectedProductId, selectedProductName)
    );
  },

  lightSwitch() {
    const product__info__price = document.querySelectorAll(`[data-price]`);

    product__info__price.forEach(v => {
      const parent = v.parentElement;
      const parentBrother = parent.previousElementSibling;
      const cousinInnerHTML = parentBrother.firstElementChild.innerHTML;
      const isError =
        pi(v.dataset.price) > pi(this.controller__charge.dataset.charge) ||
        cousinInnerHTML === `{고장}`;
      let cmd = null;

      isError ? (cmd = `remove`) : (cmd = `add`);
      parent.classList[cmd](`purchasable`);
      parentBrother.classList[cmd](`purchasable`);
    });
  }
};

document.addEventListener(`DOMContentLoaded`, () => {
  Object.assign(window, util);

  vm.controller__charge = $(`.controller__change`);
  vm.wallet__amount = $(`.wallet__amount`);
  vm[`controller__progress-box`] = $(`.controller__progress-box`);
  vm.productList = document.querySelectorAll(`.product`);

  $(`.wallet__status`).addEventListener(`click`, vm.clickWallet.bind(vm));

  $(`.controller__menu-select`).addEventListener(
    `click`,
    vm.clickButton.bind(vm)
  );
});
