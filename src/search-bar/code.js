(function () {

    function applySearchInput(searchInput) {
        searchInput.addEventListener('focus', function (e) {
            e.currentTarget.parentNode.classList.add('asc-clicked');
        });
        searchInput.addEventListener('blur', function (e) {
            e.currentTarget.parentNode.classList.remove('asc-clicked');
        });
    }

    function createSearchControl(parent) {
        var searchIcon = eDOM.el('.search');
        searchIcon.appendChild(eDOM.el('.search__circle'));
        searchIcon.appendChild(eDOM.el('.search__rectangle'));
        var searchInputEl = eDOM.el('input.asc.asc-search-input');
        searchInputEl.setAttribute('placeholder', 'Search');
        var cancel = eDOM.el('button.asc.asc-search-cancel');
        cancel.innerText = "Cancel";
        parent.appendChild(searchIcon);
        parent.appendChild(searchInputEl);
        parent.appendChild(cancel);
    }

    document.addEventListener('addedNode', function (e) {
        if (e.detail.classList.contains('asc-search-bar')) {
            createSearchControl(e.detail);
        } else {
            if (e.detail.classList.contains('asc-search-input')) {
                applySearchInput(e.detail);
            }
        }
    });

})();