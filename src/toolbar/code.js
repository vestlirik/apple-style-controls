asc.component('asc-toolbar', function(){
    this.init = function (toolbar) {
        var button = document.querySelector('button[data-id=' + toolbar.id + ']');
        if (button) {
            (function (toolbar) {
                var hiddenHeight = -(toolbar.offsetHeight) + "px";
                toolbar.style.bottom = hiddenHeight;

                button.addEventListener('click', function () {
                    var backdrop = eDOM.el('asc-backdrop');
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
});