function applySearchInput(searchInput) {
    searchInput.addEventListener('focus', function (e) {
        e.currentTarget.parentNode.classList.add('asc-clicked');
    });
    searchInput.addEventListener('blur', function (e) {
        e.currentTarget.parentNode.classList.remove('asc-clicked');
    });
}