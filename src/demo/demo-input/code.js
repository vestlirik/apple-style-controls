asc.component('demo-input', function () {
    this.templateSrc = 'demo/demo-input/template.html';
    this.config = {
        test: 'logo'
    };
    this.logo2 = 'lll';
    var self = this;
    this.afterInit = function () {
        setTimeout(function () {
            self.config['test'] = 'updated logo';
        }, 500);
    }
});