import {VendingMachine} from "../../js/vendingMachine/vendingMachine.js"

let mockItemList = {};
let mockVendingMachineMoneyBox = {};
let mockNumberButtonList = {bindSelectNumber: jest.fn()};
let mockLogBox = {};
let vendingMachine = new VendingMachine({
  itemList: mockItemList,
  moneyBox: mockVendingMachineMoneyBox,
  numberButtonList: mockNumberButtonList,
  logBox: mockLogBox
})

function initialize(){
  mockItemList = {};
  mockVendingMachineMoneyBox = {};
  mockNumberButtonList = {bindSelectNumber: jest.fn()};
  mockLogBox = {};
  vendingMachine = new VendingMachine({
    itemList: mockItemList,
    moneyBox: mockVendingMachineMoneyBox,
    numberButtonList: mockNumberButtonList,
    logBox: mockLogBox
  })
}

beforeEach(() => {
  initialize();
})

describe("setTimeout, clearTimeout test", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })

  afterAll(() => {
    jest.useRealTimers();
  })
  

  test("inputMoney(moneyData): 메소드가 정상적으로 작동한다", () => {
    mockItemList.highlight = jest.fn();
    mockLogBox.appendMessage = jest.fn();
    mockVendingMachineMoneyBox.modifyMoney = jest.fn();
    mockVendingMachineMoneyBox.totalMoney = jest.fn();
    mockVendingMachineMoneyBox.totalMoney.mockReturnValue(true);

    const moneyData = {100: 1, 500: 10};
    const answer = 5100;
    vendingMachine.inputMoney(moneyData);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(mockVendingMachineMoneyBox.modifyMoney).toHaveBeenCalledWith(answer);
    expect(mockLogBox.appendMessage).toHaveBeenCalledWith(`${answer}원이 투입되었습니다!`);
    expect(mockVendingMachineMoneyBox.totalMoney).toHaveBeenCalled();
    expect(mockItemList.highlight).toHaveBeenCalledWith(true);
  })


  test("selectNumber(number): 메소드가 정상적으로 작동한다", () => {
    const answer = '7';
    vendingMachine.selectNumber(7);

    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(vendingMachine.selectedNumber).toBe(answer);
  })

  test("selectNumber(number): 2번 이상의 호출에도 메소드가 정상적으로 작동한다", () => {
    const answer = '12';
    vendingMachine.selectNumber(1);
    vendingMachine.selectNumber(2);

    expect(clearTimeout).toHaveBeenCalledTimes(4);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(vendingMachine.selectedNumber).toBe(answer);
  })
});


test("selectNumber(number): setTimeout의 콜백함수가 제대로 this 바인딩된다", done => {
  vendingMachine.run = callback;
  function callback(){
    expect(this).toBe(vendingMachine);
    done();
  }
  
  vendingMachine.selectNumber(7);
})


test("run(): 잘못된 번호가 입력된 경우 상품을 출력하지 않는다", () => {
  const ans = 1234;
  vendingMachine.selectedNumber = ans;
  mockItemList.getItem = jest.fn();
  mockItemList.getItem.mockReturnValue(false);
  mockLogBox.appendMessage = jest.fn();

  vendingMachine.run();

  expect(mockItemList.getItem).toHaveBeenCalledWith(ans);
  expect(mockItemList.getItem).toHaveReturnedWith(false);
  expect(mockLogBox.appendMessage).toHaveBeenCalledWith('올바른 번호를 입력하세요');
  // 초기화 테스트
  expect(vendingMachine.selectedNumber).toBe('');
})


test("run(): 올바르게 작동한다", () => {
  document.body.innerHTML = `
  <li class="item" data-number='1' data-price='500'>
    <dl>
      <dt class='item_name'>콜라</dt>
      <dd>1. 500</dd>
    </dl>
  </li>`;
  const item = document.querySelector('li');
  vendingMachine.selectedNumber = '1';
  mockItemList.getItem = jest.fn();
  mockItemList.highlight = jest.fn();
  mockItemList.getItem.mockReturnValue(item);
  mockLogBox.appendMessage = jest.fn();
  mockVendingMachineMoneyBox.modifyMoney = jest.fn();
  mockVendingMachineMoneyBox.totalMoney = jest.fn();
  mockVendingMachineMoneyBox.totalMoney.mockReturnValue('0');

  vendingMachine.run();

  expect(mockItemList.getItem).toHaveBeenCalledWith(1);
  expect(mockItemList.getItem).toHaveReturnedWith(item);
  expect(vendingMachine.selectedNumber).toBe('');
  expect(mockLogBox.appendMessage).toHaveBeenCalledWith('콜라 선택!');
  expect(mockVendingMachineMoneyBox.modifyMoney).toHaveBeenCalledWith(-500);
  expect(mockItemList.highlight).toHaveBeenCalledWith('0');
})