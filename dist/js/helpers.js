const $qs = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

const $qsa = (selector, scope) => {
  return (scope || document).querySelectorAll(selector);
}

const $on = (target, type, callback, capture) => {
  return target.addEventListener(type, callback, !!capture);
}


module.exports = {$qs, $qsa, $on}