(function (window) {
    var controller = {
        model: null,
        view: null,
        nextEvent: null,
        init: function(model, view) {
            this.model = model;
            this.view = view;

            view.init(model);
            view.wallet.bind('loseMoney', this.spendMoney.bind(this));
            view.machine.bind('inputItemId', this.inputItemId.bind(this));
        },

        spendMoney: function(unit) {
            if (this.nextEvent !== null) {
                clearTimeout(this.nextEvent);
                this.nextEvent = null;
            }

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

            this.nextEvent = setTimeout(this.returnChanges.bind(this), 5000);
        },
        returnChanges: function() {
            var moneyList = this.model.wallet.moneyList;
            var changes = this.model.machine.money;

            this.nextEvent = null;
            this.model.machine.money = 0;
            this.view.machine.render('updateMoney', {money: this.model.machine.getMoney()});
            this.view.machine.render('displayMessage', {message: changes + '원을 반환합니다.'});
            var isPurchasable = this.model.machine.getPurchasableFlags();
            this.view.machine.render('updatePurchasableItems', {isPurchasable: isPurchasable});

            //잔돈 반환 로직
            for (var i = moneyList.length - 1; i >= 0; i--) {
                var item = moneyList[i];
                var countOfUnit = Math.floor(changes / item.unit);

                if (countOfUnit > 0) {
                    item.count += countOfUnit;
                    changes -= item.unit * countOfUnit;
                }

                this.view.wallet.render('updateMoney', {
                    unit: item.unit,
                    count: item.count,
                    totalMoney: this.model.wallet.getTotalMoney()
                });
            }



        },
        inputItemId: function(num) {
            if (this.nextEvent !== null) {
                clearTimeout(this.nextEvent);
                this.nextEvent = null;
            }

            var machine = this.model.machine;
            machine.idInput += num;

            this.nextEvent = setTimeout(function() {
                this.itemSelected();
                this.model.machine.idInput = '';
            }.bind(this), 3000);
        },
        itemSelected: function() {
            if (this.nextEvent !== null) {
                clearTimeout(this.nextEvent);
                this.nextEvent = null;
            }

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

            this.nextEvent = setTimeout(this.returnChanges.bind(this), 5000);
        }
    }

    window.vm = window.vm || {};
    window.vm.controller = controller;

})(window);
