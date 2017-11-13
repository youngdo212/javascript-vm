(function (window) {

    var controller = {
        model: null,
        view: null,
        init: function(model, view) {
            this.model = model;
            this.view = view;

            model.wallet.putMoney(10, 5);
            model.wallet.putMoney(50, 3);
            model.wallet.putMoney(100, 5);
            model.wallet.putMoney(500, 3);
            model.wallet.putMoney(1000, 5);
            model.wallet.putMoney(5000, 3);
            model.wallet.putMoney(10000, 5);

            view.init(model);
            view.wallet.bind('loseMoney', this.spendMoney.bind(this));
        },

        spendMoney: function(unit) {
            var count = this.model.wallet.getCount(unit);

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
        }
    }

    window.vm = window.vm || {};
    window.vm.controller = controller;

})(window);
