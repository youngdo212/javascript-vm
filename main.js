window.addEventListener('DOMContentLoaded', function () {

    calculateMoney();

    const el = document.getElementsByClassName("money-button");
    Array.from(el).forEach(function (element, i) {
        element.addEventListener('click', function () {
            const moneyType = Object.keys(wallet)[i];
            console.log(moneyType);
            const indicator = document.querySelector('.amount-indicator');
            const productPrice = document.querySelectorAll('.product-price');
            if (wallet[moneyType] > 0) {
                write(moneyType + '이 투입됐음.');
                wallet[moneyType]--;
                indicatorMoney += +moneyType.slice(0, -1);
                indicator.textContent = indicatorMoney + '원';

                Array.prototype.forEach.call(productPrice, function (el) {
                    if (el.textContent <= indicatorMoney) {
                        el.parentNode.previousSibling.previousSibling.style.backgroundColor = "yellow";
                    }
                });

            } else {
                write(moneyType + '이 없음.');
            }

            calculateMoney();
        });
    });

})




const wallet = {
    '10원': 0,
    '50원': 2,
    '100원': 4,
    '500원': 3,
    '1000원': 2,
    '5000원': 4,
    '10000원': 1
};
let indicatorMoney = 0;

const consoleEl = document.querySelector('.console');

function calculateMoney() {
    let totalAmount = 0;
    Array.from(document.querySelectorAll('.amount')).forEach(function (el, i) {
        const moneyType = el.getAttribute('data-money');
        el.textContent = wallet[moneyType] + '개';
        totalAmount += wallet[moneyType] * moneyType.slice(0, -1);
    });

    const totalAmountEl = document.querySelector('.totalAmount');
    totalAmountEl.textContent = totalAmount + '원';

}

function write(text) {
    const line = document.createElement('p');
    line.innerHTML = text;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.offsetHeight;
};