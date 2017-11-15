(function (window) {
    var wallet = {
        moneyList: document.querySelectorAll('.wallet .money > li'),
        moneyUnits: document.querySelectorAll('.wallet .money > li .unit'),
        moneyCounts: document.querySelectorAll('.wallet .money > li .count'),
        totalMoney: document.querySelector('.wallet .total'),
        bind: function(event, handler) {
            switch (event) {
                case 'loseMoney':
                    this.moneyUnits.forEach(function(btn, index) {
                        btn.addEventListener('click', function() {
                            var unit = this.moneyList[index].dataset.unit;
                            handler(unit);
                        }.bind(this));
                    }.bind(this));
                break;
            }
        },
        render: function(command, params) {
            var viewCommands = {
                updateMoney: function() {
                    var item = null;

                    for (var i = 0; i < this.moneyList.length; i++) {
                        if (this.moneyList[i].dataset.unit == params.unit) {
                            item = this.moneyCounts[i];
                            break;
                        }
                    }

                    item.textContent = params.count + '개';
                    this.totalMoney.textContent = params.totalMoney + '원';
                }.bind(this)
            };

            viewCommands[command]();
        },
        init: function(model) {
            model.moneyList.forEach(function(item) {
                var unit = item.unit;
                var count = model.getCountOfUnit(unit);
                var totalMoney = model.getTotalMoney();

                this.render('updateMoney', {
                    unit: unit,
                    count: count,
                    totalMoney: totalMoney
                });

            }.bind(this));
        }
    }

    var machine = {
        itemContainer: document.querySelector('.machine .items'),
        items: null,
        inputBox: document.querySelector('.machine .input'),
        render: function(command, params) {
            var viewCommands = {
                updateMoney: function() {
                    this.inputBox.textContent = params.money + '원';
                }.bind(this),

                updatePurchasableItems: function() {
                    console.log('!!');
                    console.log(this.items);
                    this.items.forEach(function(item, index) {
                        console.log(params.isPurchasable[index]);
                        if (!params.isPurchasable[index]) {
                            item.classList.remove('purchasable');
                            return;
                        };

                        if (!item.classList.contains('purchasable')) {
                            item.classList.add('purchasable');
                        }
                    })
                }.bind(this)
            };

            viewCommands[command]();
        },
        init: function(model) {
            var drinkItemTemplate = '<li class="item col-3">' +
              '<p class="name">{{name}}</p>' +
              '<span class="id">{{index}}</span>' +
              '<span class="price">{{price}}</span>' +
            '</li>';

            model.items.forEach(function(item, index) {
                this.itemContainer.innerHTML += drinkItemTemplate
                    .replace('{{name}}', item.name)
                    .replace('{{index}}', (index + 1) + '. ')
                    .replace('{{price}}', item.price);
            }.bind(this));

            this.items = document.querySelectorAll('.machine .items .item');
        }
    }

    var view = {
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
