class Renders {
  constructor() {
    this.beverages = document.querySelector('.beverage__lists');
    this.slot = document.querySelector('.coin-slot__lists');
    this.bevLists = bevLists;
    this.coin = coin;
  }

  init() {
    this.renderCoin(this.coin);
    this.renderBeverage(this.bevLists);
  }


  renderCoin(val) {
    let coinOutput = '';
    coinOutput = val.reduce((acc, curr) => {
      sumCoin += curr.value * curr.store;
      return acc += `
      <li>
        <button class="coin-slot__buttons">${curr.name}</button>
          <p class="coin__left">${curr.store}개
        </button>
      </li>
      `
    }, '')
    totalCoin.innerText = `₩ ${sumCoin}원`
    this.slot.innerHTML += coinOutput;
  }


  renderBeverage(val) {
    let bevOutput = '';
    bevOutput = val.reduce((acc, curr) => {
      return acc += `
      <li class="beverage__items">
        <p class="beverage__name">${curr.name}</p>
        <p class="beverage__price">
          <span class="beverage__id">${curr.id}. </span>
          ${curr.price}원
        </p>
      </li>
      `;
    }, '');
    return this.beverages.innerHTML += bevOutput;
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
    return vmView.statusScreen.innerHTML += loaderOutput;
  }
}
