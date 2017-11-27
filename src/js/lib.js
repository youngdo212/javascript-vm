function _sum(obj) {
  var result = 0;
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    for (let value of obj) {
      result += value;
    }
  } else {
    for (let value in obj) {
      result += value * obj[value];
    }
  }
  return result;
}

function _add(a, b) {
  return a + b;
}