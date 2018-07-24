import {VendingMachineMoneyBox} from "../../js/vendingMachine/vendingMachineMoneyBox.js"

// @value {number} TOTAL_MONEY
const TOTAL_MONEY = 3000;

function initializeDOM(money){
  document.body.innerHTML = `
  <div class="total_money">${money}</div>
  `
}

beforeEach(() => {
  initializeDOM(TOTAL_MONEY);
})


test("_makeChange: {price: count} 형태의 잔돈이 반환된다", () => {
  let vendingMachineMoneyBox = new VendingMachineMoneyBox();
  let money = 2150
  let moneyUnits = [1000, 500, 100, 50, 10];
  let change = {1000: 2, 100: 1, 50: 1};

  expect(vendingMachineMoneyBox._makeChange(money, moneyUnits)).toEqual(change);
})


test("totalMoney: 전체 금액이 반환된다", () => {
  let vendingMachineMoneyBox = new VendingMachineMoneyBox({
    totalMoney: document.querySelector('.total_money')
  });

  expect(vendingMachineMoneyBox.totalMoney()).toBe(TOTAL_MONEY);
})


test("modifyMoney: 양의 정수를 넣으면 금액이 증가한다", () => {
  let vendingMachineMoneyBox = new VendingMachineMoneyBox({
    totalMoney: document.querySelector('.total_money')
  });
  const NEW_MONEY = 4000;

  //when
  vendingMachineMoneyBox.modifyMoney(NEW_MONEY);

  expect(vendingMachineMoneyBox.totalMoney()).toBe(TOTAL_MONEY + NEW_MONEY);
})


test("modifyMoney: 음의 정수를 넣으면 금액이 감소한다", () => {
  let vendingMachineMoneyBox = new VendingMachineMoneyBox({
    totalMoney: document.querySelector('.total_money')
  });
  const NEW_MONEY = -1000;

  //when
  vendingMachineMoneyBox.modifyMoney(NEW_MONEY);

  expect(vendingMachineMoneyBox.totalMoney()).toBe(TOTAL_MONEY + NEW_MONEY);
})


test("returnMoney: 잔돈이 정상적으로 반환된다", () => {
  let vendingMachineMoneyBox = new VendingMachineMoneyBox({
    totalMoney: document.querySelector('.total_money'),
    moneyUnits: [10000, 5000, 1000, 500, 100, 50, 10]
  });
  let change = {1000:3} // TOTAL_MONEY를 기준으로

  expect(vendingMachineMoneyBox.returnMoney()).toEqual(change);
})


test("returnMoney: totalMoney가 0원이 된다", () => {
  let vendingMachineMoneyBox = new VendingMachineMoneyBox({
    totalMoney: document.querySelector('.total_money'),
    moneyUnits: [10000, 5000, 1000, 500, 100, 50, 10]
  });
  const NEW_MONEY = -1000;
  let answer = (TOTAL_MONEY + NEW_MONEY).toString()

  //when
  vendingMachineMoneyBox.returnMoney();

  expect(vendingMachineMoneyBox.totalMoney()).toBe(0);
})