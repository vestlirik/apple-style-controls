asc.component('demo-activity-indicator', function () {
    var self = this;
    this.templateSrc = 'demo/demo-activity-indicator/template.html';
    this.progress = 20;

    this.setProgress = function (e, progress) {
        self.progress = progress;
    };
});