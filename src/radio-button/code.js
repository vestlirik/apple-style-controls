(function () {

    function applyRadioButton(radioGroup) {
        var groupId = window.getUniqueId();
        for (var i = 0; i < radioGroup.childNodes.length; i++) {
            var radioGroupItem = radioGroup.childNodes[i];
            if (radioGroupItem.tagName === "ASC-RADIO-BUTTON") {
                var radioGroupItemValue = radioGroupItem.getAttribute('value');
                var radioButton = eDOM.el("input[type='radio'][value='" + radioGroupItemValue + "'][name='" + groupId + "']");
                radioButton.id = window.getUniqueId();
                var isChecked = radioGroupItem.getAttribute('checked');
                if (isChecked !== null) {
                    radioButton.checked = true;
                }
                var label = eDOM.el("label[for='" + radioButton.id + "']");
                label.innerHTML = radioGroupItem.childNodes[0] ? radioGroupItem.childNodes[0].textContent : "";
                radioGroupItem.innerHTML = "";
                radioGroupItem.appendChild(radioButton);
                radioGroupItem.appendChild(label);
            }
        }
    }


    document.addEventListener('addedNode', function (e) {
        if (e.detail.tagName === "ASC-RADIO-GROUP") {
            applyRadioButton(e.detail);
        }
    });

    document.addEventListener('nodeAttributed', function (e) {
        if (e.detail.attr === 'checked') {
            for (var i = 0; i < e.detail.node.parentElement.childNodes.length; i++) {
                var radioGroupItem = e.detail.node.parentElement.childNodes[i];
                if (radioGroupItem.tagName === "ASC-RADIO-BUTTON" && radioGroupItem !== e.detail.node) {
                    radioGroupItem.removeAttribute('checked');
                }
            }
            var inputRadioButton = e.detail.node.childNodes[0];
            inputRadioButton.checked = true;
        }
    });

})();