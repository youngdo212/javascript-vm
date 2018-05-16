const VMViewer = require('../views');
const { $qs, $qsa, $on } = require('../helpers');
const { coin, snacksList } = require('../data');

describe('check methods in template scripts files', () => {
  const vmView = new VMViewer();
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
    const vmView = new VMViewer();
    expect(vmView.setMessage('Hello')).toBe('Hello');
  })

  test('isSelect Methods TEST: ', () => {
    expect(vmView.isSelected().forEach((elem, idx) => {})).toBe();
  })

  test('template Methods TEST:', () => {
    expect(vmView.template('coin-slot__template', name).trim()).toBe('<button></button>');
  })
});