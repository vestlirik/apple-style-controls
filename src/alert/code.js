(function () {
    function showAlert(header, text, yesText, noText) {
        var alert = eDOM.el('asc-dialog#sample-alert');
        var dialogHeader = eDOM.el('asc-dialog-header');
        dialogHeader.innerText = header;
        var dialogText = eDOM.el('asc-dialog-text');
        dialogText.innerText = text;
        var dialogContent = eDOM.el('asc-content');
        dialogContent.appendChild(dialogHeader);
        dialogContent.appendChild(dialogText);

        var alertSubmit = eDOM.el('asc-action-button[resolve]');
        alertSubmit.innerText = yesText;
        var alertCancel = eDOM.el('asc-action-button[reject]');
        alertCancel.innerText = noText;
        var dialogActions = eDOM.el('asc-actions');
        dialogActions.appendChild(alertCancel);
        dialogActions.appendChild(alertSubmit);
        alert.appendChild(dialogContent);
        alert.appendChild(dialogActions);
        document.body.appendChild(alert);
        var additionalAction = function () {
            alert.remove();
        };
        return showDialog(alert.id, additionalAction, additionalAction);
    }

    window.showAlert = showAlert;
})();