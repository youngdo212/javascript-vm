function $(target) {
  return document.querySelector(target);
}

function pi(value) {
  return parseInt(value, 10);
}

const vm = {
  inputNumber: null,

  nextEvent: null,

  templateLiteral(input, variable) {
    return input.replace(
      input.slice(input.indexOf("!"), input.indexOf("}") + 1),
      variable
    );
  },

  joinComma(input) {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  },

  rightSwitch() {
    const controller__charge = $(`.controller__change`);
    const product__info__price = document.querySelectorAll(
      `.product__info__price`
    );

    product__info__price.forEach(v => {
      const parent = v.parentElement;
      const parentBrother = parent.previousElementSibling;
      let cmd = null;

      pi(v.dataset.price) <= pi(controller__charge.dataset.charge) &&
      parentBrother.firstElementChild.innerHTML !== "{고장}"
        ? (cmd = "add")
        : (cmd = "remove");

      parent.classList[cmd](`purchasable`);
      parentBrother.classList[cmd](`purchasable`);
    });
  },

  increaseCharge(money) {
    const controller__charge = $(`.controller__change`);

    controller__charge.dataset.charge =
      pi(controller__charge.dataset.charge) + pi(money);

    controller__charge.innerHTML = this.joinComma(
      controller__charge.dataset.charge
    );
  },

  printMoneyIncrease(money) {
    $(`.controller__progress-box`).insertAdjacentHTML(
      `beforeend`,
      this.templateLiteral(
        `<span class="controller__progress-log">!{this.joinComma(money)}이 투입됐음.</span><br>`,
        this.joinComma(money)
      )
    );
  },

  decreaseRemain(nextElement) {
    nextElement.dataset.remain = pi(nextElement.dataset.remain) - 1;

    nextElement.innerHTML = this.templateLiteral(
      `!{nextElement.dataset.remain}개`,
      nextElement.dataset.remain
    );
  },

  decreaseTotal(money) {
    const wallet__amount = $(`.wallet__amount`);

    wallet__amount.dataset.total = pi(wallet__amount.dataset.total) - pi(money);

    wallet__amount.innerHTML = this.joinComma(wallet__amount.dataset.total);
  },

  clickWallet({ target }) {
    const nextElement = target.nextElementSibling;
    const { dataset: { money } } = target;

    if (!money || nextElement.dataset.remain === "0") return;

    this.increaseCharge(money);

    this.printMoneyIncrease(money);

    this.decreaseRemain(nextElement);

    this.decreaseTotal(money);

    this.rightSwitch();
  },

  calculateInput(target) {
    if (!this.inputNumber) {
      this.inputNumber = (pi(target.dataset.input) - 1).toString();
    } else {
      this.inputNumber = (
        (pi(this.inputNumber) + 1) * 10 +
        pi(target.dataset.input) -
        1
      ).toString();
    }
  },

  decreaseCharge() {
    const controller__charge = $(`.controller__change`);
    const productList = document.querySelectorAll(`.product`);

    controller__charge.dataset.charge =
      pi(controller__charge.dataset.charge) -
      pi(productList[this.inputNumber].children[1].children[1].dataset.price);

    controller__charge.innerHTML = this.joinComma(
      controller__charge.dataset.charge
    );
  },

  printSelected() {
    const productList = document.querySelectorAll(`.product`);

    $(`.controller__progress-box`).insertAdjacentHTML(
      `beforeend`,
      this.templateLiteral(
        `<span class="controller__progress-log">!{productList[
          this.inputNumber
        ].children[1].children[0].innerHTML.slice(0, -1)}번 `,
        productList[this.inputNumber].children[1].children[0].innerHTML.slice(
          0,
          -1
        )
      ) +
        this.templateLiteral(
          `!{
          productList[this.inputNumber].children[0].children[0].dataset.productname
        } 선택됨</span><br>`,
          productList[this.inputNumber].children[0].children[0].dataset
            .productname
        )
    );
  },

  isWarning(productList) {
    if (pi(this.inputNumber) < 0 || pi(this.inputNumber) > productList.length) {
      this.inputNumber = null;
      alert(`없는 번호입니다.`);
    }
  },

  printExport() {
    const controller__charge = $(`.controller__change`);

    $(`.controller__progress-box`).insertAdjacentHTML(
      `beforeend`,
      this.templateLiteral(
        `<span class="controller__progress-log">잔돈 !{controller__charge.dataset.charge} 반환</span><br>`,
        this.joinComma(controller__charge.dataset.charge)
      )
    );

    controller__charge.dataset.charge = 0;

    controller__charge.innerHTML = this.joinComma(
      controller__charge.dataset.charge
    );
  },

  clickButton({ target }) {
    const controller__charge = $(`.controller__change`);
    const productList = document.querySelectorAll(`.product`);

    this.calculateInput(target);

    this.isWarning(productList);

    clearTimeout(this.nextEvent);

    this.nextEvent = setTimeout(() => {
      this.decreaseCharge();

      this.printSelected();

      this.rightSwitch();

      this.inputNumber = null;

      setTimeout(() => {
        this.printExport(controller__charge);

        this.rightSwitch();
      }, 3000);
    }, 3000);
  }
};

$(`.wallet__status`).addEventListener(`click`, vm.clickWallet.bind(vm));

$(`.controller__menu-select`).addEventListener(
  `click`,
  vm.clickButton.bind(vm)
);
