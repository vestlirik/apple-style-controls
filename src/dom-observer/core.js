(function () {
    function checkChildrenForBinding(children, creatingObj, watchingProperties) {
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
                                var eventValue = attrValue.substring(attrValue.indexOf("(") + 1, attrValue.indexOf(")"));
                                if (eventValue.length > 0) {

                                }
                                //bind them
                                (function (i, actionName, eventValue) {
                                    children[i].addEventListener(eventName, function (e) {
                                        creatingObj[actionName](e, creatingObj[eventValue] || eventValue);
                                    });
                                })(i, actionName, eventValue);
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
                                //if component has this property
                                if (creatingObj.hasOwnProperty(bindProperty)) {
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
                                    attrList[j].value = attrValue.replace('{{' + bindProperty + '}}', creatingObj[bindProperty]);
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

        window.asc.bindElement = function (node, model) {
            var watchingProperties = {};
            checkChildrenForBinding([node], model, watchingProperties);
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
                                attr.updateObj.update(val);
                            } else {
                                if (attr.nodeValueTemplate) {
                                    attr.nodeValue = attr.nodeValueTemplate.replace('{{' + prop + '}}', val);
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
                window.asc.bindElement(node.children[i], model);
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
                            var keys = Object.keys(watchingProperties);
                            keys.forEach(function (prop) {
                                var value = creatingObj[prop];
                                Object.defineProperty(creatingObj, prop, {
                                    get: function () {
                                        return creatingObj["_" + prop];
                                    },
                                    set: function (val) {
                                        watchingProperties[prop].forEach(function (attr) {
                                            if (attr.isAttributeBinding && attr.updateObj) {
                                                attr.updateObj.update(val);
                                            } else {
                                                if (attr.nodeValueTemplate) {
                                                    attr.nodeValue = attr.nodeValueTemplate.replace('{{' + prop + '}}', val);
                                                } else {
                                                    attr.value = val;
                                                }
                                            }
                                        });
                                        creatingObj["_" + prop] = val;
                                    },
                                    configurable: true
                                });
                                creatingObj[prop] = value;
                            });
                        }
                        if (creatingObj.afterInit) {
                            setTimeout(function () {
                                creatingObj.afterInit(addedNode);
                            }, 0);
                        }
                    }

                    if (creatingObj.template) {
                        applyTemplate(creatingObj.template);
                    } else {
                        if (creatingObj.templateSrc) {
                            window.asc.getLocalFile(creatingObj.templateSrc).then(function (template) {
                                applyTemplate(template);
                            });
                        } else {
                            if (creatingObj.init) {
                                creatingObj.init(addedNode);
                            }
                            if (creatingObj.afterInit) {
                                setTimeout(function () {
                                    creatingObj.afterInit(addedNode);
                                }, 0);
                            }
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