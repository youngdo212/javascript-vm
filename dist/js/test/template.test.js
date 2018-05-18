const { coin, snacksList } = require('../data');
const VMTemplate = require('../template');
const VMView = require('../views');

describe('check methods in template scripts files', () => {
  const vmTemplate = new VMTemplate();
  const vmView = new VMView(coin);

  beforeAll(() => {
    document.body.innerHTML = `
    <template id="coin-slot__template">
        <button>{{name}}</button>
    </template>
    `
  })

  test('template test: ', () => {
    expect(vmTemplate.sumMoney(coin)).toEqual(48500);
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
    expect(vmTemplate.showLoaders()).toEqual(testResult);
  })

  test('show item TEST', () => {
    const vmTemplate = new VMTemplate();
    const vmView = new VMView(coin);
    let result = 
    `<button>100원</button>
    
        <button>500원</button>
    
        <button>1000원</button>
    
        <button>5000원</button>
    
        <button>10000원</button>`

    function showItems(val, templateId) {
      return val.reduce((acc, curr) => acc += vmView.template(templateId, curr), '')
    }

    expect(showItems(coin, 'coin-slot__template').trim()).toEqual(result);
  })
});