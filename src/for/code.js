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

    this.update = function (value) {
        if (value && value.length && value.length > 0) {
            var innerItems = "";
            value.forEach(function (t, i) {
                var item = self.elementTemplate;
                var itemArr = item.split(" ");
                itemArr.forEach(function (part, i) {
                    var dataItemIndex = part.indexOf("{{dataItem");
                    if (dataItemIndex > -1) {
                        var endIndex = part.indexOf("}}");
                        var dataEl = part.substring(dataItemIndex + 2, endIndex);
                        if(dataEl === "dataItem"){
                            itemArr[i] = part.replace("{{dataItem}}", t);
                        } else {
                            var dataParts = dataEl.replace("dataItem.", "").split('.');
                            switch (dataParts.length){
                                case 1:
                                    itemArr[i] = part.replace("{{dataItem."+dataParts[0] + "}}", t[dataParts[0]]);
                                    break;
                                case 2:
                                    itemArr[i] = part.replace("{{dataItem."+dataParts[0] + "." + dataParts[1] + "}}", t[dataParts[0]][dataParts[1]]);
                                    break;
                                case 3:
                                    itemArr[i] = part.replace("{{dataItem."+dataParts[0] + "." + dataParts[1] + "." + dataParts[2] + "}}", t[dataParts[0]][dataParts[1]][dataParts[2]]);
                                    break;
                            }
                        }
                    }
                });
                innerItems += itemArr.join(" ");
            });
            self.values = value;
            self.element = document.createRange().createContextualFragment(innerItems);
            insertAfter(self.element, self.commentBlock);
        } else {
            if (self.element) {
                self.element.remove();
            }
        }
    };
});