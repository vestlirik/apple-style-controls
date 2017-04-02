var segmentsBar;

function getSegmentedControls() {
    if(!getSegmentedControls.cached) {
        var segmentedControls = document.getElementsByClassName('asc-segmented-control');
        getSegmentedControls.cached = segmentedControls;
    }
    return getSegmentedControls.cached;
}

function initializeSegmentsBar() {
    var segments = [];
    var activeIndex;

    var segmentedControls = getSegmentedControls();
    for(var i=0;i<segmentedControls.length;i++){
        segments.push(segmentedControls[i].getAttribute('data-label'));
        if(segmentedControls[i].classList.contains('active')){
            activeIndex = i;
        }
    }

    segmentsBar = document.createElement('div');
    segmentsBar.classList.add('asc-segmented-bar');
    segments.forEach(function (segment, index) {
        var li = document.createElement('li');
        li.innerText = segment;
        li.addEventListener('click', function (e) {
            segmentClick(index);
        });
        segmentsBar.appendChild(li);
    });

    if(activeIndex===undefined){
        activeIndex = 0;
    }
    applySegmentedBar();
    segmentClick(activeIndex);
}

function cleanActiveSegments() {
    var segmentedControls = getSegmentedControls();
    for(var i=0;i<segmentedControls.length;i++){
        segmentedControls[i].classList.remove('active');
        segmentsBar.childNodes[i].classList.remove('active');
    }
}

function segmentClick(index) {
    var segmentedControls = getSegmentedControls();
    cleanActiveSegments();
    segmentsBar.childNodes[index].classList.add('active');
    segmentedControls[index].classList.add('active');
}

function applySegmentedBar() {
    var segmentedControls = getSegmentedControls();
    var segmentedControlsContainer = document.getElementsByClassName('asc-segmented-controls');
    segmentedControlsContainer[0].insertBefore(segmentsBar, segmentedControls[0]);
}

initializeSegmentsBar();