function makeItemHtml({number, name, price}){
  return `<li class="item" data-number=${number} data-price=${price}>
  <dl>
    <dt class='item_name'>${name}</dt>
    <dd>${number}. ${price}</dd>
  </dl>
  </li>`
}

export {makeItemHtml}