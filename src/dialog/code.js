(function () {

    /**
     * Show dialog
     * @param dialogId - id of showing dialog
     * @param resolveAction - additional action for resolving
     * @param rejectAction - additional action for rejecting
     * @param onOpened {Function} - event after opening dialog
     * @returns {Promise}
     */
    function showDialog(dialogId, resolveAction, rejectAction, onOpened) {
        var dialog = document.getElementById(dialogId);
        var shownAttr = document.createAttribute('shown');
        dialog.attributes.setNamedItem(shownAttr);
        return new Promise(function (resolve, reject) {
            dialog.addEventListener('click', function (event) {
                if (event.target.tagName !== "ASC-ACTION-BUTTON") {
                    event.stopImmediatePropagation();
                }
            });
            var closeDialogClick = function () {
                dialog.removeAttribute('shown');
                backdrop.remove();
                document.body.classList.remove('no-scroll');
                document.body.removeEventListener('click', bodyClick);
            };
            var bodyClick = function () {
                reject();
                if (rejectAction) {
                    rejectAction();
                }
                closeDialogClick();
            };
            for (var i = 0; i < dialog.children.length; i++) {
                if (dialog.children[i].tagName === "ASC-ACTIONS") {
                    (function (i) {
                        var actionButtons = dialog.children[i].children;
                        for (var j = 0; j < actionButtons.length; j++) {
                            (function (j) {
                                if (actionButtons[j].hasAttribute("reject")) {
                                    actionButtons[j].addEventListener('click', function () {
                                        reject();
                                        if (rejectAction) {
                                            rejectAction();
                                        }
                                        closeDialogClick();
                                    });
                                }
                                if (actionButtons[j].hasAttribute("resolve")) {
                                    actionButtons[j].addEventListener('click', function () {
                                        var resolveText;
                                        if (actionButtons[j].hasAttribute("return-value-id")) {
                                            var attr = actionButtons[j].getAttribute("return-value-id");
                                            var element = document.getElementById(attr);
                                            if (element) {
                                                var value = element.value;
                                                if (value !== undefined) {
                                                    resolveText = value;
                                                }
                                            }
                                        }
                                        resolve(resolveText);
                                        if (resolveAction) {
                                            resolveAction();
                                        }
                                        closeDialogClick();
                                    });
                                }
                            })(j);
                        }
                    })(i);
                }
            }
            setTimeout(function () {
                document.body.addEventListener('click', bodyClick);
            }, 0);
            var backdrop = eDOM.el('asc-backdrop');
            document.body.appendChild(backdrop);
            document.body.classList.add('no-scroll');
            if (onOpened) {
                setTimeout(onOpened, 50);
            }
        });
    }

    window.showDialog = showDialog;

})();