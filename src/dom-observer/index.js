(function () {
    window.asc = {};

    //IE polyfill
    (function () {
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        Object.prototype.hasOwnNestedProperty = function(propertyPath){
            if(!propertyPath)
                return false;

            var properties = propertyPath.split('.');
            var obj = this;

            for (var i = 0; i < properties.length; i++) {
                var prop = properties[i];

                if(!obj || !obj.hasOwnProperty(prop)){
                    return false;
                } else {
                    obj = obj[prop];
                }
            }

            return true;
        };
        Object.prototype.getOwnNestedProperty = function(propertyPath, prelast){
            if(!propertyPath)
                return null;

            var properties = propertyPath.split('.');
            var obj = this;

            var length = prelast ? properties.length - 1 : properties.length;
            for (var i = 0; i < length; i++) {
                var prop = properties[i];

                if(!obj || !obj.hasOwnProperty(prop)){
                    return null;
                } else {
                    obj = obj[prop];
                }
            }

            return obj;
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