function runDomListener() {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (addedNode) {
                if (addedNode.tagName && addedNode.tagName !== "SCRIPT") {
                    if (addedNode.classList.contains('asc-eraser')) {
                        assignEraser(addedNode);
                    }
                    if (addedNode.tagName === "INPUT" && addedNode.classList.contains('asc')) {
                        applyInput(addedNode);
                    }
                    if (addedNode.classList.contains('asc-edit-menu-button')) {
                        assignMenuToButton(addedNode);
                    }
                    if (addedNode.classList.contains('asc-selectable-text')) {
                        applyDetectingSelectedText();
                    }
                    if (addedNode.id === "asc-edit-menu") {
                        assignEditMenu(addedNode);
                    }
                    if (addedNode.classList.contains('asc-activity-indicator')) {
                        applyActivityIndicator(addedNode);
                    }
                    if (addedNode.classList.contains('asc-segmented-controls')) {
                        initializeSegmentsBar(addedNode);
                    }
                    if (addedNode.classList.contains('asc-tab-bar-container')) {
                        initializeTabBar(addedNode);
                    }
                    if (addedNode.tagName === "ASC-ACTION-SHEET") {
                        applyActionSheet(addedNode);
                    }
                    if (addedNode.classList.contains('asc-search-input')) {
                        applySearchInput(addedNode);
                    }
                    if (addedNode.tagName === 'ASC-TOOLBAR') {
                        applyToolbar(addedNode);
                    }
                }
            });
        });
    });
    observer.observe(document.body, {
        subtree: true,
        childList: true
    });
}
runDomListener();