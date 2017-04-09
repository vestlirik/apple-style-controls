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

assignErasers();