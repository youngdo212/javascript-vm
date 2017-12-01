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

    app.$delegate = function (target, selector, type, handler) {
        function dispatchEvent(event) {
            const targetElement = event.target;
            const potentialElements = app.qsa(selector, target);
            const hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

            if (hasMatch) {
                handler.call(targetElement, event);
            }
        }

        const useCapture = type === 'blur' || type === 'focus';

        app.$on(target, type, dispatchEvent, useCapture);
    };

    
	// Export to window
	window.app = window.app || {};
})(window);