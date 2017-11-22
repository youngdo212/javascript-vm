window.vm = window.vm || {};



vm = {
  init() {

    document.querySelectorAll(".wallet_moneys > ul > li > button").forEach(function (button) {
      button.onclick = function () {
        console.log(button.textContent);
      };
    });

  }
}