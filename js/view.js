(function (window) {
	'use strict';

	function View() {


		this.productListEl = app.qs('.product-list');
		this.consoleEl = app.qs('.console');
		this.totalMoneyEl = app.qs('.totalMoney');
		this.indicatorEl = app.qs('.amount-indicator');
		this.moneyListEl = app.qs('.money-list');
		this.buttonListEl = app.qs('.button-list');
		this.amountListEl = app.qsa('.amount');
	}

	View.prototype.bind = function (event, handler) {
		if (event === 'withdrawMoney') {
			app.$delegate(this.moneyListEl, '.money .button', 'click', function () {
				handler(this.parentNode.nextElementSibling, this.textContent);
			});

		} else if (event === 'inputProductId') {
			app.$delegate(this.buttonListEl, '.button-list .button', 'click', function () {
				handler(this.textContent);
			});
		}
	};

	View.prototype.render = function (viewCmd, parameter) {
		const viewCommands = {
			showProducts: () => {
				this.productListEl.innerHTML = this._showProductTemplate(parameter);
			},
			renderWallet: () => {
				this._renderWallet(parameter);
			},
			writeLog: () => {
				this._writeLog(parameter);
			},
			renderPurchasableProducts: () => {
				this._renderPurchasableProducts(parameter);
			},
			renderWithdrawMoney: () => {
				this._renderWithdrawMoney(parameter);
			},
			renderIndicatorMoney: () => {
				this._renderIndicatorMoney(parameter);
			}
		};

		viewCommands[viewCmd]();
	};

	View.prototype._showProductTemplate = function (products) {
		const defaultTemplate = '<li class="col-3">' +
			'<div class="product-name">{{name}}</div>' +
			'<div class="product-info">' +
			'<span class="product-id">{{id}}.</span> ' +
			'<span class="product-price">{{price}}</span>' +
			'</div>' +
			'</li>';

		const view = products.map((product) => {
			let template = defaultTemplate;
			template = template.replace('{{name}}', product.name);
			template = template.replace('{{id}}', product.id);
			template = template.replace('{{price}}', product.price);
			return template;
		}).reduce((prev, curr) => prev + curr);

		return view;
	}

	View.prototype._writeLog = function (text) {
		const line = document.createElement('p');
		line.innerHTML = text;
		this.consoleEl.appendChild(line);
		this.consoleEl.scrollTop = this.consoleEl.offsetHeight;
	};

	View.prototype._renderWallet = function ({
		wallet,
		totalMoney,
		indicatorMoney
	}) {
		Array.from(this.amountListEl).forEach((amountEl) => {
			const moneyType = amountEl.getAttribute('data-money');
			this._renderMoneyAmount(amountEl, wallet[moneyType]);
		});
		this._renderIndicatorMoney(indicatorMoney);
		this._renderTotalMoney(totalMoney);
	};

	View.prototype._renderWithdrawMoney = function ({
		amountEl,
		moneyAmount,
		indicatorMoney,
		totalMoney
	}) {
		this._renderMoneyAmount(amountEl, moneyAmount);
		this._renderIndicatorMoney(indicatorMoney);
		this._renderTotalMoney(totalMoney);
	};


	View.prototype._renderMoneyAmount = function (amountEl, moneyAmount) {
		amountEl.textContent = moneyAmount + '개';
	}

	View.prototype._renderTotalMoney = function (totalMoney) {
		this.totalMoneyEl.textContent = totalMoney + '원';
	}

	View.prototype._renderIndicatorMoney = function (indicatorMoney) {
		this.indicatorEl.textContent = indicatorMoney + '원';
	}

	View.prototype._renderPurchasableProducts = function (indicatorMoney) {
		const productPriceEl = app.qsa('.product-price');
		Array.from(productPriceEl).forEach(function (el) {
			if (el.textContent <= indicatorMoney) {
				el.parentNode.previousSibling.style.backgroundColor = "yellow";
			} else {
				el.parentNode.previousSibling.style.backgroundColor = "lightblue";
			}
		});
	};

	// Export to window
	window.app = window.app || {};
	window.app.View = View;
}(window));