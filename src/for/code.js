asc.component('[asc-for]', function () {
    var self = this;

    this.init = function (el) {
        var clonedNode = el.cloneNode(true);
        clonedNode.removeAttribute('asc-for');
        self.elementTemplate = clonedNode.outerHTML;
        self.commentBlock = document.createComment('asc-for');
        insertAfter(self.commentBlock, el);
        el.remove();
    };

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    this.values = [];

    this.update = function (value, context) {
        if (value && value.length && value.length > 0) {
            var innerItems = document.createDocumentFragment();
            value.forEach(function (t, i) {
                var item = self.elementTemplate;
                // var itemArr = item.split(" ");
                // itemArr.forEach(function (part, i) {
                //     var dataItemIndex = itemArr[i].indexOf("{{dataItem");
                //     while (dataItemIndex > -1) {
                //         var endIndex = itemArr[i].indexOf("}}");
                //         var dataEl = itemArr[i].substring(dataItemIndex + 2, endIndex);
                //         if (dataEl === "dataItem") {
                //             itemArr[i] = itemArr[i].replace("{{dataItem}}", t);
                //         } else {
                //             var dataParts = dataEl.replace("dataItem.", "").split('.');
                //             switch (dataParts.length) {
                //                 case 1:
                //                     itemArr[i] = itemArr[i].replace("{{dataItem." + dataParts[0] + "}}", t[dataParts[0]]);
                //                     break;
                //                 case 2:
                //                     itemArr[i] = itemArr[i].replace("{{dataItem." + dataParts[0] + "." + dataParts[1] + "}}", t[dataParts[0]][dataParts[1]]);
                //                     break;
                //                 case 3:
                //                     itemArr[i] = itemArr[i].replace("{{dataItem." + dataParts[0] + "." + dataParts[1] + "." + dataParts[2] + "}}", t[dataParts[0]][dataParts[1]][dataParts[2]]);
                //                     break;
                //             }
                //         }
                //         dataItemIndex = itemArr[i].indexOf("{{dataItem");
                //     }
                // });
                // var innerItem = itemArr.join(" ");
                var virtualEl = document.createElement('div');
                virtualEl.innerHTML = item;
                var itemVDOMElement = virtualEl.firstElementChild;
                window.asc.bindElement(itemVDOMElement, t, context);
                for (var j = 0; j < itemVDOMElement.attributes.length; j++) {
                    if (itemVDOMElement.attributes[j].name.indexOf('(') === 0) {
                        var eventName = itemVDOMElement.attributes[j].name;
                        itemVDOMElement.addEventListener(eventName.substring(1, eventName.length - 1), t.handler);
                    }
                }
                innerItems.appendChild(itemVDOMElement);
            });
            self.values = value;
            self.element = innerItems;
            insertAfter(self.element, self.commentBlock);
        } else {
            if (self.element) {
                self.element.remove();
            }
        }
    };
});