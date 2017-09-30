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
                        registrationList.classes.forEach(function (c) {
                            if (addedNode.classList.contains(c.name)) {
                                c.obj.init(addedNode);
                            }
                        });
                        registrationList.tag.forEach(function (c) {
                            if (addedNode.tagName === c.name.toUpperCase()) {
                                c.obj.init(addedNode);
                            }
                        });
                        registrationList.id.forEach(function (c) {
                            if (addedNode.id === c.name) {
                                c.obj.init(addedNode);
                            }
                        });
                    }
                });
                if (mutation.type === 'attributes' && mutation.attributeName !== 'class' && mutation.attributeName !== 'style') {
                    if (mutation.target.classList && mutation.target.classList.contains('asc')) {
                        document.dispatchEvent(nodeAttrEv(mutation.target, mutation.attributeName));
                        var changedElement;
                        registrationList.classes.forEach(function (c) {
                            if (mutation.target.classList.contains(c.name)) {
                                changedElement = c;
                            }
                        });
                        registrationList.tag.forEach(function (c) {
                            if (mutation.target.tagName === c.name.toUpperCase()) {
                                changedElement = c;
                            }
                        });
                        registrationList.id.forEach(function (c) {
                            if (mutation.target.id === c.name) {
                                changedElement = c;
                            }
                        });
                        if (changedElement) {
                            var handler = changedElement.obj.params.find(function (p) {
                                return p.name === mutation.attributeName
                            });
                            if (handler) {
                                handler.func(mutation.target, mutation.target.getAttribute(mutation.attributeName));
                            }
                        }
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

    /**
     * Add style to head section
     * @param {string} css - css which you need to add
     */
    function addStyleToHead(css) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = eDOM.el('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
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
    var uniqueId = 0;

    function generateUniqueId() {
        return uniqueId++;
    }

    /**
     * Object with components
     * @type {{id: Array.<{name: string, obj: Object}>, tag: Array.<{name: string, obj: Object}>, classes: Array.<{name: string, obj: Object}>}}
     */
    var registrationList = {
        id: [],
        tag: [],
        classes: []
    };

    /**
     * Adding component to app
     * @param {string} selector - selector of component (#*, .*, *)
     * @param {Object | function} componentObject - object for component registration
     * @param {function} componentObject.init - initialization function
     */
    function createComponent(selector, componentObject) {
        if (selector.length > 0) {
            var firstLetter = selector[0];
            var array = registrationList.tag;
            var addName = selector;
            switch (firstLetter) {
                case '#':
                    array = registrationList.id;
                    addName = selector.substring(1);
                    break;
                case '.':
                    array = registrationList.classes;
                    addName = selector.substring(1);
                    break;
            }
            addComponentToList(array, addName, typeof componentObject === "function" ? componentObject() : componentObject);
        }
    }

    function addComponentToList(arr, name, object) {
        if (!object.init) {
            object.init = function () {
            };
        }
        arr.push({
            name: name,
            obj: object
        });
    }

    window.asc = {
        component: createComponent,
        getUniqueId: generateUniqueId,
        run: runDomListener,
        addStyle: addStyleToHead
    };
})();