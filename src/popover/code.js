asc.component('asc-popover', {
    init: function (popover) {
        var button = document.querySelector('button[data-id=' + popover.id + ']');
        if (button) {
            (function (popover) {
                var div = eDOM.el('div');
                while (popover.children.length) {
                    div.appendChild(popover.children[0]);
                }
                popover.appendChild(div);
                popover.addEventListener('click', function (event) {
                    event.stopImmediatePropagation();
                });
                button.addEventListener('click', function (e) {
                    var backdrop = eDOM.el('asc-backdrop');
                    popover.style.display = "flex";
                    popover.style.top = (button.offsetTop + button.offsetHeight + 10) + "px";
                    var leftOffset = button.offsetLeft + button.offsetWidth / 2 - 10;
                    var offetForTriangle;
                    if (leftOffset + popover.clientWidth > screen.availWidth) {
                        leftOffset = screen.availWidth - popover.clientWidth - 20;
                        offetForTriangle = button.offsetLeft - leftOffset + button.offsetWidth / 2;
                    } else {
                        offetForTriangle = 0;
                    }
                    popover.style.left = leftOffset + "px";
                    if (offetForTriangle < 14) {
                        offetForTriangle = 14;
                    } else {
                        if (offetForTriangle + 14 >= popover.clientWidth) {
                            offetForTriangle = popover.clientWidth - 24;
                        }
                    }
                    var css = 'left: ' + (offetForTriangle) + 'px;';
                    asc.addStyle('asc-popover:before{' + css + '}');
                    setTimeout(function () {
                        var closeBackClick = function () {
                            backdrop.remove();
                            popover.style.display = "none";
                            document.body.removeEventListener('click', closeBackClick);
                        };
                        document.body.addEventListener('click', closeBackClick);
                    }, 0);
                    document.body.appendChild(backdrop);
                });
            })(popover);
        }
    }
});