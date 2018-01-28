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
                        if (attrList[j].name.indexOf('(') === 0) {
                            if (attrValue.indexOf("(") > -1) {
                                var actionName = attrList[j].value.substring(0, attrValue.indexOf("("));
                                var eventName = attrList[j].name.substring(1, attrList[j].name.length - 1);
                                children[i].addEventListener(eventName, creatingObj[actionName]);
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
                            if (attrValue.indexOf("{{") === 0) {
                                var property = attrValue.substring(2, attrValue.length - 2);
                                if (creatingObj.hasOwnProperty(property)) {
                                    if (attrList[j].isAttributeBinding) {
                                        window.asc._registrationList.attr.forEach(function (c) {
                                            if (attrList[j].name === c.name) {
                                                attrList[j].updateObj = new c.obj();
                                                attrList[j].updateObj.init(children[i]);
                                            }
                                        });
                                    }
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
                try {
                    if (children[i]) {
                        if (children[i].childNodes && children[i].childNodes.length > 0) {
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

        function checkAddedNode(addedNode) {
            if (addedNode.classList && addedNode.classList.contains('asc')) {
                var start = window.performance.now();
                document.dispatchEvent(addedNodeEv(addedNode));
                var creatingObjFunc;
                window.asc._registrationList.classes.forEach(function (c) {
                    if (addedNode.classList.contains(c.name)) {
                        creatingObjFunc = c.obj;
                    }
                });
                window.asc._registrationList.tag.forEach(function (c) {
                    if (addedNode.tagName === c.name.toUpperCase()) {
                        creatingObjFunc = c.obj;
                    }
                });
                window.asc._registrationList.id.forEach(function (c) {
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
                                                if (attr.isAttributeBinding) {
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

    function getLocalFile(url) {
        return new Promise(function (resolve, reject) {
            function makeHttpObject() {
                try {
                    return new XMLHttpRequest();
                }
                catch (error) {
                    console.error(err);
                }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (error) {
                    console.error(err);
                }
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (error) {
                    console.error(err);
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
                console.error(err);
                reject(error);
            }
        });
    }

    window.asc.run = runDomListener;
})();