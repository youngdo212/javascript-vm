let selectButtonsLists = document.querySelector('.selector__buttons__lists');

const buttonLists = {
  buttonNums: selectButtonsLists.querySelectorAll('.selector__buttons__items'),
  buttonZero: document.querySelector('#selector__button__0'),
  buttonConfirm: document.querySelector('#selector__button__confirm'),
}

let coinStatus = document.querySelector('.selector__status__coin');
let slot = document.querySelector('.coin-slot__lists');
let beverages = document.querySelector('.beverage__lists');
let statusScreen = document.querySelector('.selector__status__items');
let selectDecision = '';

statusScreen.innerHTML = "동전을 넣어주세요"


const renders = {
  renderCoin(val) {
    let coinOutput = '';
    val.forEach(elem => {
      coinOutput += `
      <li>
      <button class="coin-slot__buttons">${elem.name}</button>
      <p class="coin__left">${elem.store}개
      </button>
      </li>
      `
      sumCoin += elem.value * elem.store;
    })
    totalCoin.innerHTML = `₩ ${sumCoin}원`
    slot.innerHTML += coinOutput;
  },

  renderBeverage(val) {
    let bevOutput = '';
    val.forEach((elem) => {
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
    return beverages.innerHTML += bevOutput;
  }

}


renders.renderCoin(coin);
renders.renderBeverage(bevLists);


function activateBtn() {
  Number(coinStatus.innerHTML) >= 300 ? buttonLists.buttonConfirm.disabled = false : buttonLists.buttonConfirm.disabled = true;
}


function availableItems() {
  let bevItems = beverages.querySelectorAll('.beverage__items');
  for (let i = 0; i < bevItems.length; i++) {
    Number(coinStatus.innerHTML) < bevLists[i].price ? bevItems[i].style.backgroundColor = '' : bevItems[i].style.backgroundColor = '#ffafaf';
  }
}


const selections = {
  selectNums(val) {
    val.forEach(elem => {
      elem.addEventListener('click', (event) => {
        selectDecision += event.target.innerHTML;
        statusScreen.innerHTML = `입력 변호: ${selectDecision}`;
      })
    });
  },
  
  selectZero(val) {
    val.addEventListener('click', (event) => {
      selectDecision += '0';
    });
  },

  selectConfirm(val) {
    val.addEventListener('click', function (event) {
      selectDecision = Number(selectDecision);
      inputCoin = Number(coinStatus.innerHTML);
      purchaseItem();
      availableItems();
    });
  }

}


function insertCoin() {
  let coinButtons = slot.querySelectorAll('.coin-slot__buttons');
  let stores = slot.querySelectorAll('.coin__left');

  for (let i = 0; i < coinButtons.length; i++) {
    coinButtons[i].addEventListener('click', (event) => {     
      coin[i].store--;
      if (coin[i].store <= 0) {
        coinButtons[i].disabled = true;
        coinButtons[i].style.backgroundColor = '#cfcfcf'
      }

      sumCoin -= coin[i].value;
      inputCoin += coin[i].value;
      totalCoin.innerHTML = `₩ ${sumCoin}원`;
      coinStatus.innerHTML = inputCoin;
      stores[i].innerHTML = `${coin[i].store}개`;
      statusScreen.innerHTML = `원하는 음료의 번호를 입력하세요`;
      
      activateBtn();
      availableItems();
    })
  }
}

insertCoin();








function purchaseItem() {
  bevLists.forEach(elem => {
    if (elem.id === selectDecision && elem.price <= Number(coinStatus.innerHTML)) {
      coinStatus.innerHTML -= elem.price;
      inputCoin = Number(coinStatus.innerHTML);
      statusScreen.innerHTML = `${elem.name}을 선택했습니다`;
      selectDecision = '';
      activateBtn()
    } else if (elem.id === selectDecision && elem.price > Number(coinStatus.innerHTML)) {
      statusScreen.innerHTML = "동전을 더 넣어주세요";
    }
  });
}


selections.selectNums(buttonLists.buttonNums);
selections.selectZero(buttonLists.buttonZero);
selections.selectConfirm(buttonLists.buttonConfirm);