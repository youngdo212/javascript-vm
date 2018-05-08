var templateObj = {
  showItems: function(val, templateId) {
    return val.reduce((acc, curr) => acc += this.vmView.template(templateId, curr), '')
  },

  sumMoney: function(val) {
    return val.reduce((acc, curr) => this.vmView.coinSum += curr.store * curr.value, '');
  },

  showLoaders: function() {
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

function VMTemplate(vmView) {
  return {
    vmView: vmView
  }
}