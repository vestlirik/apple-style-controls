(function () {
    function runDomListener() {
        function createEvent(name, node) {
            return new CustomEvent(name, {'detail': node});
        }

        function addedNodeEv(addedNode) {
            return createEvent('addedNode', addedNode);
        }

        function nodeAttrEv(addedNode, attrName) {
            return createEvent('nodeAttributed', {node: addedNode, attr: attrName});
        }

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (addedNode) {
                    if (addedNode.classList && addedNode.classList.contains('asc')) {
                        document.dispatchEvent(addedNodeEv(addedNode));
                    }
                });
                if (mutation.type === 'attributes' && mutation.attributeName !== 'class' && mutation.attributeName !== 'style') {
                    if (mutation.target.classList && mutation.target.classList.contains('asc')) {
                        document.dispatchEvent(nodeAttrEv(mutation.target, mutation.attributeName));
                    }
                }
            });
        });
        observer.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true
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
    var uniqueId = 0;
    window.getUniqueId = function () {
        return uniqueId++;
    };
})();