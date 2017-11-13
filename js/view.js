(function (window) {
    var qs = document.querySelector;
    var qsa = document.queryselectorAll;

    var view = {
        moneyList: qsa('.wallet .money > li'),
        moneyUnits: qsa('.wallet .money > li .unit'),
        moneyCounts: qsa('.wallet .money > li .count')
    }

    view.bind = function(event, handler) {
        switch (event) {
            case 'inputMoney':
                moneyUnits.forEach(function(btn, index) {
                    btn.addEventListner('click', function() {
                        var unit = btn.getAttribute('data-value');
                        handler(unit);
                    });
                });
            break;
        }
    };

    view.render = function(command, params) {
        var self = this;

        var viewCommands = {
            updateMoney: function() {
                var item = null;

                for (var i = 0; i < self.moneyList.length; i++) {
                    if (self.moneyUnits[i].getAttribute('data-value') === params.unit) {
                        item = self.moneyCounts[i];
                        break;
                    }
                }

                var count = parseInt(item.getAttribute('data-value'));
                item.textContent = (count + params.count) + '개';
            }
        };

        viewCommands[command]();
    };

    view.init = function(model) {
        var self = this;

        self.moneyList.forEach(function(item, index) {
            var unit = self.moneyUnits[index].getAttribute('data-value');
            var count = model.wallet.getCount(unit);

            unit = parseInt(unit);
            count = parseInt(count);

            self.render('updateMoney', {unit: unit, count: count})
        });
    };

    window.vm = window.vm || {};
    window.vm.view = view;

})(window);
