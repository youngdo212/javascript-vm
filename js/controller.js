(function (window) {

    var controller = {

        init: function(model, view) {
            view.init(model);
        }
    }

    window.vm = window.vm || {};
    window.vm.controller = controller;

})(window);
