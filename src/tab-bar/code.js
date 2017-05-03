var tabBar;

function getTabContents() {
    if(!getTabContents.cached) {
        var tabs = document.getElementsByClassName('asc-tab');
        getTabContents.cached = tabs;
    }
    return getTabContents.cached;
}

function initializeTabBar() {
    var tabs = [];
    var activeIndex;

    var tabContents = getTabContents();
    for(var i=0;i<tabContents.length;i++){
        var label = tabContents[i].children[0];
        if(label.tagName === "ASC-LABEL") {
            tabs.push(tabContents[i].children[0]);
            if (tabContents[i].classList.contains('active')) {
                activeIndex = i;
            }
        } else {
            console.error('<asc-label> should be present in <asc-tab> on the first place');
        }
    }

    tabBar = document.createElement('div');
    tabBar.classList.add('asc-tab-bar');
    tabs.forEach(function (segment, index) {
        segment.addEventListener('click', function (e) {
            tabClick(index);
        });
        tabBar.appendChild(segment);
    });

    if(activeIndex===undefined){
        activeIndex = 0;
    }
    applyTabBar();
    tabClick(activeIndex);
}

function cleanActiveTab() {
    var tabs = getTabContents();
    for(var i=0;i<tabs.length;i++){
        tabs[i].classList.remove('active');
        tabBar.childNodes[i].classList.remove('active');
    }
}

function tabClick(index) {
    var tabs = getTabContents();
    cleanActiveTab();
    tabBar.childNodes[index].classList.add('active');
    tabs[index].classList.add('active');
}

function applyTabBar() {
    var tabBarContainer = document.getElementsByClassName('asc-tab-bar-container');
    tabBarContainer[0].appendChild(tabBar);
}

initializeTabBar();