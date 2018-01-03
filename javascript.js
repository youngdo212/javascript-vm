var wallet = [0, 1, 5, 0, 2, 2, 1];
var broken_menu = [29];
var keypad_number = '';
var keypad_timer;

var menu_list = document.getElementsByClassName('menu_list')[0];
var cash_list = document.getElementsByClassName('cash_list')[0];
var slot_keypad = document.getElementsByClassName('keypad')[0];
var wallet_balance = document.getElementById('wallet_balance');
var slot_balance = document.getElementById('slot_balance');
var log = document.getElementById('log');

var showMenuList = function() {
  var html = '';
  menu.forEach(function(item, index) {
    var name = broken_menu.indexOf(item.id) >= 0 ? '{고장}' : item.name;

    if (slot_balance.value < item.price || broken_menu.indexOf(item.id) >= 0) {
      html += '<li disabled=disabled>';
    } else {
      html += '<li>'
    }
    html += '<h3>' + item.id + '. ' + name + '</h3><span>' + item.price + '</span></li>';
  });
  menu_list.innerHTML = html;
}

var showCashList = function() {
  var html = '';
  var balance = 0;
  unit.forEach(function(item, index) {
    html += '<li><button type="button" onClick=insertCoin(' + item + ',' + index + ')>' + item + '원</button><span>' + wallet[index] + '개</span></li>';
    balance += item * wallet[index];
  });
  cash_list.innerHTML = html;
  wallet_balance.value = balance;
}

var addEventListener = function() {
  var buttons = slot_keypad.childNodes;
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', clickKeypad);
  }
}

var clickKeypad = function(event) {
  clearTimeout(keypad_timer);
  keypad_number += event.target.innerHTML;

  keypad_timer = setTimeout(function() {
    var select_menu = menu.filter(function(menu) {
      return menu.id == parseInt(keypad_number);
    });

    var message = select_menu[0].id + '번 ' + select_menu[0].name;

    if (broken_menu.indexOf(select_menu[0].id) >= 0) {
      message += '를 선택할 수 없음(고장)\n';
    } else if (select_menu[0].price > slot_balance.value) {
      message += '를 선택할 수 없음(잔액 부족)\n';
    } else {
      message += '가 선택됨\n';
      slot_balance.value = parseInt(slot_balance.value) - select_menu[0].price;
      showMenuList();
      keypad_timer = setTimeout(function() {
        returnChange();
        showMenuList();
      }, 3000)
    }
    keypad_number = '';
    log.value += message;
  }, 3000);
}

var insertCoin = function(unit, index) {
  clearTimeout(keypad_timer);

  if (wallet[index] <= 0) {
    return;
  }
  wallet_balance.value -= unit;
  slot_balance.value = parseInt(slot_balance.value) + unit;
  wallet[index]--;
  log.value += unit + '원이 투입됐음\n';

  showCashList();
  showMenuList();
}

var returnChange = function() {
  var change = parseInt(slot_balance.value);

  for (var i = unit.length - 1; i >= 0; i--) {
    wallet[i] += Math.floor(change / unit[i]);
    change -= unit[i] * Math.floor(change / unit[i]);
  }

  log.value += '잔돈 ' + slot_balance.value + '원이 반환됨\n';
  slot_balance.value = '0';
  showCashList();
}

showMenuList();
showCashList();
addEventListener();
