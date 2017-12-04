(function (window) {
    'use strict';

    app.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };
    app.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    app.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };

    app.$delegate = function (target, selector, type, handler, capture) {
        const dispatchEvent = event => {
            const targetElement = event.target;
            const potentialElements = target.querySelectorAll(selector);
            let i = potentialElements.length;

            while (i--) {
                if (potentialElements[i] === targetElement) {
                    handler.call(targetElement, event);
                    break;
                }
            }
        };
        app.$on(target, type, dispatchEvent, !!capture);
    };


    // Export to window
    window.app = window.app || {};
})(window);