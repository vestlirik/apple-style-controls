(function () {
    function checkChildrenForBinding(children, creatingObj, watchingProperties, context) {
        for (var i = 0; i < children.length; i++) {
            if (children[i]) {
                var attrList = children[i].attributes;
                if (attrList) {
                    for (var j = 0; j < attrList.length; j++) {
                        var attrValue = attrList[j].value;
                        if (attrList[j].name.indexOf('asc-') === 0) {
                            attrList[j].isAttributeBinding = true;
                        }

                        //if event binding
                        if (attrList[j].name.indexOf('(') === 0) {
                            if (attrValue.indexOf("(") > -1) {
                                //getting name of event for binding
                                var actionName = attrList[j].value.substring(0, attrValue.indexOf("("));
                                //getting event handler name of component
                                var eventName = attrList[j].name.substring(1, attrList[j].name.length - 1);
                                //event value
                                var eventValue = attrValue.substring(attrValue.indexOf("(") + 1, attrValue.indexOf(")")).trim();
                                var eventParams = [];
                                if (eventValue.length > 0) {
                                    eventParams = eventValue.split(',').map(function (ev) {
                                        return ev.trim();
                                    });
                                }
                                //bind them
                                (function (i, actionName, eventValue, context, eventParams) {
                                    children[i].addEventListener(eventName, function (e) {
                                        var paramsArr = [];
                                        eventParams.forEach(function (param) {
                                            switch (param) {
                                                case "$event":
                                                    paramsArr.push(e);
                                                    break;
                                                case "$value":
                                                    if (e instanceof CustomEvent) {
                                                        paramsArr.push(e.detail);
                                                    } else {
                                                        paramsArr.push(null);
                                                    }
                                                    break;
                                                case "$target":
                                                    paramsArr.push(creatingObj || context);
                                                    break;
                                                default:
                                                    paramsArr.push(creatingObj[eventValue]);
                                            }
                                        });
                                        // if (e instanceof CustomEvent) {
                                        //     eventVal = e.detail;
                                        // } else {
                                        //     eventVal = creatingObj[eventValue] || eventValue;
                                        // }

                                        var callingAction = creatingObj[actionName] || (context ? context[actionName] : null);

                                        if (callingAction) {
                                            callingAction.apply(null, paramsArr);
                                        }
                                        // if (creatingObj[actionName]) {
                                        //     creatingObj[actionName](e, eventVal);
                                        // } else {
                                        //     if (context && context[actionName]) {
                                        //         context[actionName](e, eventVal);
                                        //     }
                                        // }
                                    });
                                })(i, actionName, eventValue, context, eventParams);
                            } else {
                                if (!!creatingObj[attrValue]) {
                                    window.asc._events.push({
                                        callback: creatingObj[attrValue],
                                        el: children[i],
                                        elEvent: attrList[j].name.substring(1, attrList[j].name.length - 1)
                                    });
                                }
                            }
                        } else {

                            var bindingIndex = attrValue.indexOf("{{");
                            //if it's binding to value of component
                            if (bindingIndex !== -1) {
                                //binding property of component
                                var bindProperty = attrValue.substring(bindingIndex + 2, attrValue.indexOf("}}"));
                                if (bindProperty.indexOf(':') > -1) {
                                    var bindPropertyParts = bindProperty.split(':').map(function (value) {
                                        return value.trim();
                                    });
                                    var prop = bindPropertyParts[0];
                                    attrList[j].bindingValue = bindPropertyParts[1].replaceAll('\'', '').replaceAll('"', '');
                                    if (prop[0] === '!') {
                                        attrList[j].reverseBinding = true;
                                        prop = prop.substring(1);
                                    }
                                    attrValue = attrValue.replace(bindProperty, prop);
                                    bindProperty = prop;
                                }
                                //if component has this property
                                var propertyNested = bindProperty.indexOf('.') !== -1;
                                if (propertyNested ? creatingObj.hasOwnNestedProperty(bindProperty) : creatingObj.hasOwnProperty(bindProperty)) {
                                    if (attrList[j].isAttributeBinding) {
                                        //find attribute for creating
                                        var creatingAttribute = window.asc._registrationList.attr.find(function (a) {
                                            return a.name === attrList[j].name;
                                        });
                                        if (creatingAttribute) {
                                            attrList[j].updateObj = new creatingAttribute.obj();
                                            attrList[j].updateObj.init(children[i]);
                                        }
                                    }
                                    //for not custom attributes
                                    if (attrValue.length - 4 > bindProperty.length) {
                                        attrList[j].nodeValueTemplate = attrValue;
                                    }
                                    var bindObj = propertyNested ? creatingObj.getOwnNestedProperty(bindProperty) : creatingObj[bindProperty];
                                    attrList[j].value = attrValue.replace('{{' + bindProperty + '}}', bindObj);
                                    if (!watchingProperties[bindProperty]) {
                                        watchingProperties[bindProperty] = [attrList[j]];
                                    } else {
                                        watchingProperties[bindProperty].push(attrList[j]);
                                    }
                                }
                            }
                        }
                    }
                }
                try {
                    if (children[i]) {
                        if (children[i].childNodes && children[i].childNodes.length > 0) {
                            checkChildrenForBinding(children[i].childNodes, creatingObj, watchingProperties);
                        } else {
                            //if is binding inside element
                            if (children[i].nodeValue) {
                                children[i].nodeValue = children[i].nodeValue.trim();
                            }
                            if (children[i].nodeValue && children[i].nodeValue.indexOf("{{") > -1) {
                                var innerText = children[i].nodeValue;
                                children[i].nodeValueTemplate = innerText;
                                var property = innerText.substring(2, innerText.length - 2);
                                // debugger;
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
                } catch (err) {
                    debugger;
                    console.error(err);
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

        function getCreatingObjFunction(addedNode) {
            var creatingObjFunc;
            if (!creatingObjFunc) {
                window.asc._registrationList.classes.forEach(function (c) {
                    if (addedNode.classList.contains(c.name)) {
                        creatingObjFunc = c.obj;
                    }
                });
            }
            if (!creatingObjFunc) {
                window.asc._registrationList.tag.forEach(function (c) {
                    if (addedNode.tagName === c.name.toUpperCase()) {
                        creatingObjFunc = c.obj;
                    }
                });
            }
            if (!creatingObjFunc) {
                window.asc._registrationList.id.forEach(function (c) {
                    if (addedNode.id === c.name) {
                        creatingObjFunc = c.obj;
                    }
                });
            }
            return creatingObjFunc;
        }

        window.asc.bindElement = function (node, model, context) {
            var watchingProperties = {};
            checkChildrenForBinding([node], model, watchingProperties, context);
            var keys = Object.keys(watchingProperties);
            keys.forEach(function (prop) {
                var value = model[prop];
                Object.defineProperty(model, prop, {
                    get: function () {
                        return model["_" + prop];
                    },
                    set: function (val) {
                        watchingProperties[prop].forEach(function (attr) {
                            if (attr.isAttributeBinding && attr.updateObj) {
                                attr.updateObj.update(val, context);
                            } else {
                                if (attr.nodeValueTemplate) {
                                    var templateVal = val;
                                    if (attr.bindingValue) {
                                        if (attr.reverseBinding) {
                                            templateVal = val ? '' : attr.bindingValue;
                                        } else {
                                            templateVal = val ? attr.bindingValue : '';
                                        }
                                    } else {
                                        if (attr.reverseBinding) {
                                            val = !val;
                                        }
                                    }
                                    attr.nodeValue = attr.nodeValueTemplate.replace('{{' + prop + '}}', templateVal || val);
                                } else {
                                    attr.value = val;
                                }
                            }
                        });
                        model["_" + prop] = val;
                    },
                    configurable: true
                });
                model[prop] = value;
            });
            for (var i = 0; i < node.children.length; i++) {
                window.asc.bindElement(node.children[i], model, context);
            }
        };

        function checkAddedNode(addedNode) {
            if (addedNode.classList && addedNode.classList.contains('asc')) {
                var start = window.performance.now();
                document.dispatchEvent(addedNodeEv(addedNode));
                var creatingObjFunc = getCreatingObjFunction(addedNode);
                if (creatingObjFunc) {
                    var creatingObj = new creatingObjFunc();
                    addedNode.bindedToObj = creatingObj;

                    var customEvents = {};

                    if (creatingObj.events && creatingObj.events.length > 0) {
                        creatingObj.events.forEach(function (event) {
                            creatingObj.events[event.name] = function (data) {
                                if (creatingObj._isInited) {
                                    addedNode.dispatchEvent(new CustomEvent(event.name, {'detail': data}));
                                }
                            };
                            if (event.bindToProperty) {
                                if (!customEvents[event.bindToProperty]) {
                                    customEvents[event.bindToProperty] = [];
                                }
                                customEvents[event.bindToProperty].push(creatingObj.events[event.name]);
                            }
                        });
                    }

                    function applyCustomEventsOnly() {
                        var keys = Object.keys(customEvents);
                        keys.forEach(function (prop) {
                            var value = creatingObj[prop];
                            Object.defineProperty(creatingObj, prop, {
                                get: function () {
                                    return creatingObj["_" + prop];
                                },
                                set: function (val) {
                                    if (customEvents[prop]) {
                                        customEvents[prop].forEach(function (event) {
                                            event(val);
                                        });
                                    }
                                    creatingObj["_" + prop] = val;
                                },
                                configurable: true
                            });
                            creatingObj[prop] = value;
                        });
                    }

                    function applyTemplate(template) {
                        if (creatingObj.init) {
                            creatingObj.init(addedNode);
                        }
                        if (template) {
                            addedNode.innerHTML = template;
                            window.asc._events.forEach(function (event) {
                                if (event.el === addedNode && creatingObj.events.indexOf(event.elEvent) > -1) {
                                    creatingObj.events[event.elEvent] = event.callback;
                                }
                            });
                            var children = addedNode.childNodes;
                            var watchingProperties = {};
                            checkChildrenForBinding(children, creatingObj, watchingProperties);
                            var watchKeys = Object.keys(watchingProperties);
                            var eventKeys = Object.keys(customEvents);
                            var keys = watchKeys;
                            eventKeys.forEach(function (key) {
                                if (keys.indexOf(key) === -1) {
                                    keys.push(key);
                                }
                            });
                            keys.forEach(function (prop) {
                                var value = creatingObj.getOwnNestedProperty(prop);
                                var creatingObjOwn = creatingObj.getOwnNestedProperty(prop, true);
                                var originalProp = prop;
                                var propArr = prop.split('.');
                                prop = propArr[propArr.length - 1];
                                Object.defineProperty(creatingObjOwn, prop, {
                                    get: function () {
                                        return creatingObjOwn["_" + prop];
                                    },
                                    set: function (val) {
                                        if (watchingProperties[originalProp]) {
                                            watchingProperties[originalProp].forEach(function (attr) {
                                                if (attr.isAttributeBinding && attr.updateObj) {
                                                    attr.updateObj.update(val, creatingObj);
                                                } else {
                                                    var templateVal = val;
                                                    if (attr.nodeValueTemplate) {
                                                        if (attr.bindingValue) {
                                                            if (attr.reverseBinding) {
                                                                templateVal = val ? '' : attr.bindingValue;
                                                            } else {
                                                                templateVal = val ? attr.bindingValue : '';
                                                            }
                                                        } else {
                                                            if (attr.reverseBinding) {
                                                                val = !val;
                                                            }
                                                        }
                                                        attr.nodeValue = attr.nodeValueTemplate.replace('{{' + originalProp + '}}', templateVal);
                                                    } else {
                                                        attr.value = val;
                                                    }
                                                }
                                            });
                                        }
                                        if (customEvents[originalProp]) {
                                            customEvents[originalProp].forEach(function (event) {
                                                event(val);
                                            });
                                        }
                                        Object.defineProperty(creatingObjOwn, "_" + prop, {
                                            enumerable: false,
                                            writable: true
                                        });
                                        creatingObjOwn["_" + prop] = val;
                                    },
                                    configurable: true
                                });
                                creatingObjOwn[prop] = value;
                            });
                        }
                        if (creatingObj.afterInit) {
                            setTimeout(function () {
                                creatingObj.afterInit(addedNode);
                                creatingObj._isInited = true;
                            }, 0);
                        } else {
                            creatingObj._isInited = true;
                        }
                    }

                    if (creatingObj.template) {
                        applyTemplate(creatingObj.template);
                    } else {
                        if (creatingObj.templateSrc) {
                            if (creatingObjFunc._loadedTemplate) {
                                applyTemplate(creatingObjFunc._loadedTemplate);
                            } else {
                                window.asc.getLocalFile(creatingObj.templateSrc).then(function (template) {
                                    creatingObjFunc._loadedTemplate = template;
                                    applyTemplate(template);
                                });
                            }
                        } else {
                            if (creatingObj.init) {
                                creatingObj.init(addedNode);
                            }
                            if (creatingObj.afterInit) {
                                setTimeout(function () {
                                    creatingObj.afterInit(addedNode);
                                    creatingObj._isInited = true;
                                }, 0);
                            } else {
                                creatingObj._isInited = true;
                            }
                            applyCustomEventsOnly();
                        }
                    }
                } else {
                    for (var i = 0; i < addedNode.childNodes.length; i++) {
                        checkAddedNode(addedNode.childNodes[i]);
                    }
                }
                var end = window.performance.now();
                var time = end - start;
                if (time > 1) {
                    console.log(addedNode.tagName, addedNode.classList);
                    console.log('long mutation processing ', time, 'ms');
                }
            }
        }

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (addedNode) {
                    checkAddedNode(addedNode);
                });
                if (mutation.type === 'attributes' && mutation.attributeName !== 'class' && mutation.attributeName !== 'style') {
                    if (mutation.target.classList && mutation.target.classList.contains('asc')) {
                        document.dispatchEvent(nodeAttrEv(mutation.target, mutation.attributeName));
                        var changedElement = mutation.target.bindedToObj;
                        if (changedElement && changedElement.params) {
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

    window.asc.run = runDomListener;
})();