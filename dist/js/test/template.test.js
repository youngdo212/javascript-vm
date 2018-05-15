const template = require('../template');
const dt = require('../data');


describe('check methods in template scripts files', () => {
  test('template test: ', () => {
    expect(template.templateObj.sumMoney(dt)).toBe(48500);
  })

  test('loader test', () => {
    expect().toBe();
  })
});