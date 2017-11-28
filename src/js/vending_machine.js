const vm = {};
vm.data = {
  wallet: {
    '10': 0,
    '50': 1,
    '100': 5,
    '500': 2,
    '1000': 2,
    '5000': 2,
    '10000': 1
  },

  inserted: 0,

  itemNumber: [],

  items: [
    { id: 1, name: "콜라", price: 500 },
    { id: 2, name: "사이다", price: 1000 },
    { id: 3, name: "파인 환타", price: 400 },
    { id: 4, name: "포도 환타", price: 300 },
    { id: 5, name: "레몬에이드", price: 900 },
    { id: 6, name: "봉봉", price: 1200 },
    { id: 7, name: "코코아주스", price: 1000 },
    { id: 8, name: "콜라제로", price: 1900 },
    { id: 9, name: "파워에이드", price: 2000 },
    { id: 10, name: "초코우유", price: 1000 },
    { id: 11, name: "초코우유2", price: 600 },
    { id: 12, name: "초코우유3", price: 7000 },
    { id: 13, name: "딸바주스", price: 1000 },
    { id: 14, name: "바나나우유", price: 500 },
    { id: 15, name: "커피우유", price: 500 },
    { id: 16, name: "알로에", price: 1000 },
    { id: 17, name: "콘칩", price: 2000 },
    { id: 18, name: "새우깡", price: 1000 },
    { id: 19, name: "감자칩", price: 2000 },
    { id: 20, name: "아몬드", price: 450 },
    { id: 21, name: "다크초콜릿", price: 1500 },
    { id: 22, name: "가나초콜릿", price: 1500 },
    { id: 23, name: "견과류", price: 900 },
    { id: 24, name: "육포", price: 1000 },
    { id: 25, name: "오징어포", price: 4000 },
    { id: 26, name: "미니땅콩", price: 800 },
    { id: 27, name: "오징어", price: 1000 },
    { id: 28, name: "(고장)", price: 1000 },
    { id: 29, name: "신라면", price: 1000 },
    { id: 30, name: "진라면", price: 1000 },
    { id: 31, name: "포도 환타", price: 500 },
    { id: 32, name: "칸쵸", price: 500 },
  ]
}

