asc.component('[asc-disabled]', function () {
    var self = this;

    this.init = function (el) {
        self.element = el;
    };

    function checkAttribute(value) {
        if (value) {
            self.element.setAttribute('disabled', '');
        } else {
            self.element.removeAttribute('disabled');
        }
    }

    this.update = function (value) {
        checkAttribute(value);
    };
});