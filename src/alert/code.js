function showAlert(header, text, yesText, noText) {
    var alert = document.createElement('asc-dialog');
    alert.id = "sample-alert";
    var dialogHeader = document.createElement('asc-dialog-header');
    dialogHeader.innerText = header;
    var dialogText = document.createElement('asc-dialog-text');
    dialogText.innerText = text;
    var dialogContent = document.createElement('asc-content');
    dialogContent.appendChild(dialogHeader);
    dialogContent.appendChild(dialogText);

    var alertSubmit = document.createElement('asc-action-button');
    alertSubmit.innerText = yesText;
    var resolveAttr = document.createAttribute('resolve');
    alertSubmit.attributes.setNamedItem(resolveAttr);
    var alertCancel = document.createElement('asc-action-button');
    alertCancel.innerText = noText;
    var rejectAttr = document.createAttribute('reject');
    alertCancel.attributes.setNamedItem(rejectAttr);
    var dialogActions = document.createElement('asc-actions');
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