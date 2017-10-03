asc.component('[asc-for]', function () {
    var self = this;

    this.init = function (el) {
        var clonedNode = el.cloneNode(true);
        self.displayProp = clonedNode.getAttribute('asc-for-name');
        clonedNode.removeAttribute('asc-for');
        clonedNode.removeAttribute('asc-for-name');
        self.elementTemplate = clonedNode.outerHTML;
        self.element = el;
        self.commentBlock = document.createComment('');
    };

    this.values = [];

    this.update = function (value) {
        if (value && value.length && value.length > 0) {
            var innerItems = "";
            value.forEach(function (t, i) {
                var item = self.elementTemplate.replace('{{dataItem}}', self.displayProp ? (t[self.displayProp] || t) : t);
                innerItems += item;
            });
            self.values = value;
            self.element.innerHTML = innerItems;
        } else {
            self.element.innerHTML = "";
        }
    };
});