const { $qs, $qsa, $on } = require('./helpers');

var viewerObj = {
  isSelected: function() {
    return this.snacksList.filter((elem, idx) => elem.id === vmControl.selectDecision);
  },

  template: function(templateid, data) {
    return document.getElementById(templateid).innerHTML
      .replace(/{{(\w*)}}/g, (match, key) => data.hasOwnProperty(key) ? data[key] : "");
  },

  setMessage: function(message) {
    return this.screen.innerText = message;
  },

  validateItems: function() {
    const snackItems = $qsa('.snack__items', this.snacksEl);
    snackItems.forEach((elem, idx) => {
      Number(this.coinStatus.innerText) < this.snacksList[idx].price ?
        elem.style.backgroundImage = '' : elem.style.backgroundImage = 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)';
    });
  }
}




function VMViewer(coin, snacksList) {
  return {
    coin: coin,
    snacksList: snacksList,
    slotEl: $qs('.coin-slot__lists'),
    screen: $qs('.selector__status__items'),
    coinStatus: $qs('.selector__status__coin'),
    coinTotal: $qs('#coin__total'),
    snacksEl: $qs('.snack__lists'),
    coinSum: 0,
    inputCoin: 0
  }
}

module.exports = viewerObj