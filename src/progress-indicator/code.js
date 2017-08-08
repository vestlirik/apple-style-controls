function applyActivityIndicators() {
    var activityIndicators = document.getElementsByClassName('asc-activity-indicator');
    for (var i = 0; i < activityIndicators.length; i++) {
        addBars(activityIndicators[i]);
    }
}

function addBars(activityIndicator) {
    var barsNode = document.createDocumentFragment();
    for(var i=0;i<12;i++){
        var bar = document.createElement('div');
        bar.classList.add('bar'+i);
        barsNode.appendChild(bar);
    }
    activityIndicator.appendChild(barsNode);
}

applyActivityIndicators();