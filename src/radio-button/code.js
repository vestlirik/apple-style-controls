asc.component('asc-radio-group', function () {
    function init(radioGroup) {
        var groupId = asc.getUniqueId();
        for (var i = 0; i < radioGroup.childNodes.length; i++) {
            var radioGroupItem = radioGroup.childNodes[i];
            if (radioGroupItem.tagName === "ASC-RADIO-BUTTON") {
                var radioGroupItemValue = radioGroupItem.getAttribute('value');
                var radioButton = eDOM.el("input[type='radio'][value='" + radioGroupItemValue + "'][name='" + groupId + "']");
                radioButton.id = asc.getUniqueId();
                var isChecked = radioGroupItem.getAttribute('checked');
                if (isChecked !== null) {
                    radioButton.checked = true;
                }
                var label = eDOM.el("label[for='" + radioButton.id + "']");
                label.innerHTML = radioGroupItem.childNodes[0] ? radioGroupItem.childNodes[0].textContent : "";
                radioGroupItem.innerHTML = "";
                radioGroupItem.appendChild(radioButton);
                radioGroupItem.appendChild(label);
                radioGroupItem.classList.add('asc');
            }
        }
    }

    return {
        init: init
    }
});
asc.component('asc-radio-button', function () {
    function onCheckedChanged(node, value) {
        for (var i = 0; i < node.parentElement.childNodes.length; i++) {
            var radioGroupItem = node.parentElement.childNodes[i];
            if (radioGroupItem.tagName === "ASC-RADIO-BUTTON" && radioGroupItem !== node) {
                radioGroupItem.removeAttribute('checked');
            }
        }
        var inputRadioButton = node.childNodes[0];
        inputRadioButton.checked = true;
    }

    return {
        params: [
            {
                name: 'checked',
                func: onCheckedChanged
            }
        ]
    }
});