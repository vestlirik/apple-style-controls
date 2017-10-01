asc.component('[asc-if]', function () {
    var self = this;

    this.init = function (el) {
        self.element = el;
        self.commentBlock = document.createComment('');
        insertAfter(self.commentBlock, el);
    };

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    this.update = function (value) {
        if (value) {
            insertAfter(self.element, self.commentBlock);
        } else {
            self.element.remove();
        }
    };
});