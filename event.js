function $(target) {
  return document.querySelector(`${target}`);
}

let inputNumber = null;
let nextEvent = null;

// 동전 투입 이벤트
$(`.wallet__status`).addEventListener(`click`, ({ target }) => {
  const controller__charge = $(`.controller__change`);
  const wallet__amount = $(`.wallet__amount`);
  const product__info__price = document.querySelectorAll(
    `.product__info__price`
  );
  const nextElement = target.nextElementSibling;
  let { dataset: { money } } = target;

  if (!money || nextElement.dataset.remain === "0") return;

  controller__charge.dataset.charge =
    parseInt(controller__charge.dataset.charge, 10) + parseInt(money);

  controller__charge.innerHTML = `${controller__charge.dataset.charge.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  )}원`;

  $(`.controller__progress-box`).insertAdjacentHTML(
    `beforeend`,
    `<span class="controller__progress-log">${money.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )}원이 투입됐음.</span><br>`
  );

  nextElement.dataset.remain = parseInt(nextElement.dataset.remain) - 1;

  nextElement.innerHTML = `${nextElement.dataset.remain}개`;

  wallet__amount.dataset.total =
    parseInt(wallet__amount.dataset.total, 10) - parseInt(money);

  wallet__amount.innerHTML = `${wallet__amount.dataset.total.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  )}원`;

  product__info__price.forEach(v => {
    const parent = v.parentElement;

    if (
      parseInt(v.dataset.price) <=
        parseInt(controller__charge.dataset.charge) &&
      parent.previousElementSibling.firstElementChild.innerHTML !== "{고장}"
    ) {
      parent.classList.add(`purchasable`);
      parent.previousElementSibling.classList.add(`purchasable`);
    }
  });
});

$(`.controller__menu-select`).addEventListener(`click`, ({ target }) => {
  const productList = document.querySelectorAll(`.product`);
  const controller__charge = $(`.controller__change`);
  const product__info__price = document.querySelectorAll(
    `.product__info__price`
  );

  if (!inputNumber) {
    inputNumber = (parseInt(target.dataset.input) - 1).toString();
  } else {
    inputNumber = (
      (parseInt(inputNumber) + 1) * 10 +
      parseInt(target.dataset.input) -
      1
    ).toString();
  }

  if (parseInt(inputNumber) < 0 || parseInt(inputNumber) > productList.length) {
    inputNumber = null;
    alert(`없는 번호입니다.`);
  }

  clearTimeout(nextEvent);

  nextEvent = setTimeout(() => {
    controller__charge.dataset.charge =
      parseInt(controller__charge.dataset.charge, 10) -
      parseInt(productList[inputNumber].children[1].children[1].dataset.price);

    controller__charge.innerHTML = `${controller__charge.dataset.charge.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )}원`;

    $(`.controller__progress-box`).insertAdjacentHTML(
      `beforeend`,
      `<span class="controller__progress-log">${productList[
        inputNumber
      ].children[1].children[0].innerHTML.slice(0, -1)}번 ${
        productList[inputNumber].children[0].children[0].dataset.productname
      } 선택됨</span><br>`
    );

    product__info__price.forEach(v => {
      const parent = v.parentElement;

      if (
        parseInt(v.dataset.price) <=
          parseInt(controller__charge.dataset.charge) &&
        parent.previousElementSibling.firstElementChild.innerHTML !== "{고장}"
      ) {
        parent.classList.add(`purchasable`);
        parent.previousElementSibling.classList.add(`purchasable`);
      } else {
        parent.classList.remove(`purchasable`);
        parent.previousElementSibling.classList.remove(`purchasable`);
      }
    });

    inputNumber = null;

    setTimeout(() => {
      $(`.controller__progress-box`).insertAdjacentHTML(
        `beforeend`,
        `<span class="controller__progress-log">잔돈 ${controller__charge.dataset.charge.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )}원 반환</span><br>`
      );

      controller__charge.dataset.charge = 0;

      controller__charge.innerHTML = `${controller__charge.dataset.charge.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}원`;

      product__info__price.forEach(v => {
        const parent = v.parentElement;

        if (
          parseInt(v.dataset.price) <=
            parseInt(controller__charge.dataset.charge) &&
          parent.previousElementSibling.firstElementChild.innerHTML !== "{고장}"
        ) {
          parent.classList.add(`purchasable`);
          parent.previousElementSibling.classList.add(`purchasable`);
        } else {
          parent.classList.remove(`purchasable`);
          parent.previousElementSibling.classList.remove(`purchasable`);
        }
      });
    }, 3000);
  }, 3000);
});
