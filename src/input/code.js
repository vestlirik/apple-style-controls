(function () {

    /**
     * Find buttons for calling edit menu
     * And add click event to them
     */
    function assignEraser(eraser) {
        eraser.addEventListener('mousedown', eraseContent);
    }

    /**
     * Erase content from input sibling to label
     * @param e - event
     */
    function eraseContent(e) {
        e.target.previousElementSibling.value = "";
        setTimeout(function () {
            e.target.previousElementSibling.focus();
        }, 0);
    }

    function applyInput(input) {
        var label = document.createElement('label');
        label.classList.add('asc');
        label.classList.add('asc-eraser');
        input.parentNode.insertBefore(label, input.nextSibling);
        var icon = input.attributes["icon"];
        if (icon) {
            var iconDiv = document.createElement('span');
            iconDiv.classList.add('fa');
            iconDiv.classList.add(icon.value);
            iconDiv.style.position = "absolute";
            iconDiv.style.marginTop = "10px";
            iconDiv.style.color = "#B3B3B3";
            input.style.paddingLeft = "20px";
            input.parentNode.insertBefore(iconDiv, input);
        }
    }


    document.addEventListener('addedNode', function (e) {
        if (e.detail.classList.contains('asc-eraser')) {
            assignEraser(e.detail);
        } else {
            if (e.detail.tagName === "INPUT") {
                applyInput(e.detail);
            }
        }
    });

})();