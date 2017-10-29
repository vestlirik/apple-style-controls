asc.component('directives-test', function () {
    var self = this;
    this.checked = true;
    this.testItems = [
        {
            name: 'one',
            value: '1'
        },
        {
            name: 'two',
            value: '2'
        },
        {
            name: 'three',
            value: '3'
        }
    ];

    this.templateSrc = 'directives-test/template.html';

    this.toggleChange = function (val) {
        self.checked = val;
    }
});