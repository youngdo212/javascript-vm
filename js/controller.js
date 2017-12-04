(function (window) {
	'use strict';

	/**
	 * Takes a store and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} store The store instance
	 * @param {object} view The view instance
	 */
	function Controller(store, view) {
		this.store = store;
		this.view = view;
		this.wallet = this.store.find('wallet');
		this.products = this.store.find('products');
		this.nextEvent = null;
		this.indicatorMoney = 0;
		this.totalMoney = this.store.getTotalMoney();
		this.id = '';

		this.view.bind('withdrawMoney', (amount, moneyType) => {
			this.withdrawMoney(amount, moneyType);
		});

		this.view.bind('inputProductId', (num) => {
			this.inputProductId(num);
		});
	}

	Controller.prototype.setView = function () {
		this._updateState();
	};

	Controller.prototype.inputProductId = function (num) {
		this.clearEvent();

		if (this.indicatorMoney <= 0) {
			this.view.render('writeLog', '돈을 투입하십시오.');
			return;
		}

		this.id += num;
		this.view.render('writeLog', this.id);

		this.nextEvent = setTimeout(() => {
			this.itemSelected();
			this.id = '';
		}, 3000);
	}

	Controller.prototype.itemSelected = function () {
		this.clearEvent();

		const item = this.products.filter(({
			id
		}) => id == this.id)[0];

		if (!item) {
			this.view.render('writeLog', '해당 상품이 존재하지 않음.');
			return;
		}

		if (item.price > this.indicatorMoney) {
			this.view.render('writeLog', '투입 금액이 ' + item.name + '의 가격보다 적음.');
			return;
		}

		this.indicatorMoney -= item.price;

		this.view.render('renderIndicatorMoney', this.indicatorMoney);
		this.view.render('writeLog', item.id + '번 ' + item.name + '가 선택됨');
		this.view.render('renderPurchasableProducts', this.indicatorMoney);

		this.nextEvent = setTimeout(() => {
			this.returnChanges();
		}, 5000);
	}


	Controller.prototype.withdrawMoney = function (amountEl, moneyType) {
		this.clearEvent();

		if (this.wallet[moneyType] <= 0) {
			this.view.render('writeLog', moneyType + '이 없음.');
			return this;
		}
		this.view.render('writeLog', moneyType + '이 투입됐음.');

		this.calculateMoney(moneyType);
		this.view.render('renderPurchasableProducts', this.indicatorMoney);
		this.view.render('renderWithdrawMoney', {
			amountEl,
			moneyAmount: this.wallet[moneyType],
			totalMoney: this.totalMoney,
			indicatorMoney: this.indicatorMoney
		});


		this.nextEvent = setTimeout(() => {
			this.returnChanges();
		}, 5000);
	};


	Controller.prototype.returnChanges = function () {
		this.clearEvent();

		let changes = this.indicatorMoney;
		this.indicatorMoney = 0;
		this.totalMoney += changes;

		this.view.render('writeLog', changes + '원을 반환함.');
		this.view.render('renderPurchasableProducts', this.indicatorMoney);

		Object.keys(this.wallet).reverse().forEach((moneyType) => {
			const moneyTypeNum = +moneyType.slice(0, -1);
			const addAmount = Math.floor(changes / moneyTypeNum);

			if (addAmount) {
				this.wallet[moneyType] += addAmount;
				changes -= moneyTypeNum * addAmount;
			}
		})

		this.view.render('renderWallet', {
			wallet: this.wallet,
			totalMoney: this.totalMoney,
			indicatorMoney: this.indicatorMoney
		});

	};

	Controller.prototype.clearEvent = function () {
		if (this.nextEvent !== null) {
			clearTimeout(this.nextEvent);
			this.nextEvent = null;
		}
	};

	Controller.prototype.calculateMoney = function (moneyType) {
		const moneyTypeNum = +moneyType.slice(0, -1);
		this.wallet[moneyType]--;
		this.indicatorMoney += moneyTypeNum;
		this.totalMoney -= moneyTypeNum;
	};


	Controller.prototype._updateState = function () {
		this.view.render('showProducts', this.products);
		this.view.render('renderWallet', {
			wallet: this.wallet,
			totalMoney: this.totalMoney,
			indicatorMoney: this.indicatorMoney
		});
	};

	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);