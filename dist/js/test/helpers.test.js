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
    // Given
    const btnElement = $qsa('.selector__buttons', '.selector__buttons__lists')[0];
    //When
    const testCode = btnElement.classList.contains('selector__buttons');
    // Then
    expect(testCode).toBeTruthy();
  })

  test('$qs TEST: ', () => {
    // Given
    const init = $qs('#selector__button__0');
    const testResult = 'BUTTON'
    // When
    const testCode = init.tagName;
    // Then
    expect(testCode).toEqual(testResult);
  })
});