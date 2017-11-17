window.vm = window.vm || {};

vm.controller = {
    model: null,
    view: null,
    nextEvent: null,
    init: function(model, view) {
        this.model = model;
        this.view = view;
        this.model.wallet.init();

        view.init(model);
        view.wallet.bind('toggleWallet', null);
        view.wallet.bind('loseMoney', this.spendMoney.bind(this));
        view.machine.bind('inputItemId', this.inputItemId.bind(this));
    },
    clearEvent: function() {
        if (this.nextEvent !== null) {
            clearTimeout(this.nextEvent);
            this.nextEvent = null;
        }
    },
    spendMoney: function(unit) {
        this.clearEvent();

        const walletModel = this.model.wallet;
        const walletView = this.view.wallet;
        const count = walletModel.getCountOfUnit(unit);

        if (count < 1) {
            alert(unit + '원의 개수가 부족합니다.');
            return;
        }

        walletModel.loseMoney(unit, 1);
        walletView.renderMoney({
            unit: unit,
            count: count - 1,
            totalMoney: walletModel.getTotalMoney()
        });

        this.inputMoney(parseInt(unit));
    },
    inputMoney: function(input) {
        const machineModel = this.model.machine;
        const machineView = this.view.machine;

        machineModel.putMoney(input);
        machineView.renderMoney(
            {money: machineModel.getMoney()}
        );
        machineView.renderPurchasableItems(
            {purchasableFlags: machineModel.getPurchasableFlags()}
        );
        machineView.renderMessage(
            {message: input + '원이 입력되었습니다.'}
        );

        this.nextEvent = setTimeout(this.returnChanges.bind(this), 5000);
    },
    returnChanges: function() {
        const walletModel = this.model.wallet;
        const walletView = this.view.wallet;
        const machineModel = this.model.machine;
        const machineView = this.view.machine;

        const moneyList = walletModel.moneyList;
        let changes = machineModel.money;

        this.nextEvent = null;
        machineModel.money = 0;

        machineView.renderMoney(
            {money: machineModel.getMoney()}
        );
        machineView.renderMessage(
            {message: changes + '원을 반환합니다.'}
        );
        machineView.renderPurchasableItems(
            {purchasableFlags: machineModel.getPurchasableFlags()}
        );

        //잔돈 반환 로직
        for (let i = moneyList.length - 1; i >= 0; i--) {
            const item = moneyList[i];
            const countOfUnit = Math.floor(changes / item.unit);

            if (countOfUnit > 0) {
                item.count += countOfUnit;
                changes -= item.unit * countOfUnit;
            }

            walletView.renderMoney({
                unit: item.unit,
                count: item.count,
                totalMoney: walletModel.getTotalMoney()
            });
        }
    },
    inputItemId: function(num) {
        this.clearEvent();

        const machineModel = this.model.machine;
        const machineView = this.view.machine;

        if (machineModel.getMoney() === 0) {
            machineView.renderMessage(
                {message: '돈을 투입해 주세요.'}
            );

            return;
        }

        machineModel.idInput += num;
        machineView.renderMessage(
            {message: '입력: ' + machineModel.idInput}
        );

        this.nextEvent = setTimeout(function() {
            this.itemSelected();
            this.model.machine.idInput = '';
        }.bind(this), 3000);
    },
    itemSelected: function() {
        this.clearEvent();

        const machineModel = this.model.machine;
        const machineView = this.view.machine;

        const id = machineModel.idInput;
        const item = machineModel.getItemById(id);

        if (!item) {
            machineView.renderMessage(
                {message: id + '에 해당하는 상품이 존재하지 않습니다.'}
            );

            return;
        }

        if (item.price > machineModel.getMoney()) {
            machineView.renderMessage(
                {message: '투입한 금액이 ' + item.name + '의 가격보다 적습니다.'}
            );

            return;
        }

        machineModel.money -= item.price;
        
        machineView.renderMoney(
            {money: machineModel.getMoney()}
        );
        machineView.renderMessage(
            {message: item.name + ' 상품이 나왔습니다.'}
        );
        machineView.renderPurchasableItems(
            {purchasableFlags: machineModel.getPurchasableFlags()}
        );

        if (machineModel.money > 0) {
            this.nextEvent = setTimeout(this.returnChanges.bind(this), 5000);
        }
    }
}
