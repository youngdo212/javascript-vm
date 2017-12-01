/*global app, $on */
(function () {
    'use strict';

    function VendingMachine(name) {
        this.storage = new app.Store(name);
        this.view = new app.View();
        this.controller = new app.Controller(this.storage, this.view);
    }

    const VM = new VendingMachine('codesquad');


    function setView() {
        VM.controller.setView();
    }

    app.$on(window, 'load', setView);
})();