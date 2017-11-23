window.vm = window.vm || {};

window.wallet = {

}

window.vm = {
  wallet: {
    "10": 0,
    "50": 1,
    "100": 5,
    "500": 2,
    "1000": 2,
    "5000": 2,
    "10000": 1
  },

  init() {
    this.setMoneyAmount();


    document.querySelectorAll(".wallet_moneys > ul > li > button").forEach(function (button) {
      button.addEventListener("click", this.abc);
    }.bind(this));
  },

  setMoneyAmount() {
    for (money in this.wallet) {
      const moneyTemplate = document.querySelector('.wallet_money');
      moneyTemplate.content.querySelector('li > button:nth-child(1)').innerText = money + "원";
      moneyTemplate.content.querySelector('li > button:nth-child(2)').innerText = this.wallet[money] + "개";

      const clone = document.importNode(moneyTemplate.content, true);
      document.querySelector('.wallet_moneys > ul').appendChild(clone);
    }

    // document.querySelectorAll(".wallet_moneys > ul > li > button:nth-child(2n)").forEach(function (moneyAmount) {
    //   const moneyUnit = moneyAmount.previousSibling.previousSibling.innerText;
    //   moneyAmount.innerText = this.wallet[moneyUnit] + "개";
    //   console.log(parseInt(moneyUnit, 10))
    // }.bind(this));
  },

  abc(e) {
    console.log(e.target.innerText);
  }
}