const VMTemplate = require('../template');
const dt = require('../data');



describe('check methods in template scripts files', () => {
  const vmTemplate = new VMTemplate();
  test('template test: ', () => {
    expect(vmTemplate.sumMoney(dt)).toBe(48500);
  })

  test('loader test: ', () => {
    let testResult = `
    <div class="spinner__container">
      <ul class="spinner__cont">
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
        <li class="spinner__module"></li>
      </ul>
    </div>
    `
    expect(vmTemplate.showLoaders()).toBe(testResult);
  })
});
