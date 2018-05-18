const { $qs, $qsa, $on } = require('./helpers');
const { coin, snacksList } = require('./data');
const vmControl = require('./controller');

class VMViewer {
  constructor(coin, snacksList) {
    this.coin = coin;
    this.snacksList = snacksList;
    this.slotEl = $qs('.coin-slot__lists');
    this.screen = $qs('.selector__status__items');
    this.coinStatus = $qs('.selector__status__coin');
    this.coinTotal = $qs('#coin__total');
    this.snacksEl = $qs('.snack__lists');
    this.inputCoin = 0;
  }

  isSelected() {   
    return snacksList.filter((elem, idx) => elem.id === vmControl.selectDecision);
  }

  template(templateid, data) {
    return document.getElementById(templateid).innerHTML
      .replace(/{{(\w*)}}/g, (match, key) => data.hasOwnProperty(key) ? data[key] : "");
  }

  setMessage(message) {
    return this.screen.innerText = message;
  }

  validateItems() {
    const snackItems = $qsa('.snack__items', this.snacksEl);
    snackItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) < this.snacksList[idx].price ?
        elem.style.backgroundImage = '' : elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    });
  }
}

const vmView = new VMViewer(coin, snacksList);

module.exports = VMViewer;