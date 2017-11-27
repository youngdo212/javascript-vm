window.addEventListener('DOMContentLoaded', function () {

    calculateMoney();


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

let consoleEl = document.querySelector('.console');

function calculateMoney() {
    let totalAmount = 0;
    Array.prototype.forEach.call(document.querySelectorAll('.amount'), function (el, i) {
        let moneyType = el.getAttribute('data-money');
        el.textContent = wallet[moneyType] + '개';
        totalAmount += wallet[moneyType] * moneyType.slice(0, -1);
    });

    let totalAmountEl = document.querySelector('.totalAmount');
    totalAmountEl.textContent = totalAmount + '원';

}


function withdrawMoney(id) {
    let moneyType = id.textContent;
    let indicator = document.querySelector('.amount-indicator');
    let productPrice = document.querySelectorAll('.product-price');
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
}


function write(text) {
    var line = document.createElement('p');
    line.innerHTML = text;
    consoleEl.appendChild(line);
};