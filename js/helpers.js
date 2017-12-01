(function (window) {
    'use strict';

    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };
    window.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    window.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };

    window.$delegate = function (target, selector, type, handler) {
        function dispatchEvent(event) {
            const targetElement = event.target;
            const potentialElements = window.qsa(selector, target);
            const hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

            if (hasMatch) {
                handler.call(targetElement, event);
            }
        }

        const useCapture = type === 'blur' || type === 'focus';

        window.$on(target, type, dispatchEvent, useCapture);
    };

})(window);