asc.component('.asc-tab-bar-container', function () {
    this.init = function (tabBarContainer) {
        var tabBar;
        var tabs = [];
        var activeIndex;

        var tabContents = [];
        for (var j = 0; j < tabBarContainer.children.length; j++) {
            if (tabBarContainer.children[j].classList.contains('asc-tab')) {
                tabContents.push(tabBarContainer.children[j]);
            }
        }
        for (var i = 0; i < tabContents.length; i++) {
            var label = tabContents[i].children[0];
            if (label.tagName === "ASC-LABEL") {
                tabs.push(tabContents[i].children[0]);
                if (tabContents[i].classList.contains('active')) {
                    activeIndex = i;
                }
            } else {
                console.error('<asc-label> should be present in <asc-tab> on the first place');
            }
        }

        tabBar = eDOM.el('div');
        tabBar.classList.add('asc-tab-bar');
        tabs.forEach(function (segment, index) {
            segment.addEventListener('click', function (e) {
                tabClick(index);
            });
            tabBar.appendChild(segment);
        });

        if (activeIndex === undefined) {
            activeIndex = 0;
        }
        applyTabBar();
        tabClick(activeIndex);

        function cleanActiveTab() {
            var tabs = tabContents;
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
                tabBar.childNodes[i].classList.remove('active');
            }
        }

        function tabClick(index) {
            var tabs = tabContents;
            cleanActiveTab();
            tabBar.childNodes[index].classList.add('active');
            tabs[index].classList.add('active');
        }

        function applyTabBar() {
            tabBarContainer.appendChild(tabBar);
        }
    }
});