function showAlert(header, text, yesText, noText) {
    return new Promise(function (resolve, reject) {
        var alert = document.createElement('alert');
        alert.addEventListener('click', function (event) {
            if (event.target.tagName !== "ALERT-BUTTON") {
                event.stopImmediatePropagation();
            }
        });
        var alertHeader = document.createElement('alert-header');
        alertHeader.innerText = header;
        var alertText = document.createElement('alert-text');
        alertText.innerText = text;
        var alertSubmit = document.createElement('alert-button');
        alertSubmit.innerText = yesText;
        alertSubmit.addEventListener('click', function () {
            resolve();
        });
        var alertCancel = document.createElement('alert-button');
        alertCancel.innerText = noText;
        alertCancel.addEventListener('click', function () {
            reject();
        });
        var alertAnswer = document.createElement('alert-answer');
        alertAnswer.appendChild(alertCancel);
        alertAnswer.appendChild(alertSubmit);
        alert.appendChild(alertHeader);
        alert.appendChild(alertText);
        alert.appendChild(alertAnswer);

        var backdrop = document.createElement('asc-backdrop');
        setTimeout(function () {
            var closeBackClick = function () {
                alert.remove();
                backdrop.remove();
                reject();
                document.body.removeEventListener('click', closeBackClick);
            };
            document.body.addEventListener('click', closeBackClick);
        }, 0);
        document.body.appendChild(backdrop);
        document.body.appendChild(alert);
    })
}