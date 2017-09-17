(function () {

    function initializeSegmentsBar(segmentedControlBlock) {
        var segments = [];
        var segmentsBar;
        var activeIndex;

        var segmentedControls = [];
        for (var j = 0; j < segmentedControlBlock.children.length; j++) {
            if (segmentedControlBlock.children[j].classList.contains('asc-segmented-control')) {
                segmentedControls.push(segmentedControlBlock.children[j]);
            }
        }
        if (segmentedControls.length === 0) {
            return;
        }
        for (var i = 0; i < segmentedControls.length; i++) {
            segments.push(segmentedControls[i].getAttribute('data-label'));
            if (segmentedControls[i].classList.contains('active')) {
                activeIndex = i;
            }
        }

        segmentsBar = eDOM.el('div');
        segmentsBar.classList.add('asc-segmented-bar');
        segments.forEach(function (segment, index) {
            var li = eDOM.el('li');
            li.innerText = segment;
            li.addEventListener('click', function (e) {
                segmentClick(index);
            });
            segmentsBar.appendChild(li);
        });

        if (activeIndex === undefined) {
            activeIndex = 0;
        }
        applySegmentedBar();
        segmentClick(activeIndex);

        function cleanActiveSegments() {
            for (var i = 0; i < segmentedControls.length; i++) {
                segmentedControls[i].classList.remove('active');
                segmentsBar.childNodes[i].classList.remove('active');
            }
        }

        function segmentClick(index) {
            cleanActiveSegments();
            segmentsBar.childNodes[index].classList.add('active');
            segmentedControls[index].classList.add('active');
        }

        function applySegmentedBar() {
            segmentedControlBlock.insertBefore(segmentsBar, segmentedControls[0]);
        }
    }

    document.addEventListener('addedNode', function (e) {
        if (e.detail.classList.contains('asc-segmented-controls')) {
            initializeSegmentsBar(e.detail);
        }
    });

})();