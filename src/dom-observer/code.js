(function () {
    function checkChildrenForBinding(children, creatingObj, watchingProperties) {
        for (var i = 0; i < children.length; i++) {
            var attrList = children[i].attributes;
            if (attrList) {
                for (var j = 0; j < attrList.length; j++) {
                    var attrValue = attrList[j].value;
                    if (attrList[j].name.indexOf('(') === 0) {
                        var actionName = attrList[j].value.substring(0, attrValue.indexOf("("));
                        var eventName = attrList[3].name.substring(1, attrList[3].name.length - 1);
                        children[i].addEventListener(eventName, creatingObj[actionName]);
                    } else {
                        if (attrValue.indexOf("{{") === 0) {
                            var property = attrValue.substring(2, attrValue.length - 2);
                            if (creatingObj.hasOwnProperty(property)) {
                                attrList[j].value = creatingObj[property];
                                if (!watchingProperties[property]) {
                                    watchingProperties[property] = [attrList[j]];
                                } else {
                                    watchingProperties[property].push(attrList[j]);
                                }
                            }
                        }
                    }
                }
            }
            if (children[i].childNodes.length > 0) {
                checkChildrenForBinding(children[i].childNodes, creatingObj, watchingProperties)
            } else {
                if (children[i].nodeValue && children[i].nodeValue.indexOf("{{") > -1) {
                    var innerText = children[i].nodeValue;
                    children[i].nodeValueTemplate = innerText;
                    var property = innerText.substring(2, innerText.length - 2);
                    if (creatingObj.hasOwnProperty(property)) {
                        children[i].nodeValue = innerText.replace('{{' + property + '}}', creatingObj[property]);
                        if (!watchingProperties[property]) {
                            watchingProperties[property] = [children[i]];
                        } else {
                            watchingProperties[property].push(children[i]);
                        }
                    }
                }
            }
        }
    }

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
                var start = window.performance.now();
                mutation.addedNodes.forEach(function (addedNode) {
                    if (addedNode.classList && addedNode.classList.contains('asc')) {
                        document.dispatchEvent(addedNodeEv(addedNode));
                        var creatingObjFunc;
                        registrationList.classes.forEach(function (c) {
                            if (addedNode.classList.contains(c.name)) {
                                creatingObjFunc = c.obj;
                            }
                        });
                        registrationList.tag.forEach(function (c) {
                            if (addedNode.tagName === c.name.toUpperCase()) {
                                creatingObjFunc = c.obj;
                            }
                        });
                        registrationList.id.forEach(function (c) {
                            if (addedNode.id === c.name) {
                                creatingObjFunc = c.obj;
                            }
                        });
                        if (creatingObjFunc) {
                            var creatingObj = new creatingObjFunc();
                            addedNode.bindedToObj = creatingObj;
                            if (creatingObj.templateSrc) {
                                getLocalFile(creatingObj.templateSrc).then(function (template) {
                                    if (creatingObj.init) {
                                        creatingObj.init(addedNode);
                                    }
                                    if (template) {
                                        addedNode.innerHTML = template;
                                        var children = addedNode.childNodes;
                                        var watchingProperties = {};
                                        checkChildrenForBinding(children, creatingObj, watchingProperties);
                                        var keys = Object.keys(watchingProperties);
                                        keys.forEach(function (prop) {
                                            creatingObj["_" + prop] = creatingObj[prop];
                                            Object.defineProperty(creatingObj, prop, {
                                                get: function () {
                                                    return creatingObj["_" + prop];
                                                },
                                                set: function (val) {
                                                    watchingProperties[prop].forEach(function (attr) {
                                                        if (attr.nodeValueTemplate) {
                                                            attr.nodeValue = attr.nodeValueTemplate.replace('{{' + prop + '}}', val);
                                                        } else {
                                                            attr.value = val;
                                                        }
                                                    });
                                                    creatingObj["_" + prop] = val;
                                                },
                                                configurable: true
                                            });
                                        });
                                    }
                                    if (creatingObj.afterInit) {
                                        creatingObj.afterInit(addedNode);
                                    }
                                });
                            } else {
                                if (creatingObj.init) {
                                    creatingObj.init(addedNode);
                                }
                                if (creatingObj.afterInit) {
                                    creatingObj.afterInit(addedNode);
                                }
                            }
                        }
                        var end = window.performance.now();
                        var time = end - start;
                        if (time > 1) {
                            console.log(addedNode.tagName, addedNode.classList);
                            console.log('long mutation processing ', time, 'ms');
                        }
                    }
                });
                if (mutation.type === 'attributes' && mutation.attributeName !== 'class' && mutation.attributeName !== 'style') {
                    if (mutation.target.classList && mutation.target.classList.contains('asc')) {
                        document.dispatchEvent(nodeAttrEv(mutation.target, mutation.attributeName));
                        var changedElement = mutation.target.bindedToObj;
                        if (changedElement) {
                            var handler = changedElement.params.find(function (p) {
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

    function getIndicesOf(str, searchStr, caseSensitive) {
        var searchStrLen = searchStr.length;
        if (searchStrLen == 0) {
            return [];
        }
        var startIndex = 0, index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
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

    function getLocalFile(url) {
        return new Promise(function (resolve, reject) {
            function makeHttpObject() {
                try {
                    return new XMLHttpRequest();
                }
                catch (error) {
                }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (error) {
                }
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (error) {
                }

                throw new Error("Could not create HTTP request object.");
            }

            try {
                var request = makeHttpObject();
                request.open("GET", url, true);
                request.send(null);
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            resolve(request.responseText)
                        } else {
                            reject("Error", request.statusText);
                        }
                    }
                };
            } catch (error) {
                reject(error);
            }
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
            addComponentToList(array, addName, componentObject);
        }
    }

    function addComponentToList(arr, name, object) {
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