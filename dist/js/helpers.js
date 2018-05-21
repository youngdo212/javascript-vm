const $qs = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

const $qsa = (selector, scope) => {
  let qs = document.querySelector(scope);
  return qs.querySelectorAll(selector);
}

const $on = (target, type, callback) => {  
  return target.addEventListener(type, callback);
}

module.exports = { $qs, $qsa, $on }