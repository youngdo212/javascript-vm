window.vm = window.vm || {};

window.wallet = {

}

window.vm = {
  wallet: {
    "10원": 0,
    "50원": 1,
    "100원": 5,
    "500원": 2,
    "1000원": 2,
    "5000원": 2,
    "10000원": 1
  },

  init() {
    document.querySelectorAll(".wallet_moneys > ul > li > button:nth-child(2n)").forEach(function (button) {
      const money = button.previousSibling.previousSibling.innerText;
      console.log(this.wallet[money])
    }.bind(this));

    document.querySelectorAll(".wallet_moneys > ul > li > button").forEach(function (button) {
      button.addEventListener("click", this.abc);
    }.bind(this));
  },

  abc(e) {
    console.log(e.target.innerText);
  }
}