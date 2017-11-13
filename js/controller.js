(function (window) {

    var controller = {

        init: function(model, view) {
            model.wallet.putMoney(10, 5);
            model.wallet.putMoney(50, 3);
            model.wallet.putMoney(100, 5);
            model.wallet.putMoney(500, 3);
            model.wallet.putMoney(1000, 5);
            model.wallet.putMoney(5000, 3);
            model.wallet.putMoney(10000, 5);

            view.init(model);
        }
    }

    window.vm = window.vm || {};
    window.vm.controller = controller;

})(window);
