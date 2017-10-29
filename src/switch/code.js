asc.component('asc-switch', function () {
    var self = this;
    this.init = function () {
        self.id = asc.getUniqueId();
    };
    this.checked = false;

    this.afterInit = function (switchDiv) {
        var checkedAttr = switchDiv.getAttribute('checked');
        if (checkedAttr) {
            self.checked = checkedAttr === "true";
        }
    };

    this.onChecked = function (ev) {
        self.checked = !self.checked;
        if (self.events.change) {
            self.events.change(self.checked);
        }
    };

    this.templateSrc = 'switch/template.html';

    this.params = [
        {
            name: 'checked',
            func: function (node, value) {
                self.checked = value === "true";
            }
        }
    ];
    this.events = ['change'];
});