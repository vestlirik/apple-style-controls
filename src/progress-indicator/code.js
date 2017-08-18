function applyActivityIndicator(activityIndicator) {
    addBars(activityIndicator);
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