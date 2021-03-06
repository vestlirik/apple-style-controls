asc.component('demo-dialog', function () {
    this.templateSrc = 'demo/demo-dialog/template.html';

    this.openColorPicker = function () {
        showColorPicker().then(function (color) {
            document.getElementById('selected-color-index').style.background = color;
        }, console.log);
    };

    this.openAlert = function () {
        var header = document.getElementById('alert-header').value;
        var text = document.getElementById('alert-text').value;
        var submit = document.getElementById('alert-submit').value;
        var cancel = document.getElementById('alert-cancel').value;
        showAlert(header, text, submit, cancel).then(function () {
            document.getElementById('alert-response').innerText = 'yes';
        }, function () {
            document.getElementById('alert-response').innerText = 'no';
        });
    };

    function clearDialogInput() {
        document.getElementById('sample-dialog-input').value = '';
    }

    this.openDialog = function () {
        showDialog('sample-dialog').then(function (val) {
            document.getElementById('alert-response').innerText = val;
            clearDialogInput();
        }, clearDialogInput);
    }
});