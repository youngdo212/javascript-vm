function _sum(obj, memo) {
  let result = 0;
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

function _sumString(obj) {
  let result = "";
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    for (let value of obj) {
      result += value;
    }
  }
  return result;
}

function _toInt(obj) {
  if (Object.prototype.toString.call(obj) === "[object Array]")
    return _sumString(obj);
  return parseInt(obj, 10);
}