asc.component('directives-test', function () {
    var self = this;
    this.checked = true;
    this.testItems = ['a', 'b', 'c'];

    this.templateSrc = 'directives-test/template.html';

    this.toggleChange = function (val) {
        self.checked = val;
    }
});