asc.component('asc-switch', function () {
    function onCheckedChanged(node, value) {
        var inputCheckbox = node.childNodes[0];
        inputCheckbox.checked = value === "true";
    }

    function init(switchDiv) {
        var uniqueId = asc.getUniqueId();
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

    return {
        init: init,
        params: [
            {
                name: 'checked',
                func: onCheckedChanged
            }
        ]
    }
});