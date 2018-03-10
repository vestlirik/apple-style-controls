asc.component('asc-add-to-cart-button', function () {
    this.templateSrc = "add-to-cart-button/template.html";
    var self = this;
    this.added = false;
    this.afterInit = function (el) {
        var addedAttr = el.getAttribute('added');
        if (addedAttr) {
            self.added = addedAttr === "true";
        }
    };

    this.params = [
        {
            name: 'added',
            func: function (node, value) {
                self.added = value === "true";
            }
        }
    ];

    this.toggleButton = function () {
        self.added = !self.added;
        self.updateEvents();
    };

    this.updateEvents = function () {
        if (self.added) {
            if (self.events.add) {
                self.events.add();
            }
        } else {
            if (self.events.remove) {
                self.events.remove();
            }
        }
    };

    this.events = ['add', 'remove'];
});