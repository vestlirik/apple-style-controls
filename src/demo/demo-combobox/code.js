asc.component('demo-combobox', function () {
    var self = this;
    this.templateSrc = 'demo/demo-combobox/template.html';
    this.comboboxItems = [];
    this.init = function () {
        for (var i = 0; i < 99; i++) {
            self.comboboxItems.push({
                name: 'Item ' + i,
                value: i
            });
        }
    };

});