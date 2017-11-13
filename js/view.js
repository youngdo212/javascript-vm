(function (window) {
    var wallet = {
        moneyList: document.querySelectorAll('.wallet .money > li'),
        moneyUnits: document.querySelectorAll('.wallet .money > li .unit'),
        moneyCounts: document.querySelectorAll('.wallet .money > li .count'),
        totalMoney: document.querySelector('.wallet .total')
    }

    wallet.bind = function(event, handler) {
        var self = this;

        switch (event) {
            case 'loseMoney':
                self.moneyUnits.forEach(function(btn, index) {
                    btn.addEventListener('click', function() {
                        var unit = self.moneyList[index].getAttribute('data-unit');
                        handler(unit);
                    });
                });
            break;
        }
    };

    wallet.render = function(command, params) {
        var self = this;

        var viewCommands = {
            updateMoney: function() {
                var item = null;

                for (var i = 0; i < self.moneyList.length; i++) {
                    if (self.moneyList[i].getAttribute('data-unit') === params.unit) {
                        item = self.moneyCounts[i];
                        break;
                    }
                }

                item.textContent = params.count + '개';
                self.totalMoney.textContent = params.totalMoney + '원';
            }
        };

        viewCommands[command]();
    };

    var machine = {
        inputBox: document.querySelector('.machine .input')
    }

    machine.render = function(command, params) {
        var self = this;

        var viewCommands = {
            updateMoney: function() {
                self.inputBox.textContent = params.money + '원';
            }
        };

        viewCommands[command]();
    };

    var view = {
        wallet: wallet,
        machine: machine
    }

    view.init = function(model) {
        var self = this;
        var wallet = self.wallet;
        var machine = self.machine;

        wallet.moneyList.forEach(function(item, index) {
            var unit = item.getAttribute('data-unit');
            var count = model.wallet.getCount(unit);
            var totalMoney = model.wallet.getTotalMoney();

            wallet.render('updateMoney', {
                unit: unit,
                count: count,
                totalMoney: totalMoney
            });
        });
    };

    window.vm = window.vm || {};
    window.vm.view = view;

})(window);
