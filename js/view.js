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
        drinks: document.querySelector('.machine .drinks'),
        inputBox: document.querySelector('.machine .input'),
        render: function(command, params) {
            var viewCommands = {
                updateMoney: function() {
                    this.inputBox.textContent = params.money + '원';
                }.bind(this)
            };

            viewCommands[command]();
        },
        init: function(model) {
            var drinkItemTemplate = '<li class="item-drink col-3">' +
              '<p class="name">{{name}}</p>' +
              '<span class="id">{{index}}</span>' +
              '<span class="price">{{price}}</span>' +
            '</li>';

            model.drinks.forEach(function(item, index) {
                this.drinks.innerHTML += drinkItemTemplate
                    .replace('{{name}}', item.name)
                    .replace('{{index}}', (index + 1) + '. ')
                    .replace('{{price}}', item.price);
            }.bind(this));
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
