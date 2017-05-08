var toolbars = document.getElementsByTagName('asc-toolbar');
for (var i = 0; i < toolbars.length; i++) {
    var button = document.querySelector('button[data-id=' + toolbars[i].id + ']');
    if (button) {
        (function (toolbar) {
            button.addEventListener('click', function () {
                var backdrop = document.createElement('asc-backdrop');
                setTimeout(function () {
                    var closeBackClick = function () {
                        toolbar.style.bottom = "-100px";
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
        })(toolbars[i]);
    }
}