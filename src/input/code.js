asc.component('input', function () {
    this.init = function (input) {
        if (!input.parentNode.classList.contains('input-container')) {
            var inputDiv = eDOM.el('.input-container.asc');
            input.parentNode.insertBefore(inputDiv, input.nextSibling);
            inputDiv.appendChild(input);
            var label = eDOM.el('label.asc.asc-eraser');
            inputDiv.appendChild(label);
        }
    };
    this.afterInit = function (input) {
        var icon = input.attributes["icon"];
        if (icon) {
            var iconDiv = eDOM.el('span.fa.' + icon.value);
            iconDiv.style.position = "absolute";
            iconDiv.style.marginTop = "10px";
            iconDiv.style.marginLeft = "5px";
            iconDiv.style.color = "#B3B3B3";
            input.style.textIndent = "15px";
            input.parentNode.insertBefore(iconDiv, input);
        }
    }
});
asc.component('.asc-eraser', function () {
    this.init = function (eraser) {

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

        eraser.addEventListener('mousedown', eraseContent);
    }
});