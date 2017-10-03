asc.component('asc-switch', function () {
    var self = this;
    this.init = function () {
        self.id = asc.getUniqueId();
    };
    this.checked = false;
    this.testItems = ['a', 'b', 'c'];

    this.afterInit = function (switchDiv) {
        var checkedAttr = switchDiv.getAttribute('checked');
        if (checkedAttr) {
            self.checked = checkedAttr === "true";
        }
    };

    this.onChecked = function (ev) {
        self.checked = !self.checked;
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
});