asc.component('asc-radio-group', function () {
    var self = this;
    this.init = function (radioGroup) {
        self.element = radioGroup;
        var groupId = asc.getUniqueId();
        var checkedValue = radioGroup.getAttribute('checked');
        for (var i = 0; i < self.element.childNodes.length; i++) {
            var radioGroupItem = self.element.childNodes[i];
            if (radioGroupItem.tagName === "ASC-RADIO-BUTTON") {
                radioGroupItem.setAttribute('name', groupId);
                radioGroupItem.classList.add('asc');
            }
        }
        selectItem(checkedValue);
    };

    function selectItem(value) {
        for (var i = 0; i < self.element.childNodes.length; i++) {
            var radioGroupItem = self.element.childNodes[i];
            if (radioGroupItem.tagName === "ASC-RADIO-BUTTON") {
                if (radioGroupItem.getAttribute('value') === value) {
                    radioGroupItem.setAttribute('checked', 'true');
                }
            }
        }
    }

    this.params = [
        {
            name: 'checked',
            func: function (node, value) {
                selectItem(value);
            }
        }
    ];
});
asc.component('asc-radio-button', function () {
    var self = this;
    this.init = function () {
        self.id = asc.getUniqueId();
    };

    this.value = "";
    this.displayText = "";
    this.name = "";

    this.afterInit = function (el) {
        var value = el.getAttribute('value');
        if (value) {
            self.value = value;
        }
        var displayText = el.getAttribute('text');
        if (displayText) {
            self.displayText = displayText;
        }
        var name = el.getAttribute('name');
        if (name) {
            self.name = name;
        }
        var checked = el.getAttribute('checked');
        if (checked) {
            var inputRadioButton = el.childNodes[0];
            if (inputRadioButton) {
                inputRadioButton.checked = checked === "true";
            }
        }
    };

    this.templateSrc = 'radio-button/radio-button-template.html';

    this.params = [
        {
            name: 'checked',
            func: function (node, value) {
                var inputRadioButton = node.childNodes[0];
                if (inputRadioButton) {
                    inputRadioButton.checked = value === "true";
                }
            }
        },
        {
            name: 'text',
            func: function (node, value) {
                if (value) {
                    self.displayText = value;
                }
            }
        },
        {
            name: 'value',
            func: function (node, value) {
                if (value) {
                    self.value = value;
                }
            }
        },
        {
            name: 'name',
            func: function (node, value) {
                if (value) {
                    self.name = value;
                }
            }
        }
    ];
});