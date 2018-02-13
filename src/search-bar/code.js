asc.component('.asc-search-input', function(){
    this.init = function (searchInput) {
        searchInput.addEventListener('focus', function (e) {
            e.currentTarget.parentNode.classList.add('asc-clicked');
        });
        searchInput.addEventListener('blur', function (e) {
            e.currentTarget.parentNode.classList.remove('asc-clicked');
        });
    }
});
asc.component('.asc-search-bar', function(){
    this.template =
        '<div class="search"><div class="search__circle"></div><div class="search__rectangle"></div></div>\n' +
        '<input class="asc asc-search-input" placeholder="Search">\n' +
        '<button class="asc asc-search-cancel">Cancel</button>'
    ;
});