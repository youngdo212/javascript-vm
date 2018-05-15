const vmView = require('./views')

class VMTemplate {
  constructor(vmView) {
    this.vmView = vmView;
    this.coinSum = 0;
  }

  showItems(val, templateId) {
    return val.reduce((acc, curr) => acc += this.vmView.template(templateId, curr), '')
  }

  sumMoney(val) {
    return val.reduce((acc, curr) => this.coinSum += curr.store * curr.value, '');
  }

  showLoaders() {
    let output = `
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
    return output;
  }
}


module.exports = VMTemplate;
