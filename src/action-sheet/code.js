var actionSheets = document.getElementsByTagName('asc-action-sheet');
for (var i = 0; i < actionSheets.length; i++) {
    var button = document.querySelector('button[data-id=' + actionSheets[i].id + ']');
    if (button) {
        (function (actionSheet) {
            var actionBlock = document.createElement('action-block');
            while(actionSheet.children[0]){
                actionBlock.appendChild(actionSheet.children[0]);
            }
            actionSheet.appendChild(actionBlock);

            var cancelBlock = document.createElement('action-block');
            cancelBlock.classList.add('cancel-block');
            var cancelAction = document.createElement('action');
            cancelAction.innerText = "Cancel";
            cancelBlock.appendChild(cancelAction);
            actionSheet.appendChild(cancelBlock);

            var hiddenHeight = -(actionSheet.offsetHeight) + "px";
            actionSheet.style.bottom = hiddenHeight;

            button.addEventListener('click', function () {
                var backdrop = document.createElement('asc-backdrop');
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
        })(actionSheets[i]);
    }
}