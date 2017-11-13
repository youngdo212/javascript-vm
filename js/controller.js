(function (window) {

    var controller = {
        model: null,
        view: null,
        init: function(model, view) {
            this.model = model;
            this.view = view;

            model.wallet.getMoney(10, 5);
            model.wallet.getMoney(50, 3);
            model.wallet.getMoney(100, 5);
            model.wallet.getMoney(500, 3);
            model.wallet.getMoney(1000, 5);
            model.wallet.getMoney(5000, 3);
            model.wallet.getMoney(10000, 5);

            view.init(model);
            view.bind('inputMoney', this.inputMoney.bind(this));
        },

        inputMoney: function(unit) {
            var count = this.model.wallet.getCount(unit);

            if (count < 1) {
                alert(unit + '원의 개수가 부족합니다.');
                return;
            }

            this.model.wallet.loseMoney(unit, 1);

            var totalMoney = this.model.wallet.getTotalMoney();
            this.view.render('updateMoney', {unit: unit, count: count - 1, totalMoney: totalMoney});
            //this.model.machine.receiveMoney();
        }
    }

    window.vm = window.vm || {};
    window.vm.controller = controller;

})(window);
