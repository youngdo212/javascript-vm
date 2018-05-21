const { coin, snacksList } = require('../data');
const VMTemplate = require('../template');
const VMView = require('../views');

describe('check methods in template scripts files', () => {
  const vmView = new VMView(coin);
  beforeAll(() => {
    document.body.innerHTML = `
    <template id="coin-slot__template">
        <button>{{name}}</button>
    </template>
    `
  })

  test('template test: ', () => {
    // Given
    const vmTemplate = new VMTemplate();

    // When
    const testCode = vmTemplate.sumMoney(coin)
    const testResult = vmTemplate.coinSum;
    
    // Then
    expect(testCode).toEqual(testResult);
  })


  test('loader test: ', () => {
    //given
    const vmTemplate = new VMTemplate();
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
    //when
    const testCode = vmTemplate.showLoaders();

    //then
    expect(testCode).toEqual(testResult);
  })

  test('show item TEST', () => {
    // Given
    const vmTemplate = new VMTemplate();
    const vmView = new VMView(coin);
    let testResult = 
    `<button>100원</button>
    
        <button>500원</button>
    
        <button>1000원</button>
    
        <button>5000원</button>
    
        <button>10000원</button>`

    // When
    const showItems=(val, templateId)=> {
      return val.reduce((acc, curr) => acc += vmView.template(templateId, curr), '')
    }
    const testCode = showItems(coin, 'coin-slot__template').trim()
    
    // Then
    expect(testCode).toEqual(testResult);
  })
});