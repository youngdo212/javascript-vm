const vm = {
  inputNumber: null,

  nextEvent: null,

  calculateInput(target) {
    if (this.inputNumber === null) {
      this.inputNumber = pi(target.dataset.input) - 1;
    } else {
      const calculatedInput =
        (this.inputNumber + 1) * 10 + pi(target.dataset.input) - 1;

      this.inputNumber = calculatedInput;
    }
  },

  clickButton({ target }) {
    const controller__charge = $(`.controller__change`);

    this.calculateInput(target);

    clearTimeout(this.nextEvent);

    if (this.isWarning()) return;

    this.nextEvent = setTimeout(() => {
      this.decreaseCharge();

      this.printSelected();

      this.rightSwitch();

      this.inputNumber = null;

      this.nextEvent = setTimeout(() => {
        this.printExport(controller__charge);

        this.rightSwitch();
      }, 3000);
    }, 3000);
  },

  clickWallet({ target }) {
    const nextElement = target.nextElementSibling;
    let { dataset: { money } } = target;

    money = pi(money);

    if (!money || nextElement.dataset.remain === "0") return;

    this.increaseCharge(money);

    this.printMoneyIncrease(money);

    this.decreaseRemain(nextElement, money);

    this.decreaseTotal(money);

    this.rightSwitch();
  },

  decreaseCharge() {
    const controller__charge = $(`.controller__change`);
    const presentCharge = pi(controller__charge.dataset.charge);
    const productList = document.querySelectorAll(`.product`);
    const selectedProductPrice = pi(
      productList[this.inputNumber].querySelector("[data-price]").dataset.price
    );
    const calculatedCharge = presentCharge - selectedProductPrice;
    let commaedCharge = null;

    controller__charge.dataset.charge = calculatedCharge;

    commaedCharge = this.joinComma(calculatedCharge);

    controller__charge.innerHTML = commaedCharge;
  },

  decreaseRemain(nextElement, money) {
    const calculatedRemain = pi(nextElement.dataset.remain) - 1;
    const wallet__amount = $(`.wallet__amount`);
    let replacedRemain = null;

    nextElement.dataset.remain = calculatedRemain;

    nextElement.innerHTML = calculatedRemain + "개";
  },

  decreaseTotal(money) {
    const wallet__amount = $(`.wallet__amount`);
    let presentWalletTotal = pi(wallet__amount.dataset.total);
    const calculatedTotal = presentWalletTotal - money;
    let commedTotal = null;

    wallet__amount.dataset.total = calculatedTotal;

    commaedTotal = this.joinComma(calculatedTotal);

    wallet__amount.innerHTML = commaedTotal;
  },

  isWarning() {
    const { inputNumber } = this;
    const controller__charge = $(`.controller__change`);
    const presentCharge = pi(controller__charge.dataset.charge);
    const productList = document.querySelectorAll(`.product`);
    const selectedProductDom = productList[inputNumber];
    const selectedProductPrice = selectedProductDom.querySelector(
      "[data-price]"
    ).dataset.price;
    const isBroken =
      selectedProductDom.querySelector("[data-productname]").dataset
        .productname === "{고장}";
    let isError = true;

    if (inputNumber < 0 || inputNumber > productList.length) {
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
    const controller__charge = $(`.controller__change`);
    const calculatedCharge = pi(controller__charge.dataset.charge) + money;
    let commaedCharge = null;

    controller__charge.dataset.charge = calculatedCharge;

    commaedCharge = this.joinComma(calculatedCharge);

    controller__charge.innerHTML = commaedCharge;
  },

  increaseRemain(presentCharge) {
    const units = Array.from(
      document.querySelectorAll(`.wallet__status > li > [data-money]`)
    ).reverse();
    const wallet__amount = $(`.wallet__amount`);
    const presentTotal = pi(wallet__amount.dataset.total);
    let copiedPresentCharge = presentCharge;
    let calculatedTotal = null;
    let commaedCharge = null;

    units.forEach(v => {
      const money = pi(v.dataset.money);

      if (money > 0) {
        const quotient = pi(copiedPresentCharge / money);
        const nextBrother = v.nextElementSibling;

        if (quotient > 0) {
          const calculatedRemain = pi(nextBrother.dataset.remain) + quotient;

          copiedPresentCharge -= quotient * money;

          nextBrother.dataset.remain = calculatedRemain;

          nextBrother.innerHTML = calculatedRemain + "개";
        }
      }
    });

    calculatedTotal = presentTotal + presentCharge;

    commaedCharge = this.joinComma(calculatedTotal);

    wallet__amount.innerHTML = commaedCharge;

    wallet__amount.dataset.total = calculatedTotal;
  },

  joinComma(input) {
    const result = input.toLocaleString().toString() + "원";

    return result;
  },

  printExport() {
    const controller__charge = $(`.controller__change`);
    const presentCharge = pi(controller__charge.dataset.charge);
    const commaedCharge = this.joinComma(presentCharge);
    const replaceCommaedCharge = this.replaceStringToVariable(
      `<span class="controller__progress-log">잔돈 !{commaedCharge} 반환</span><br>`,
      commaedCharge
    );

    if (presentCharge > 0) {
      this.increaseRemain(presentCharge);
    }

    $(`.controller__progress-box`).insertAdjacentHTML(
      `beforeend`,
      replaceCommaedCharge
    );

    controller__charge.dataset.charge = 0;
    controller__charge.innerHTML = "0원";
  },

  printMoneyIncrease(money) {
    const commaedMoney = this.joinComma(money);
    const replacedCommedMoney = this.replaceStringToVariable(
      `<span class="controller__progress-log">!{commaedMoney}이 투입됐음.</span><br>`,
      commaedMoney
    );

    $(`.controller__progress-box`).insertAdjacentHTML(
      `beforeend`,
      replacedCommedMoney
    );
  },

  printSelected() {
    const productList = document.querySelectorAll(`.product`);
    const selectedProductId = productList[this.inputNumber]
      .querySelector(".product__info__index")
      .innerHTML.slice(0, -1);
    const selectedProductName = productList[this.inputNumber].querySelector(
      "[data-productname]"
    ).dataset.productname;
    const templatedId = this.replaceStringToVariable(
      `<span class="controller__progress-log">!{selectedProductId}번 `,
      selectedProductId
    );
    const templatedName = this.replaceStringToVariable(
      `!{selectedProductName} 선택됨</span><br>`,
      selectedProductName
    );

    $(`.controller__progress-box`).insertAdjacentHTML(
      `beforeend`,
      templatedId + templatedName
    );
  },

  replaceStringToVariable(input, variable) {
    const result = input.replace(
      input.slice(input.indexOf("!"), input.indexOf("}") + 1),
      variable
    );

    return result;
  },

  rightSwitch() {
    const controller__charge = $(`.controller__change`);
    const product__info__price = document.querySelectorAll(`[data-price]`);

    product__info__price.forEach(v => {
      const parent = v.parentElement;
      const parentBrother = parent.previousElementSibling;
      const cousinInnerHTML = parentBrother.firstElementChild.innerHTML;
      const isError =
        pi(v.dataset.price) > pi(controller__charge.dataset.charge) ||
        cousinInnerHTML === "{고장}";
      let cmd = null;

      isError ? (cmd = "remove") : (cmd = "add");

      parent.classList[cmd](`purchasable`);
      parentBrother.classList[cmd](`purchasable`);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Object.assign(window, util);

  $(`.wallet__status`).addEventListener(`click`, vm.clickWallet.bind(vm));

  $(`.controller__menu-select`).addEventListener(
    `click`,
    vm.clickButton.bind(vm)
  );
});
