function $(ele) {
    var selector = document.querySelector(ele)
    return selector
}
function $$(ele) {
    var arr = document.querySelectorAll(ele);
    return arr
}

//Wllet Object
function Wallet() {
    this.cs = new Console();
    this.totalAmount = 0;
    this.insertedAmount = 0;
    this.cash = {"10": 0, "50": 0, "100": 0, "500": 0, "1000": 0, "5000": 0, "10000": 0};
    this.addToWallet = function (coin) {
        this.cash[coin] = parseInt(this.cash[coin]) + 1;
        this.totalAmount += parseInt(coin)
    }
    this.insertToMachine = function (coin) {
        console.log(this.cash)
        this.cash[coin] = parseInt(this.cash[coin]) - 1;
        this.totalAmount -= parseInt(coin);
        this.insertedAmount += parseInt(coin);
        console.log(this.cash)
    }
    this.setEvent = function () {
        var moneyNamesEle = $$('.money-name')
        var moneyNumbersEle = $$('.money-number');
        for (var i = 0; i < Object.keys(this.cash).length; i++) {
            moneyNumbersEle[i].addEventListener('click', function (e) {
                var target = e.target;
                var coin = parseInt(target.parentNode.dataset.amount);
                this.addToWallet(coin)
                target.innerHTML = this.cash[coin] + '개';
                this.renderAmount()
            }.bind(this));
            moneyNamesEle[i].addEventListener('click', function (e) {
                var target = e.target;
                var coin = target.parentNode.dataset.amount;
                var coinNumberEle = target.parentNode.childNodes[3]
                if (this.cash[coin] > 0) {
                    this.insertToMachine(coin)
                    coinNumberEle.innerHTML = this.cash[coin] + '개';
                    this.renderAmount()
                    this.cs.consoleNoti('insert', coin)
                } else {
                    //동전이 모자라다는 에러코드
                    this.cs.consoleNoti('lessCoin', coin + "원")
                }

            }.bind(this))
        }
    }
    this.renderAmount = function () {
        var totalAmountEle = $('#wallet-total-amount');
        var totalInsertedAmountEle = $('#inserted-total-amount')
        totalAmountEle.innerHTML = this.totalAmount;
        totalInsertedAmountEle.innerHTML = this.insertedAmount;
    }

}


function Console(){
    this.consoleMonitor = document.querySelector('.console')
    this.menuMonitor = $('.menu-number-monitor')
    this.consoleNoti = function(consoleCase, detail) {
        var message = '';
        switch (consoleCase) {
            case "insert":
                message += detail + '원 동전을 자판기에 넣으셨습니다.';
                break;
            case "noProduct" :
                message += detail + '번 상품이 존재하지않습니다.'
                break;
            case "overPrice" :
                message += detail + "원이 모자랍니다. 자판기에 돈을 더 넣어주세요."
                break;
            case "noSelect" :
                message += "제품을 선택하지 않으셨습니다. 구매하고자 하는 제품번호를 입력하세요"
                break;
            case "lessCoin" :
                message += detail + "이 지갑에 없습니다."
                break;
            case "buy" :
                message += detail[1] + "원을 지불하여 " + detail[0] + "를 구매하셨습니다."
                break;
        }
        this.clearMonitor();
        this.consoleMonitor.innerHTML += '<p> >' + message + '</p>'
        this.consoleMonitor.scrollTop = this.consoleMonitor.scrollHeight;
    }
    this.clearMonitor = function() {
        this.menuMonitor.innerHTML = '';
    }
}

function VendingMachine(menuObj) {
    this.cs = new Console()
    this.wallet = new Wallet()
    this.wallet.setEvent();

    this.foodList = $('.food-list');
    this.food = $('.food');
    var foodPriceArr = [];
    this.getData = function (url) {
        var openRequest = new XMLHttpRequest();
        openRequest.addEventListener("load", function (e) {
            var data = JSON.parse(openRequest.responseText);
            this.setFoodList(data)
        }.bind(this));
        openRequest.open("GET", url);
        openRequest.send();
    }

    this.setFoodList = function (data) {
        var list = ''
        for (var key in data) {
            var template = this.food
            var foodName = key
            foodPriceArr.push(data[key])
            template.childNodes[1].innerHTML = foodName
            template.childNodes[3].innerHTML = foodPriceArr.length + '. ' + data[key]
            list += "<li class='food'>" + template.innerHTML + "</li>"
        }
        this.foodList.innerHTML = list
    }

    this.menuMonitor = $('.menu-number-monitor')
    var numberButtons = $('.number-buttons');
    numberButtons.addEventListener('click', function (e) {
        if (e.target.className === 'number-button' && parseInt(e.target.innerHTML) >= 0) {
            this.menuMonitor.innerHTML += e.target.innerHTML;
        } else if (e.target.innerHTML === '정정') {
            var len = this.menuMonitor.innerHTML.length - 1
            this.menuMonitor.innerHTML = this.menuMonitor.innerHTML.slice(0, len)
        } else if (e.target.innerHTML === '구매') {
            this.checkOrder(this.menuMonitor.innerHTML);
        }
    }.bind(this))

    this.buyProduct = function(productNumber) {
        console.log(this.wallet)
        var foodPrice = parseInt(foodPriceArr[productNumber - 1]);
        var targetFood = document.querySelectorAll('.food-name')[productNumber - 1].innerHTML
        this.wallet.insertedAmount = parseInt(this.wallet.insertedAmount) - foodPrice;
        this.wallet.renderAmount()
        this.cs.consoleNoti('buy', [targetFood, foodPrice])
    }

    this.checkOrder= function(num) {
        var productNumber = parseInt(num)
        if (productNumber === 0 || productNumber > foodPriceArr.length) {
            this.cs.consoleNoti('noProduct', productNumber)
            return false
        } else if (this.wallet.insertedAmount < foodPriceArr[productNumber - 1]) {
            this.cs.consoleNoti('overPrice', (foodPriceArr[productNumber - 1] - this.wallet.insertedAmount));
            return false
        } else {
            this.buyProduct(productNumber)
            return true

        }
    }

}

document.addEventListener('DOMContentLoaded', function () {
    var vm = new VendingMachine();
    vm.getData('foodList.json')
});