/*global app, $on */
(function () {
    'use strict';

    function VendingMachine(name) {
        this.storage = new app.Store(name);
        // this.model = new app.Model(this.storage);
        this.template = new app.Template();
        // this.view = new app.View(this.template);
        // this.controller = new app.Controller(this.model, this.view);

        this.indicatorMoney = 0;
        this.totalMoney = 0;
        this.id = '';
        this.nextEvent = null;
    }

    const VM = new VendingMachine('codesquad');
    const data = VM.storage.findAll();


    const productListEl = qs('.product-list');
    const consoleEl = qs('.console');
    const totalMoneyEl = qs('.totalMoney');
    const indicatorEl = qs('.amount-indicator');
    const moneyEl = qsa('.money-list > li');
    const buttonNumEl = qsa('.button-list .button');

    function setView() {
        productListEl.innerHTML += VM.template.show(data.products);

        renderWallet();

        Array.from(buttonNumEl).forEach(function (btn) {
            $on(btn, 'click', () => {
                inputProductId(btn.textContent);
            });
        });

        Array.from(moneyEl).forEach(function (element) {
            $on(element, 'click', () => {
                withdrawMoney(element.children[1], element.getAttribute('data-money'))
            });
        });

    }

    function clearEvent() {
        if (VM.nextEvent !== null) {
            clearTimeout(VM.nextEvent);
            VM.nextEvent = null;
        }
    };

    function inputProductId(num) {
        clearEvent();

        if (VM.indicatorMoney <= 0) {
            write('돈을 투입하십시오.');
            return;
        }

        VM.id += num;
        write(VM.id);

        VM.nextEvent = setTimeout(function () {
            itemSelected();
            VM.id = '';
        }, 3000);
    }

    function itemSelected() {
        clearEvent();

        const item = data.products.filter(({
            id
        }) => id == VM.id)[0];

        if (!item) {
            write('해당 상품이 존재하지 않음.');
            return;
        }

        if (item.price > VM.indicatorMoney) {
            write('투입 금액이 ' + item.name + '의 가격보다 적음.');
            return;
        }

        VM.indicatorMoney -= item.price;
        indicatorEl.textContent = VM.indicatorMoney + '원';

        write(item.id + '번 ' + item.name + '가 선택됨');
        renderPurchasableProducts();

        VM.nextEvent = setTimeout(function () {
            returnChanges();
        }, 5000);
    }



    function renderPurchasableProducts() {
        const productPrice = qsa('.product-price');

        Array.from(productPrice).forEach(function (el) {
            if (el.textContent <= VM.indicatorMoney) {
                el.parentNode.previousSibling.style.backgroundColor = "yellow";
            } else {
                el.parentNode.previousSibling.style.backgroundColor = "lightblue";
            }
        });

    }


    function renderWallet() {
        Array.from(moneyEl).forEach(function (element) {
            const amountEl = element.children[1];
            const moneyType = element.getAttribute('data-money');
            VM.totalMoney += data.wallet[moneyType] * moneyType.slice(0, -1);
            renderMoney(amountEl, data.wallet[moneyType]);
        });
    }

    function withdrawMoney(amountEl, moneyType) {
        clearEvent();

        if (data.wallet[moneyType] <= 0) {
            write(moneyType + '이 없음.');
            return this;
        }
        write(moneyType + '이 투입됐음.');

        calculateMoney(moneyType);
        renderPurchasableProducts();
        renderMoney(amountEl, data.wallet[moneyType]);


        VM.nextEvent = setTimeout(function () {
            returnChanges();
        }, 5000);
    }


    function calculateMoney(moneyType) {
        const moneyTypeNum = +moneyType.slice(0, -1);
        data.wallet[moneyType]--;
        VM.indicatorMoney += moneyTypeNum;
        VM.totalMoney -= moneyTypeNum;
    }


    function returnChanges() {
        clearEvent();

        const changes = VM.indicatorMoney;
        VM.indicatorMoney = 0;
        VM.totalMoney += changes;



        write(changes + '원을 반환함.');
        renderPurchasableProducts();

    }

    function renderMoney(amountEl, moneyAmount) {
        indicatorEl.textContent = VM.indicatorMoney + '원';
        totalMoneyEl.textContent = VM.totalMoney + '원';
        amountEl.textContent = moneyAmount + '개';
    }

    function write(text) {
        const line = document.createElement('p');
        line.innerHTML = text;
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.offsetHeight;
    };


    $on(window, 'load', setView);
})();