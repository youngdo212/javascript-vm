(function (window) {

    var controller = {
        model: null,
        view: null,
        init: function(model, view) {
            this.model = model;
            this.view = view;

            view.init(model);
            view.wallet.bind('loseMoney', this.spendMoney.bind(this));
            view.machine.bind('inputItemId', this.inputItemId.bind(this));
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
            this.view.machine.render('updatePurchasableItems', {isPurchasable: isPurchasable});

            this.view.machine.render('displayMessage', {message: input + '원이 입력되었습니다.'});
        },
        inputItemId: function(num) {
            var machine = this.model.machine;
            machine.idInput += num;

            setTimeout(this._checkInputDone(machine.idInput).bind(this), 3000);
        },
        _checkInputDone: function(prevId, machine) {
            return function() {
                if (prevId === this.model.machine.idInput) {
                    this.itemSelected();
                    this.model.machine.idInput = '';
                }
            }.bind(this)
        },
        itemSelected: function() {
            var machine = this.model.machine;
            var id = machine.idInput;
            var item = machine.getItemById(id);

            if (!item) {
                this.view.machine.render('displayMessage', {message: id + '에 해당하는 상품이 존재하지 않습니다.'});
                return;
            }

            if (item.price > machine.getMoney()) {
                this.view.machine.render('displayMessage', {message: '투입한 금액이 ' + item.name + '의 가격보다 적습니다.'});
                return;
            }

            machine.money -= item.price;
            
            this.view.machine.render('updateMoney', {money: machine.getMoney()});
            this.view.machine.render('displayMessage', {message: item.name + ' 상품이 나왔습니다.'});

            var isPurchasable = this.model.machine.getPurchasableFlags();
            this.view.machine.render('updatePurchasableItems', {isPurchasable: isPurchasable});
        }
    }

    window.vm = window.vm || {};
    window.vm.controller = controller;

})(window);
