(function () {
    window.asc = {};

    //IE polyfill
    (function () {
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        if (typeof window.CustomEvent === "function") return false; //If not IE

        function CustomEvent(event, params) {
            params = params || {bubbles: false, cancelable: false, detail: undefined};
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();
    //IE polyfill

    /**
     * Object with components
     * @type {{id: Array.<{name: string, obj: Object}>, tag: Array.<{name: string, obj: Object}>, classes: Array.<{name: string, obj: Object}>}}
     */
    var registrationList = {
        id: [],
        tag: [],
        classes: [],
        attr: []
    };

    window.asc._registrationList = registrationList;
    window.asc._events = [];
})();