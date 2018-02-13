asc.component('demo', function () {
    var self = this;

    this.templateSrc = 'demo/template.html';

    this.testItems = [
        {
            name: 'Butter',
            value: 'Butter'
        },
        {
            name: 'Milk',
            value: 'Milk'
        },
        {
            name: 'Cheese',
            value: 'Cheese'
        }
    ];

    this.comboboxItems = [];
    this.init = function () {
        for (var i = 0; i < 99; i++) {
            self.comboboxItems.push({
                name: 'Item ' + i,
                value: i
            });
        }
    };

    this.editMenuItems = [
        {
            label: 'Cut',
            handler: function () {
                console.log('Cut click');
            }
        },
        {
            label: 'Copy',
            handler: function () {
                console.log('Copy click');
            }
        },
        {
            label: 'Replace...',
            handler: function () {
                console.log('Replace... click');
            }
        },
        {
            label: 'Look Up',
            handler: function () {
                console.log('Look Up click');
            }
        },
        {
            label: 'Share...',
            handler: function () {
                console.log('Share... click');
            }
        }
    ];

    this.progress = 20;

    this.setProgress = function (e, progress) {
        self.progress = progress;
    };
    this.list = [];
    setTimeout(function () {
        self.list = [
            {
                name: 'Favorites',
                type: 'subheader',
                isSubheader: true,
                isItem: false
            },
            {
                name: 'Macintosh HD',
                icon: 'fa-hdd-o',
                type: 'item',
                isSubheader: false,
                isItem: true
            },
            {
                name: 'iCloud Drive',
                icon: 'fa-cloud',
                type: 'item',
                isSubheader: false,
                isItem: true
            },
            {
                name: 'Applications',
                icon: 'fa-apple',
                type: 'item',
                isSubheader: false,
                isItem: true
            },
            {
                name: 'Desktop',
                icon: 'fa-desktop',
                type: 'item',
                isSubheader: false,
                isItem: true
            },
            {
                name: 'Documents',
                icon: 'fa-file',
                type: 'item',
                isSubheader: false,
                isItem: true
            },
            {
                name: 'Devices',
                type: 'subheader',
                isSubheader: true,
                isItem: false
            },
            {
                name: 'Remote Disc',
                icon: 'fa-compass',
                type: 'item',
                isSubheader: false,
                isItem: true
            }
        ];
    }, 5000);

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