window.vm = window.vm || {};

vm.view = (function (doc) {
    const wallet = {
        moneyContainer: doc.querySelector('.wallet .money'),
        moneyItems: doc.querySelectorAll('.wallet .money > li'),
        moneyUnits: doc.querySelectorAll('.wallet .money > li .unit'),
        moneyCounts: doc.querySelectorAll('.wallet .money > li .count'),
        totalMoney: doc.querySelector('.wallet .total'),
        openToggle: doc.querySelector('.wallet .wrap-wallet-icon .icon'),
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
        itemContainer: doc.querySelector('.machine .items'),
        items: null,
        inputBox: doc.querySelector('.machine .input'),
        messageBox: doc.querySelector('.machine .message'),
        numberButtons: doc.querySelectorAll('.machine .buttons button'),
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
        mappingItemData: function(template, obj) {
            const keys = Object.keys(obj);
            let result = template;

            keys.forEach((key) => {
                result = result.replace(`{{${key}}}`, obj[key]);
            });

            return result;
        },
        init: function(model) {
            const itemTemplate = doc.querySelector('#itemTemplate');

            model.items.forEach(function(item, index) {
                let newItem = itemTemplate.innerHTML;
                this.itemContainer.innerHTML += this.mappingItemData(newItem, item);
            }.bind(this));

            this.items = doc.querySelectorAll('.machine .items .item');
        }
    }

    return {
        wallet: wallet,
        machine: machine,
        init: function(model) {
            this.wallet.init(model.wallet);
            this.machine.init(model.machine);
        }
    }
})(document);
