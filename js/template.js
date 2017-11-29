/*jshint laxbreak:true */
(function (window) {
    'use strict';

    function Template() {
        this.defaultTemplate = '<li class="col-3">' +
            '<div class="product-name">{{name}}</div>' +
            '<div class="product-info">' +
            '<span class="product-id">{{id}}.</span> ' +
            '<span class="product-price">{{price}}</span>' +
            '</div>' +
            '</li>'
    }

    Template.prototype.show = function (data) {
        var i, l;
        var view = '';

        for (i = 0, l = data.length; i < l; i++) {
            var template = this.defaultTemplate;

            template = template.replace('{{name}}', data[i].name);
            template = template.replace('{{id}}', data[i].id);
            template = template.replace('{{price}}', data[i].price);

            view = view + template;
        }

        return view;
    };


    // Export to window
    window.app = window.app || {};
    window.app.Template = Template;
})(window);