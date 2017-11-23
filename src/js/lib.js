function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

function _reduce(list, iter, memo) {
  _each(list, function (a) {
    memo = iter(list[a], memo);
  })
  return memo;
}

function _sum(obj) {
  return _reduce(obj, _add);
}

function _add(a, b) {
  return a + b;
}