vm.controller = {
  log: {
    insert(money) {
      this.print(`${money}원이 투입되었습니다.`);
    },
    refund() {
      this.print(`잔액이 반환되었습니다.`);
    },
    noMoney() {
      this.print(`잔액이 부족합니다.`);
    },
    noItem() {
      this.print(`해당하는 상품이 없습니다.`);
    },
    select(item) {
      this.print(`${item}이(가) 선택되었습니다.`);
    },
    print(message) {
      const logger = document.querySelector(`.machine_message`);

      if (logger.innerHTML !== "") {
        message = '\n' + message;
      }
      logger.innerHTML += message;
      logger.scrollTop = logger.scrollHeight;
    }
  },

  init(data) {
    this.setItems(data.items);
    this.setWalletMoneys(data.wallet);
    this.setInsertEvents();
    this.setRefundEvent();
    this.setItemSelectEvents();
    this.setNumberSelectEvents();
    this.displayWalletTotal();
    this.displayInserted();
  },

  setWalletMoneys(wallet) {
    for (const money in wallet) {
      const moneyTemplate = document.querySelector('.wallet_money');
      const clone = document.importNode(moneyTemplate.content, true);
      clone.querySelector('li').setAttribute("money", money);
      clone.querySelector('li > button:nth-child(1)').innerText = money + "원";
      clone.querySelector('li > button:nth-child(2)').innerText = wallet[money] + "개";
      clone.querySelector('li > button:nth-child(2)').classList.add('money_' + money);

      document.querySelector('.wallet_moneys > ul').appendChild(clone);
    }
  },

  setItems(items) {
    items.forEach(item => {
      const itemTemplate = document.querySelector('.item_template');
      const clone = document.importNode(itemTemplate.content, true);
      clone.querySelector('li > button').innerText = item.name;
      clone.querySelector('li > span').innerText = item.id + ". " + item.price;

      document.querySelector('.items > ul').appendChild(clone);
    })
  },

  setInsertEvents() {
    const el = document.querySelector(".wallet_moneys");
    el.addEventListener("mousedown", this.insertMoney.bind(this));
  },

  setRefundEvent() {
    const el = document.querySelector(".machine_refund > button");
    el.addEventListener("mousedown", this.refundMoney.bind(this));
  },

  setItemSelectEvents() {
    const el = document.querySelector(".items");
    el.addEventListener("mousedown", this.selectItem.bind(this));
  },

  setNumberSelectEvents() {
    const el = document.querySelector(".machine_picker");
    el.addEventListener("mousedown", this.selectNumber.bind(this));
  },

  selectItem(evt) {
    if (evt.target.nodeName.toLowerCase() !== "button") return;

    const itemName = evt.target.innerText;
    const item = vm.data.items.find(element => element.name === itemName);
    this.buyItem(item);
  },

  selectNumber(evt) {
    if (evt.target.nodeName.toLowerCase() !== "button") return;

    const number = evt.target.innerText;
    this.putNumber(number);
  },

  putNumber(number) {
    let itemNumber = vm.data.itemNumber;
    itemNumber.push(number);

    if (itemNumber.length === 2) {
      this.getItem(itemNumber);
      clearTimeout(selectTimeout);
    } else {
      selectTimeout = setTimeout(() => vm.controller.getItem(itemNumber), 3000);
    }
  },

  getItem(itemNumber) {
    const itemId = (_toInt(itemNumber));
    const item = vm.data.items.find(element => element.id === itemId);
    vm.data.itemNumber = [];

    if (item === undefined) {
      this.log.noItem();
      return;
    }
    this.buyItem(item);
  },

  buyItem(item) {
    if (vm.data.inserted < item.price) {
      this.log.noMoney();
      return;
    }

    vm.data.inserted -= item.price;

    this.log.select(item.name);
    this.displayRenew();
  },

  insertMoney(evt) {
    if (evt.target.nodeName.toLowerCase() !== "button") return;

    const data = vm.data;
    const parent = evt.target.parentNode;
    const moneyUnit = parseInt(parent.getAttribute("money"), 10);

    if (data.wallet[moneyUnit] === 0) {
      this.log.noMoney();
      return;
    }

    data.wallet[moneyUnit]--;
    data.inserted += moneyUnit;

    this.log.insert(moneyUnit);
    this.displayRenew();
  },

  refundMoney(evt) {
    if (evt.target.nodeName.toLowerCase() !== "button") return;
    [10000, 5000, 1000, 500, 100, 50, 10].forEach(this.refund);
    this.log.refund();
    this.displayRenew();
  },

  displayRenew() {
    this.displayWallet();
    this.displayWalletTotal();
    this.displayInserted();
    this.displayBuyables();
  },

  displayWallet() {
    const data = vm.data;

    for (money in data.wallet) {
      document.querySelector(`.money_${money}`).innerText = data.wallet[money] + "개";
    }
  },

  displayWalletTotal() {
    const data = vm.data;
    let moneyTotal = 0;

    for (const value in data.wallet) {
      moneyTotal += value * data.wallet[value];
    }
    document.querySelector('.wallet_total').innerText = moneyTotal + '원';
  },

  displayInserted() {
    document.querySelector('.machine_credit').innerText = vm.data.inserted + '원';
  },

  displayBuyables() {
    const data = vm.data;

    for (const item in data.items) {
      if (data.items[item].price <= data.inserted) {
        const el = document.querySelector(`.item:nth-child(${data.items[item].id})`);
        el.classList.add('item_buyable');
      } else {
        const el = document.querySelector(`.item:nth-child(${data.items[item].id})`);
        el.classList.remove('item_buyable');
      }
    }
  },

  refund(moneyUnit) {
    const data = vm.data;

    while (data.inserted >= moneyUnit) {
      data.inserted -= moneyUnit;
      data.wallet[moneyUnit]++;
    }
  }
}
