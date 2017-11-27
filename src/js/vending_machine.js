window.vm = window.vm || {};

window.vm = {
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
  ],

  init() {
    this.setItems();
    this.setWalletMoneys();
    this.setMoneyInsertEvents();
    this.displayWalletTotal();
    this.displayInserted();
  },

  setWalletMoneys() {
    for (money in this.wallet) {
      const moneyTemplate = document.querySelector('.wallet_money');
      moneyTemplate.content.querySelector('li > button:nth-child(1)').className = 'money_' + money;
      moneyTemplate.content.querySelector('li > button:nth-child(1)').innerText = money + "원";
      moneyTemplate.content.querySelector('li > button:nth-child(2)').innerText = this.wallet[money] + "개";

      const clone = document.importNode(moneyTemplate.content, true);
      document.querySelector('.wallet_moneys > ul').appendChild(clone);
    }
  },

  setItems() {
    this.items.forEach(item => {
      const itemTemplate = document.querySelector('.item');
      itemTemplate.content.querySelector('li > button').innerText = item.name;
      itemTemplate.content.querySelector('li > span').innerText = item.id + ". " + item.price;

      const clone = document.importNode(itemTemplate.content, true);
      document.querySelector('.items > ul').appendChild(clone);
    })
  },

  setMoneyInsertEvents() {
    document.querySelector(".wallet_moneys").addEventListener("mousedown", this.insertMoney.bind(this));
  },

  insertMoney(evt) {
    if (evt.target.nodeName.toLowerCase() !== "button") return;
    const moneyUnit = parseInt(evt.target.parentNode.firstChild.nextSibling.innerText, 10);
    if (this.wallet[moneyUnit] === 0) return;
    this.wallet[moneyUnit]--;
    this.inserted += moneyUnit;
    evt.target.parentNode.lastChild.previousSibling.innerText = this.wallet[moneyUnit] + '개';
    this.displayWalletTotal();
    this.displayInserted();
  },

  displayWalletTotal() {
    var moneyTotal = 0;
    for (let value in this.wallet) {
      moneyTotal += value * this.wallet[value];
    }
    document.querySelector('.wallet_total').innerText = moneyTotal + '원';
  },

  displayInserted() {
    document.querySelector('.machine_credit').innerText = this.inserted + '원';
  }
}