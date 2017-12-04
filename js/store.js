/*jshint eqeqeq:false */
(function (window) {
    'use strict';

    /**
     * Creates a new client side storage object and will create an empty
     * collection if no collection already exists.
     *
     * @param {string} name The name of our DB we want to use
     * @param {function} callback Our fake DB uses callbacks because in
     * real life you probably would be making AJAX calls
     */
    function Store(name, callback) {
        callback = callback || function () {};

        this._dbName = name;

        if (!localStorage[name]) {
            const data = {
                wallet: {
                    '10원': 0,
                    '50원': 2,
                    '100원': 4,
                    '500원': 3,
                    '1000원': 2,
                    '5000원': 4,
                    '10000원': 1
                }, 
                products: [
                    { name: '콜라', price: 500, id: 0 }, 
                    { name: '사이다', price: 1000, id: 1 }, 
                    { name: '파인애플맛 환타', price: 400, id: 2 }, 
                    { name: '포도맛 환타', price: 300, id: 3 }, 
                    { name: '레몬에이드', price: 900, id: 4 }, 
                    { name: '봉봉', price: 1200, id: 5 }, 
                    { name: '코코아주스', price: 1000, id: 6 }, 
                    { name: '콜라제로', price: 1000, id: 7 }, 
                    { name: '파워에이드', price: 2000, id: 8 }, 
                    { name: '초코우유', price: 1000, id: 9 }, 
                    { name: '초코우유2', price: 7000, id: 10 }, 
                    { name: '초코우유3', price: 600, id: 11 }, 
                    { name: '딸바주스', price: 1000, id: 12 }, 
                    { name: '바나나우유', price: 500, id: 13 }, 
                    { name: '커피우유', price: 1000, id: 14 }, 
                    { name: '알로에', price: 1200, id: 15 }, 
                    { name: '콘칩', price: 1000, id: 16 }, 
                    { name: '새우깡', price: 1000, id: 17 }, 
                    { name: '감자칩', price: 2000, id: 18 }, 
                    { name: '칸쵸', price: 1000, id: 19 }, 
                    { name: '아몬드', price: 450, id: 20 }, 
                    { name: '다크초콜릿', price: 1500, id: 21 }, 
                    { name: '가나초콜릿', price: 1200, id: 22 }, 
                    { name: '견과류', price: 900, id: 23 }, 
                    { name: '육포', price: 1000, id: 24 }, 
                    { name: '오징어포', price: 900, id: 25 }, 
                    { name: '미니땅콩', price: 4000, id: 26 }, 
                    { name: '오징어', price: 2300, id: 27 }, 
                    { name: '{고장}', price: 1000, id: 28 }, 
                    { name: '신라면', price: 700, id: 29 }, 
                    { name: '진라면', price: 800, id: 30 }, 
                    { name: '포도맛 환타', price: 1000, id: 31 }]
            };

            localStorage[name] = JSON.stringify(data);
        }

        callback.call(this, JSON.parse(localStorage[name]));
    }

    Store.prototype.find = function (key) {
        return JSON.parse(localStorage[this._dbName])[key];
    };

    Store.prototype.getTotalMoney = function () {
        const wallet = this.find('wallet');
        const totalMoney = Object.keys(wallet).map((key) => wallet[key] * key.slice(0, -1)).reduce((prev, curr) => prev + curr);

        return totalMoney;
    }

    // Export to window
    window.app = window.app || {};
    window.app.Store = Store;
})(window);