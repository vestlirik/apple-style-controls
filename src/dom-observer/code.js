(function () {
    function runDomListener() {
        function createEvent(addedNode) {
            return new CustomEvent('addedNode', {'detail': addedNode});
        }

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (addedNode) {
                    if (addedNode.classList && addedNode.classList.contains('asc')) {
                        document.dispatchEvent(createEvent(addedNode));
                    }
                });
            });
        });
        observer.observe(document.body, {
            subtree: true,
            childList: true
        });
    }

    //IE polyfill
    (function () {
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
    window.runDomListener = function () {
        runDomListener();
    };
})();