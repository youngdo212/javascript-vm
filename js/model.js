(function(window) {
    var wallet = originalData.wallet; //Array

    wallet.total = 0;
    originalData.wallet.forEach(function(item) {
        wallet.total += item.unit * item.count;
    });
    

    wallet.loseMoney = function(unit, count) {
        unit = parseInt(unit);
        count = parseInt(count);

        var item = this.findMoney(unit);

        item.count -= count;
        this.total -= unit * count;
    }

    wallet.getTotalMoney = function() {
        return this.total;
    }

    wallet.findMoney = function(unit) {
        return this.find(function(item) {
            return item.unit === unit;
        });
    }

    wallet.getCount = function(unit) {
        unit = parseInt(unit);
        var item = this.findMoney(unit);

        return item.count;
    }

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
