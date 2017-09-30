asc.component('.asc-activity-indicator', {
    init: function (activityIndicator) {
        var barsNode = document.createDocumentFragment();
        for (var i = 0; i < 12; i++) {
            var bar = eDOM.el('div');
            bar.classList.add('bar' + i);
            barsNode.appendChild(bar);
        }
        activityIndicator.appendChild(barsNode);
    }
});