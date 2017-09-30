asc.component('.asc-search-input', {
    init: function (searchInput) {
        searchInput.addEventListener('focus', function (e) {
            e.currentTarget.parentNode.classList.add('asc-clicked');
        });
        searchInput.addEventListener('blur', function (e) {
            e.currentTarget.parentNode.classList.remove('asc-clicked');
        });
    }
});
asc.component('.asc-search-bar', {
    init: function (parent) {
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
});