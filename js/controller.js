(function (window) {

    var controller = {
        model: null,
        view: null,
        init: function(model, view) {
            this.model = model;
            this.view = view;

            view.init(model);
            view.wallet.bind('loseMoney', this.spendMoney.bind(this));
        },

        spendMoney: function(unit) {
            var count = this.model.wallet.getCountOfUnit(unit);

            if (count < 1) {
                alert(unit + '원의 개수가 부족합니다.');
                return;
            }

            this.model.wallet.loseMoney(unit, 1);
            this.view.wallet.render('updateMoney', {
                unit: unit,
                count: count - 1,
                totalMoney: this.model.wallet.getTotalMoney()
            });

            var input = parseInt(unit);

            this.model.machine.putMoney(input);
            this.view.machine.render('updateMoney', {money: this.model.machine.getMoney()});

            var isPurchasable = this.model.machine.getPurchasableFlags();
            this.view.machine.render('updatePurchasableItems', {isPurchasable: isPurchasable})
        }
    }

    window.vm = window.vm || {};
    window.vm.controller = controller;

})(window);
