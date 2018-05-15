const VMViewer = require('../views');
const dt = require('../data');

describe('check methods in template scripts files', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div class="selector__status__wrapper">
      <p class="selector__status__coin">0</p>
      <p class="selector__status__items">Hello</p>
    </div>
    `
  })
  test('view setMessage test: ', () => {
    const vmView = new VMViewer();
    expect(vmView.setMessage('Hello')).toBe('Hello');
  })

  test('isSelected test: ', () => {
    expect(vmView.isSelected().toBe());
  })
});