(function (window) {

    var controller = {
        init: function(model, view) {
            model.wallet.getMoney(10, 5);
            model.wallet.getMoney(50, 3);
            model.wallet.getMoney(100, 5);
            model.wallet.getMoney(500, 3);
            model.wallet.getMoney(1000, 5);
            model.wallet.getMoney(5000, 3);
            model.wallet.getMoney(10000, 5);

            view.init(model);
        }
    }

    window.vm = window.vm || {};
    window.vm.controller = controller;

})(window);
