asc.component('asc-checkbox', function () {
    var self = this;
    this.checked = false;

    this.afterInit = function (el) {
        self.element = el;
        var checkedAttr = el.getAttribute('checked');
        if (checkedAttr) {
            self.checked = checkedAttr === "true";
            self.checkItem();
        }
        self.element.addEventListener('click', function () {
            self.checked = !self.checked;
            self.checkItem();
        });
        if ('ontouchstart' in window) {
            self.element.classList.add('touch');
        }
    };

    this.params = [
        {
            name: 'checked',
            func: function (node, value) {
                var newValue = value === "true";
                if (self.checked !== newValue) {
                    self.checked = value;
                    self.checkItem();
                }
            }
        }
    ];

    this.checkItem = function () {
        if (self.checked) {
            self.element.classList.add('checked');
        } else {
            self.element.classList.remove('checked');
        }
    };

    this.events = [
        {
            name: 'checked-change',
            bindToProperty: 'checked'
        }
    ];
});