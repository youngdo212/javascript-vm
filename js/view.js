/*global qs, qsa, $on, $parent, $delegate */

(function (window) {
	'use strict';

	function View(template) {
		this.template = template;

		this.$productList = qs('.product-list');
		this.$console = qs('.console');
		this.$totalMoney = qs('.totalMoney');
		this.$indicator = qs('.amount-indicator');
		this.$moneyList = qs('.money-list');
		this.$buttonList = qs('.button-list');
		this.$amountList = qsa('.amount');
	}

	View.prototype.bind = function (event, handler) {
		if (event === 'withdrawMoney') {
			$delegate(this.$moneyList, '.money .button', 'click', function () {
				handler(this.parentNode.nextElementSibling, this.textContent);
			});

		} else if (event === 'inputProductId') {
			$delegate(this.$buttonList, '.button-list .button', 'click', function () {
				handler(this.textContent);
			});
		}
	};

	View.prototype.render = function (viewCmd, parameter) {
		const viewCommands = {
			showProducts: () => {
				this.$productList.innerHTML = this.template.show(parameter);
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

	View.prototype._writeLog = function (text) {
		const line = document.createElement('p');
		line.innerHTML = text;
		this.$console.appendChild(line);
		this.$console.scrollTop = this.$console.offsetHeight;
	};

	View.prototype._renderWallet = function ({
		wallet,
		totalMoney,
		indicatorMoney
	}) {
		Array.from(this.$amountList).forEach(($amount) => {
			const moneyType = $amount.getAttribute('data-money');
			this._renderMoneyAmount($amount, wallet[moneyType]);
		});
		this._renderIndicatorMoney(indicatorMoney);
		this._renderTotalMoney(totalMoney);
	};

	View.prototype._renderWithdrawMoney = function ({
		$amount,
		moneyAmount,
		indicatorMoney,
		totalMoney
	}) {
		this._renderMoneyAmount($amount, moneyAmount);
		this._renderIndicatorMoney(indicatorMoney);
		this._renderTotalMoney(totalMoney);
	};


	View.prototype._renderMoneyAmount = function ($amount, moneyAmount) {
		$amount.textContent = moneyAmount + '개';
	}

	View.prototype._renderTotalMoney = function (totalMoney) {
		this.$totalMoney.textContent = totalMoney + '원';
	}

	View.prototype._renderIndicatorMoney = function (indicatorMoney) {
		this.$indicator.textContent = indicatorMoney + '원';
	}

	View.prototype._renderPurchasableProducts = function (indicatorMoney) {
		const $productPrice = qsa('.product-price');
		Array.from($productPrice).forEach(function (el) {
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