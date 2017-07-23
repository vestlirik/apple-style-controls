/**
 * Find buttons for calling edit menu
 * And add click event to them
 */
function assignErasers() {
    var erasers = document.getElementsByClassName('asc-eraser');
    for (var i = 0; i < erasers.length; i++) {
        erasers[i].addEventListener('mousedown', eraseContent);
    }
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

function applyIcons() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        var icon = inputs[i].attributes["icon"];
        if (icon) {
            var iconDiv = document.createElement('span');
            iconDiv.classList.add('fa');
            iconDiv.classList.add(icon.value);
            iconDiv.style.position = "absolute";
            iconDiv.style.marginTop = "10px";
            iconDiv.style.color = "#B3B3B3";
            inputs[i].style.paddingLeft = "20px";
            inputs[i].parentNode.insertBefore(iconDiv, inputs[i]);
        }
    }
}

assignErasers();
applyIcons();