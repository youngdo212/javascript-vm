const { $qs, $qsa, $on } = require('../helpers');

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

  test('$qsa TEST: ', () => {
    const btnElement = $qsa('.selector__buttons', '.selector__buttons__lists')[0];
    const bContainElement = btnElement.classList.contains('selector__buttons');
    expect(bContainElement).toBeTruthy();
  })

  test('$qs TEST: ', () => {
    expect($qs('#selector__button__0').tagName).toEqual('BUTTON');
  })
});


