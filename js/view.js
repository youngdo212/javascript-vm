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
                        var unit = moneyList[index].getAttribute('data-unit');
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
                    if (self.moneyList[i].getAttribute('data-unit') === params.unit) {
                        item = self.moneyCounts[i];
                        break;
                    }
                }

                item.textContent = (count + params.count) + '개';
            }
        };

        viewCommands[command]();
    };

    view.init = function(model) {
        var self = this;

        self.moneyList.forEach(function(item, index) {
            var unit = item.getAttribute('data-unit');
            var count = model.wallet.getCount(unit);

            unit = parseInt(unit);
            count = parseInt(count);

            self.render('updateMoney', {unit: unit, count: count})
        });
    };

    window.vm = window.vm || {};
    window.vm.view = view;

})(window);
