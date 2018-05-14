const helpers = require('../helpers');



describe('Check helper methods.', () => {

  beforeAll(() => {
    document.body.innerHTML = `
  <ul class="selector__buttons__lists">
    <li class="selector__buttons">
      <button id="selector__button__0">0</button>
    </li>
    <li class="selector__buttons">
      <button id="selector__button__confirm">confirm</button>
    </li>
  </ul>`;
  })


  test('$qsa test: ', () => {
    expect(helpers.$qsa('.selector__buttons', '.selector__buttons__lists')[0].classList.contains('selector__buttons')).toBe(true);
  })

  test('$qs test: ', () => {
    expect(helpers.$qs('#selector__button__0').id).toBe("selector__button__0");
  })
});



// const $on = (target, type, callback, capture) => {
//   return target.addEventListener(type, callback, !!capture);
// }