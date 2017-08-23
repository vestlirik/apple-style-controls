(function () {

    function applyToolbar(toolbar) {
        var button = document.querySelector('button[data-id=' + toolbar.id + ']');
        if (button) {
            (function (toolbar) {
                var hiddenHeight = -(toolbar.offsetHeight) + "px";
                toolbar.style.bottom = hiddenHeight;

                button.addEventListener('click', function () {
                    var backdrop = document.createElement('asc-backdrop');
                    setTimeout(function () {
                        var closeBackClick = function () {
                            toolbar.style.bottom = hiddenHeight;
                            backdrop.remove();
                            document.body.removeEventListener('click', closeBackClick);
                        };
                        document.body.addEventListener('click', closeBackClick);
                    }, 0);
                    document.body.appendChild(backdrop);
                    setTimeout(function () {
                        toolbar.style.bottom = "0";
                    }, 0);
                });
            })(toolbar);
        }
    }

    document.addEventListener('addedNode', function (e) {
        if (e.detail.tagName === 'ASC-TOOLBAR') {
            applyToolbar(e.detail);
        }
    });

})();