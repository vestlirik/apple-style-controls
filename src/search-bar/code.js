var searchInputs = document.getElementsByClassName('asc-search-input');
for (var i=0;i<searchInputs.length;i++){
    searchInputs[i].addEventListener('focus', function (e) {
        e.currentTarget.parentNode.classList.add('asc-clicked');
    });
    searchInputs[i].addEventListener('blur', function (e) {
        e.currentTarget.parentNode.classList.remove('asc-clicked');
    });
}