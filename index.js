//지갑 부분 로직
var totalAmount = document.querySelector('#wallet-total-amount');
var totalInsertedAmount = document.querySelector('#inserted-total-amount');
var moneyNames = document.querySelectorAll('.money-name')
var moneyNumbers = document.querySelectorAll('.money-number');
for (var i = 0; i < moneyNumbers.length; i++) {
    //지갑에 돈을 넣는 기능
    moneyNumbers[i].addEventListener('click', function (e) {
        var target = e.target;
        target.childNodes[1].innerHTML = parseInt(target.childNodes[1].innerHTML) + 1;
        totalAmount.innerHTML = parseInt(totalAmount.innerHTML) + parseInt(target.parentNode.dataset.amount)
    });
    //동전을 자판기에 넣는 기능
    moneyNames[i].addEventListener('click', function (e) {
        var target = e.target;
        if(target.parentNode.childNodes[3].childNodes[1].innerHTML > 0){
            target.parentNode.childNodes[3].childNodes[1].innerHTML = parseInt(target.parentNode.childNodes[3].childNodes[1].innerHTML) - 1;
            totalInsertedAmount.innerHTML = parseInt(totalInsertedAmount.innerHTML) + parseInt(target.parentNode.dataset.amount)
            totalAmount.innerHTML = parseInt(totalAmount.innerHTML) - parseInt(target.parentNode.dataset.amount)
            consoleNoti('insert', target.parentNode.dataset.amount)
            //TODO:콘솔에서 동전을 넣었다는 안내를 줘야함
        } else {
            //동전이 모자라다는 에러코드
        }

    })
}

//모니터 부분 로직
var menuMonitor = document.querySelector('.menu-number-monitor')
var numberButtons = document.querySelector('.number-buttons');
numberButtons.addEventListener('click', function(e){
    if(e.target.className === 'number-button' && parseInt(e.target.innerHTML) >= 0){
        menuMonitor.innerHTML += e.target.innerHTML;
    } else if (e.target.innerHTML === '정정'){
        var len =  menuMonitor.innerHTML.length - 1
        menuMonitor.innerHTML = menuMonitor.innerHTML.slice(0, len)
    } else if (e.target.innerHTML === '구매'){
        //구매 로직 필요
        console.log(menuMonitor.childNodes[1]);
        checkOrder(menuMonitor.childNodes[1].innerHTML);
    }
})

function clearMonitor(){
    menuMonitor.innerHTML = '';
}


var consoleMonitor = document.querySelector('.console')

function consoleNoti(consoleCase, detail){
    var message = '';
    if (consoleCase === "insert"){
        message += detail + '원 동전을 자판기에 넣으셨습니다.'
    } else if (consoleCase === 'noProduct'){
        message += detail + '번의 상품이 존재하지않습니다.'
    }
    consoleMonitor.innerHTML += '<p> >' + message + '</p>'
}


//제품 리스트 보여주는 화면

var foodList = document.querySelector('.food-list');
var food = document.querySelector('.food');

//json을 통해 음식 리스트를 가져옴
function getData(url) {
    var openRequest = new XMLHttpRequest();
    openRequest.addEventListener("load", function(e) {
        var data = JSON.parse(openRequest.responseText);
        console.log(data)
        setFoodList(data)
    });
    openRequest.open("GET", url);
    openRequest.send();
}

var foodPriceArr = [];
console.log(food)

function setFoodList(data){
    var list = ''
    for(var key in data){
        var template = food
        var foodName = key
        foodPriceArr.push(data[key])
        template.childNodes[1].innerHTML = foodName
        template.childNodes[3].innerHTML = foodPriceArr.length + '. ' + data[key]
        list += "<li class='food'>" + template.innerHTML + "</li>"
    }
    foodList.innerHTML = list
}

function checkOrder(num){
    var productNumber = parseInt(num)
    if(productNumber === 0 || productNumber > foodPriceArr.length){
        consoleNoti('noProduct', productNumber)
        clearMonitor();
        return false
    } else if (totalInsertedAmount < foodPriceArr[productNumber-1]){
        clearMonitor();
        return false
    } else {
        consoleNoti('buy')
        clearMonitor();
        return true

    }
}

function buyProduct(productNumber){

}


document.addEventListener('DOMContentLoaded', function(){

    var foodList = getData('foodList.json')


});