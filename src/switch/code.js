(function () {

    function applySwitch(switchDiv) {
        var uniqueId = window.getUniqueId();
        var input = eDOM.el("input[type='checkbox']");
        input.id = uniqueId.toString();
        var checkedAttr = switchDiv.getAttribute('checked');
        if (checkedAttr) {
            input.checked = checkedAttr === "true";
        }
        switchDiv.appendChild(input);
        var label = eDOM.el("label[for='" + uniqueId.toString() + "']");
        switchDiv.appendChild(label);
    }


    document.addEventListener('addedNode', function (e) {
        if (e.detail.tagName === "ASC-SWITCH") {
            applySwitch(e.detail);
        }
    });
    document.addEventListener('nodeAttributed', function (e) {
        if (e.detail.attr === 'checked') {
            var inputCheckbox = e.detail.node.childNodes[0];
            inputCheckbox.checked = e.detail.node.getAttribute(e.detail.attr) === "true";
        }
    });

})();