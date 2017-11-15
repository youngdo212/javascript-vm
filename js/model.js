(function(window) {
    var wallet = {
        moneyList: originalData.moneyList,
        totalMoney: 0,
        loseMoney: function(unit, count) {
            unit = parseInt(unit);
            count = parseInt(count);

            var item = this.findMoney(unit);

            item.count -= count;
            this.total -= unit * count;
        },
        getTotalMoney: function () {
            return this.total;
        },
        findMoney: function(unit) {
            return this.find(function(item) {
                return item.unit === unit;
            });
        },
        getCountOfUnit: function(unit) {
            unit = parseInt(unit);
            var item = this.findMoney(unit);

            return item.count;
        },
        init: function() {
            this.moneyList.forEach(function(item) {
                this.total += item.unit * item.count;
            }.bind(this));
        }
    };

    wallet.init();

    var machine = {
        money: 0,
        drinks: originalData.drinks,
        putMoney: function(money) {
            this.money += money;
        },
        getMoney: function() {
            return this.money;
        }
    };

    var model = {
        wallet: wallet,
        machine: machine
    };

    window.vm = window.vm || {};
    window.vm.model = model;

})(window);
