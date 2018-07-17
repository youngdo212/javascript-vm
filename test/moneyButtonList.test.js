import {MoneyButtonList} from "../js/wallet/moneyButtonList.js"

function initializeDOM(){
  document.body.innerHTML = `
  <ul class="money_button_list">
    <li><button data-price='10'>10원</button></li>
  </ul>`;
}

beforeEach(() => {
  initializeDOM();
})

test('bindSelectMoney(): 클릭된 엘리먼트가 button태그가 아닐 경우 콜백함수가 실행되지 않는다', () => {
  // given
  const evt = new Event('click', {bubbles: true});  
  const mockHandler = jest.fn();
  const moneyButtonList = new MoneyButtonList({
    moneyButtonList: document.querySelector('.money_button_list')
  })

  moneyButtonList.bindSelectMoney(mockHandler);

  // when
  const elem = document.querySelector('li');
  elem.dispatchEvent(evt);

  // then
  expect(mockHandler.mock.calls.length).toBe(0);
})

test('bindSelectMoney(): 버튼 엘리먼트를 클릭할 경우 핸들러가 정상적으로 실행된다', () => {
  // given
  const evt = new Event('click', {bubbles: true});
  const mockHandler = jest.fn();
  const moneyButtonList = new MoneyButtonList({
    moneyButtonList: document.querySelector('.money_button_list')
  })

  moneyButtonList.bindSelectMoney(mockHandler);

  // when
  const elem = document.querySelector('button');
  elem.dispatchEvent(evt);

  // then
  expect(mockHandler.mock.calls.length).toBe(1);
  expect(mockHandler.mock.calls[0][0]).toBe('10');
})