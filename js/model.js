(function(window) {
    var wallet = [
        {
            unit: 10,
            count: 5
        },
        {
            unit: 50,
            count: 3
        },
        {
            unit: 100,
            count: 5
        },
        {
            unit: 500,
            count: 3
        },
        {
            unit: 1000,
            count: 5
        },
        {
            unit: 5000,
            count: 3
        },
        {
            unit: 10000,
            count: 5
        }
    ];

    wallet.total = 0;

    wallet.putMoney = function (unit, count) {
        unit = parseInt(unit);
        count = parseInt(count);

        var item = this.findMoney(unit);

        item.count += count;
        this.total += unit * count;
    }

    wallet.getMoney = function(unit, count) {
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

    var model = {
        wallet: wallet
    }

    window.vm = window.vm || {};
    window.vm.model = model;

})(window);
