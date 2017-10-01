asc.component('input', function(){
    this.init = function (input) {
        var label = eDOM.el('label');
        label.classList.add('asc');
        label.classList.add('asc-eraser');
        input.parentNode.insertBefore(label, input.nextSibling);
        var icon = input.attributes["icon"];
        if (icon) {
            var iconDiv = eDOM.el('span');
            iconDiv.classList.add('fa');
            iconDiv.classList.add(icon.value);
            iconDiv.style.position = "absolute";
            iconDiv.style.marginTop = "10px";
            iconDiv.style.color = "#B3B3B3";
            input.style.paddingLeft = "20px";
            input.parentNode.insertBefore(iconDiv, input);
        }
    }
});
asc.component('.asc-eraser', function(){
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