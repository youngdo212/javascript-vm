const VMViewer = require('../views');
const VMController = require('../controller');
const { $qs, $qsa, $on } = require('../helpers');
const { coin, snacksList } = require('../data');

describe('check methods in template scripts files', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div class="selector__status__wrapper">
      <p class="selector__status__coin">0</p>
      <p class="selector__status__items">Hello</p>
    </div>

    <template id="coin-slot__template">
      <button>{{name}}</button>
    </template>

    <ul class="snack__lists">
      <template id="snack__template">
        <li class="snack__items">
          <p class="snack__name">{{name}}</p>
          <p class="snack__price">
            <span class="snack__id">{{id}} &#183;</span> {{price}}
          </p>
        </li>
      </template>
    </ul>
    `
  })

  test('view setMessage TEST: ', () => {
    // Given
    const vmView = new VMViewer();
    const testResult = 'Hello';
    // When
    const testCode = vmView.setMessage('Hello');
    // Then
    expect(testCode).toEqual(testResult);
  })

  test('isSelect Methods TEST: ', () => {
    // Given
    const vmView = new VMViewer();
    const vmControl = new VMController();

    // When
    const testCode = vmView.isSelected().forEach((elem, idx) => {})

    // Then
    expect(testCode).toBeUndefined();
  })

  test('template Methods TEST:', () => {
    // Given
    const vmView = new VMViewer();
    const testResult = '<button></button>';
    // When
    const testCode = vmView.template('coin-slot__template', name).trim();
    // Then
    expect(testCode).toEqual(testResult);
  })
});