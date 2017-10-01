asc.component('asc-action-sheet', function(){
    this.init = function (actionSheet) {
        var button = document.querySelector('button[data-id=' + actionSheet.id + ']');
        if (button) {
            (function (actionSheet) {
                var actionBlock = eDOM.el('action-block');
                while (actionSheet.children[0]) {
                    actionBlock.appendChild(actionSheet.children[0]);
                }
                actionSheet.appendChild(actionBlock);

                var cancelBlock = eDOM.el('action-block');
                cancelBlock.classList.add('cancel-block');
                var cancelAction = eDOM.el('action');
                cancelAction.innerText = "Cancel";
                cancelBlock.appendChild(cancelAction);
                actionSheet.appendChild(cancelBlock);

                var hiddenHeight = -(actionSheet.offsetHeight) + "px";
                actionSheet.style.bottom = hiddenHeight;

                button.addEventListener('click', function () {
                    var backdrop = eDOM.el('asc-backdrop');
                    setTimeout(function () {
                        var closeBackClick = function () {
                            actionSheet.style.bottom = hiddenHeight;
                            backdrop.remove();
                            document.body.removeEventListener('click', closeBackClick);
                        };
                        document.body.addEventListener('click', closeBackClick);
                    }, 0);
                    document.body.appendChild(backdrop);
                    setTimeout(function () {
                        actionSheet.style.bottom = "15px";
                    }, 0);
                });
            })(actionSheet);
        }
    }
});