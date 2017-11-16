(function(window) {
    const wallet = {
        moneyList: originalData.moneyList,
        totalMoney: 0,
        loseMoney: function(unit, count) {
            unit = parseInt(unit);
            count = parseInt(count);

            const item = this.findMoney(unit);

            item.count -= count;
            this.totalMoney -= unit * count;
        },
        getTotalMoney: function () {
            return this.totalMoney;
        },
        findMoney: function(unit) {
            return this.moneyList.find(function(item) {
                return item.unit === unit;
            });
        },
        getCountOfUnit: function(unit) {
            unit = parseInt(unit);
            const item = this.findMoney(unit);

            return item.count;
        },
        init: function() {
            this.moneyList.forEach(function(item) {
                this.totalMoney += item.unit * item.count;
            }.bind(this));
        }
    };

    const machine = {
        money: 0,
        items: originalData.items,
        idInput: '',
        putMoney: function(money) {
            this.money += money;
        },
        getMoney: function() {
            return this.money;
        },
        getPurchasableFlags: function() {
            return this.items.map(function(item) {
                return item.price <= this.money;
            }.bind(this));
        },
        getItemById: function(id) {
            if (id < 1) {
                return undefined;
            }
            
            return this.items[id - 1];
        }
    };

    const model = {
        wallet: wallet,
        machine: machine
    };

    window.vm = window.vm || {};
    window.vm.model = model;

})(window);
