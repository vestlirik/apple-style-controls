(function () {

    function applyActivityIndicator(activityIndicator) {
        addBars(activityIndicator);
    }

    function addBars(activityIndicator) {
        var barsNode = document.createDocumentFragment();
        for (var i = 0; i < 12; i++) {
            var bar = eDOM.el('div');
            bar.classList.add('bar' + i);
            barsNode.appendChild(bar);
        }
        activityIndicator.appendChild(barsNode);
    }

    document.addEventListener('addedNode', function (e) {
        if (e.detail.classList.contains('asc-activity-indicator')) {
            applyActivityIndicator(e.detail);
        }
    });

})();