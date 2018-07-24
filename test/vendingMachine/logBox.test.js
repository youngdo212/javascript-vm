import {LogBox} from "../../js/vendingMachine/logBox.js";

function initializeDom(){
  document.body.innerHTML = `
  <div class="log_box">
    <div>first</div>
    <div>second</div>
    <div>third</div>
  </div>
  `
}

beforeEach(() => {
  initializeDom();
})


test("_hasMaxMessage: 메시지의 개수가 최대가 되면 true를 반환한다", () => {
  let logBox = new LogBox();
  let has3MessageLogBoxElem = document.querySelector(".log_box");

  expect(logBox._hasMaxMessage({logBox: has3MessageLogBoxElem, maxMessageNumber: 3})).toBe(true);
})


test("_hasMaxMessage: 메시지의 개수가 최대가 아니면 false를 반환한다", () => {
  let logBox = new LogBox();
  let has3MessageLogBoxElem = document.querySelector(".log_box");

  expect(logBox._hasMaxMessage({logBox: has3MessageLogBoxElem, maxMessageNumber: 4})).toBe(false);
})


test("_makeMessageElem: 올바른 메시지 엘리먼트가 만들어진다", () => {
  let logBox = new LogBox();
  let testMessage = 'testing _makeMessageElem';
  let messageElem = document.createElement("DIV");
  let textNode = document.createTextNode(testMessage);
  messageElem.appendChild(textNode);

  expect(logBox._makeMessageElem(testMessage)).toEqual(messageElem);
})


test("_deleteFirstMessage: 첫번째 메시지가 삭제된다", () => {
  let logBox = new LogBox();
  let logBoxElem = document.querySelector(".log_box");
  let secondMessageElem = logBoxElem.children[1];

  logBox._deleteFirstMessage(logBoxElem)

  expect(logBoxElem.firstElementChild).toEqual(secondMessageElem);
})


test("appendMessage: 최대 메시지를 초과하지 않는경우 삭제없이 메시지가 추가된다", () => {
  let logBoxElem = document.querySelector(".log_box");
  let logBox = new LogBox({
    logBox: logBoxElem,
    maxMessageNumber: 4
  });
  let testMessage = 'testing appendMessage';

  let firstMessageElem = logBoxElem.firstElementChild;
  
  let newMessageElem = document.createElement("DIV");
  let textNode = document.createTextNode(testMessage);
  newMessageElem.appendChild(textNode);

  // when
  logBox.appendMessage(testMessage);

  expect(logBoxElem.firstElementChild).toEqual(firstMessageElem);
  expect(logBoxElem.children.length).toBe(4);
  expect(logBoxElem.lastElementChild).toEqual(newMessageElem);
})


test("appendMessage: 최대 메시지를 초과하는 경우 첫 번째 메시지가 삭제되고 새로운 메시지가 추가된다", () => {
  let logBoxElem = document.querySelector(".log_box");
  let logBox = new LogBox({
    logBox: logBoxElem,
    maxMessageNumber: 3
  });
  let testMessage = 'testing appendMessage';

  let firstMessageElem = logBoxElem.children[0];
  let secondMessageElem = logBoxElem.children[1];
  
  let newMessageElem = document.createElement("DIV");
  let textNode = document.createTextNode(testMessage);
  newMessageElem.appendChild(textNode);

  // when
  logBox.appendMessage(testMessage);

  expect(logBoxElem.firstElementChild).not.toEqual(firstMessageElem);
  expect(logBoxElem.firstElementChild).toEqual(secondMessageElem);
  expect(logBoxElem.children.length).toBe(3);
  expect(logBoxElem.lastElementChild).toEqual(newMessageElem);
})