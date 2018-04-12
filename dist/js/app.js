const coinStatus = document.querySelector('.selector__status__coin');

const slot = document.querySelector('.coin-slot__lists');

const beverages = document.querySelector('.beverage__lists');
const bevNames = beverages.querySelectorAll('.beverage__name');
const bevPrices = beverages.querySelectorAll('.beverage__price');

const selectButtonsLists = document.querySelector('.selector__buttons__lists');
const selectButtons = selectButtonsLists.querySelectorAll('.selector__buttons__items');


const statusScreen = document.querySelector('.selector__status__items');

statusScreen.innerHTML = "동전을 넣어주세요"
let bevOutput = '';
let coinOutput = '';



coin.forEach(elem => {
  coinOutput += `
  <li>
    <button class="coin-slot__buttons">${elem.name}</button>
      <p class="coin__left">${elem.store}개
    </button>
  </li>
  `
  sumCoin += elem.value * elem.store;
})


bevLists.forEach((elem) => {
  bevOutput += `
  <li class="beverage__items">
    <p class="beverage__name">${elem.name}</p>
    <p class="beverage__price">
      <span class="beverage__id">${elem.id}. </span>
      ${elem.price}원
    </p>
  </li>
  `;
});

totalCoin.innerHTML = `₩ ${sumCoin}원`
slot.innerHTML += coinOutput;
beverages.innerHTML += bevOutput;


let coinButtons = slot.querySelectorAll('.coin-slot__buttons');
let stores = slot.querySelectorAll('.coin__left');
let bevItems = beverages.querySelectorAll('.beverage__items');

for (let i = 0; i < coinButtons.length; i++) {
  coinButtons[i].addEventListener('click', (event) => {
    coin[i].store--;
    if (coin[i].store <= 0) {
      coinButtons[i].disabled = true;
      coinButtons[i].style.backgroundColor = '#cfcfcf'
    }
    sumCoin -= coin[i].value
    inputCoin += coin[i].value;
    totalCoin.innerHTML = `₩ ${sumCoin}원`
    coinStatus.innerHTML = inputCoin
    stores[i].innerHTML = `${coin[i].store}개`
    statusScreen.innerHTML = `원하는 음료의 번호를 입력하세요`
    if (Number(coinStatus.innerHTML) >= 300) {
      selectConfirm.disabled = false
    }
    for (let i = 0; i < bevItems.length; i++) {
      if (Number(coinStatus.innerHTML) >= bevLists[i].price) {
        bevItems[i].style.backgroundColor = '#ffafaf';
      }
    }
  })
}



let selectZero = document.querySelector('#selector__button__0');
let selectReturn = document.querySelector('#selector__button__return');
let selectConfirm = document.querySelector('#selector__button__confirm');
let selectDecision = ''

selectZero.addEventListener('click', (event) => {
  selectDecision += '0'
})


selectButtons.forEach(elem => {
  elem.addEventListener('click', (event) => {
    selectDecision += event.target.innerHTML;
    statusScreen.innerHTML = `입력 변호: ${selectDecision}`
  })
});


selectConfirm.addEventListener('click', function (event) {
  selectDecision = Number(selectDecision);
  inputCoin = Number(coinStatus.innerHTML);

  bevLists.forEach(elem => {
    if (elem.id === selectDecision) {
      if (elem.price <= Number(coinStatus.innerHTML)) {
        coinStatus.innerHTML = Number(coinStatus.innerHTML);
        coinStatus.innerHTML -= elem.price;
        inputCoin = Number(coinStatus.innerHTML);
        statusScreen.innerHTML = `${elem.name}을 선택했습니다`;
        selectDecision = '';
        if (Number(coinStatus.innerHTML) < 300) {
          selectConfirm.disabled = true
        }
      } else {
        statusScreen.innerHTML = "동전을 더 넣어주세요";
      }
    }
  });
  for (let i = 0; i < bevItems.length; i++) {
    if (Number(coinStatus.innerHTML) < bevLists[i].price) {
      bevItems[i].style.backgroundColor = '';
    }
  }
});