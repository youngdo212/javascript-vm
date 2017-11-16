(function (window) {
    const wallet = {
        moneyContainer: document.querySelector('.wallet .money'),
        moneyItems: document.querySelectorAll('.wallet .money > li'),
        moneyUnits: document.querySelectorAll('.wallet .money > li .unit'),
        moneyCounts: document.querySelectorAll('.wallet .money > li .count'),
        totalMoney: document.querySelector('.wallet .total'),
        openToggle: document.querySelector('.wallet .wrap-wallet-icon .icon'),
        bind: function(event, handler) {
            if (event === 'toggleWallet') {
                this.openToggle.addEventListener('click', function() {
                    if (this.moneyContainer.classList.contains('hide')) {
                        this.moneyContainer.classList.remove('hide');
                    } else {
                        this.moneyContainer.classList.add('hide');
                    }
                }.bind(this));
            } else if (event === 'loseMoney') {
                this.moneyUnits.forEach(function(btn, index) {
                    btn.addEventListener('click', function() {
                        handler(this.moneyItems[index].dataset.unit);
                    }.bind(this));
                }.bind(this));
            }
        },
        renderMoney: function(params) {
            this.moneyItems.findIndex = Array.prototype.findIndex.bind(this.moneyItems);

            const index = this.moneyItems.findIndex(item => {
                return item.dataset.unit == params.unit;
            });

            const item = this.moneyCounts[index];
            item.textContent = params.count + '개';
            this.totalMoney.textContent = params.totalMoney + '원';
        },
        init: function(model) {
            model.moneyList.forEach(function(item) {
                this.renderMoney({
                    unit: item.unit,
                    count: model.getCountOfUnit(item.unit),
                    totalMoney: model.getTotalMoney()
                });
            }.bind(this));
        }
    }

    const machine = {
        itemContainer: document.querySelector('.machine .items'),
        items: null,
        inputBox: document.querySelector('.machine .input'),
        messageBox: document.querySelector('.machine .message'),
        numberButtons: document.querySelectorAll('.machine .buttons button'),
        bind: function(event, handler) {
            if (event === 'inputItemId') {
                this.numberButtons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        handler(btn.dataset.num);
                    });
                });
            }
        },
        renderMessage: function(params) {
            this.messageBox.innerHTML += params.message + '<br/>';
        },
        renderMoney: function(params) {
            this.inputBox.textContent = params.money + '원';
        },
        renderPurchasableItems: function(params) {
            this.items.forEach(function(item, index) {
                if (!params.purchasableFlags[index]) {
                    item.classList.remove('purchasable');
                    return;
                };

                if (!item.classList.contains('purchasable')) {
                    item.classList.add('purchasable');
                }
            });
        },
        init: function(model) {
            let itemTemplate = '<li class="col-3">' +
              '<div class="item">' +
              '<p class="name">{{name}}</p>' +
              '<span class="id">{{index}}</span>' +
              '<span class="price">{{price}}</span>' +
              '</div>'
            '</li>';

            model.items.forEach(function(item, index) {
                this.itemContainer.innerHTML += itemTemplate
                    .replace('{{name}}', item.name)
                    .replace('{{index}}', (index + 1) + '. ')
                    .replace('{{price}}', item.price);
            }.bind(this));

            this.items = document.querySelectorAll('.machine .items .item');
        }
    }

    const view = {
        wallet: wallet,
        machine: machine,
        init: function(model) {
            this.wallet.init(model.wallet);
            this.machine.init(model.machine);
        }
    }

    window.vm = window.vm || {};
    window.vm.view = view;

})(window);
