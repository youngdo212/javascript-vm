window.vm = window.vm || {};

vm.originalData = (function() {
  const moneyList = [
    { unit: 10, count: 5 },
    { unit: 50, count: 3 },
    { unit: 100, count: 5 },
    { unit: 500, count: 3 },
    { unit: 1000, count: 5 },
    { unit: 5000, count: 3 },
    { unit: 10000, count: 5 },
    { unit: 50000, count: 3}
  ];

  const items = [
    { name: "콜라", price: 500, id: 1 },
    { name: "사이다", price: 1000, id: 2 },
    { name: "환타파인", price: 400, id: 3 },
    { name: "환타포도", price: 400, id: 4 },
    { name: "레몬에이드", price: 500, id: 5 },
    { name: "봉봉", price: 1200, id: 6},
    { name: "코코아주스", price: 1000, id: 7 },
    { name: "콜라제로", price: 1000, id: 8 },
    { name: "파워에이드", price: 400, id: 9 },
    { name: "두유", price: 1000, id: 10 },
    { name: "레쓰비", price: 700, id: 11 },
    { name: "핫식스", price: 600, id: 12 },
    { name: "딸바주스", price: 1000, id: 13 },
    { name: "바나나우유", price: 500, id: 14 },
    { name: "커피우유", price: 1000, id: 15 },
    { name: "알로에주스", price: 1200, id: 16 },
    { name: "콘칩", price: 1000, id: 17 },
    { name: "새우깡", price: 1000, id: 18 },
    { name: "꼬북칩", price: 1400, id: 19 },
    { name: "감자칩", price: 2000, id: 20 },
    { name: "칸쵸", price: 1000, id: 21 },
    { name: "아몬드", price: 450, id: 22 },
    { name: "다크초콜릿", price: 1500, id: 23 },
    { name: "가나초콜릿", price: 1200, id: 24 },
    { name: "견과류", price: 900, id: 25 },
    { name: "육포", price: 2000, id: 26 },
    { name: "오징어포", price: 1200, id: 27 },
    { name: "미니땅콩", price: 800, id: 28 },
    { name: "신라면", price: 900, id: 29 },
    { name: "진라면", price: 900, id: 30 },
    { name: "육개장", price: 1000, id: 31 },
    { name: "짜파게티", price: 1100, id: 32 }
  ];

  return {
    moneyList: moneyList,
    items: items
  };
})();
