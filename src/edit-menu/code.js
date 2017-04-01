/**
 * Hide opened edit menu
 * @param e - DOM event
 */
function hideEditMenu(e) {
    var editMenu = document.getElementById('asc-edit-menu');
    editMenu.style.display = 'none';
    removePageClickEvent();
}

/**
 * Removed click event from HTML element
 * We use HTML click for hiding menu on any click
 */
function removePageClickEvent() {
    document.getElementsByTagName('html')[0].removeEventListener('click', hideEditMenu);
}


/**
 * Open edit menu
 * @param e - DOM event
 * @param {Node} [node] - Node for calling menu (Applicable only for selected text)
 */
function editMenuClick(e, node) {
    removePageClickEvent();
    var editMenu = document.getElementById('asc-edit-menu');
    editMenu.style.display = 'flex';

    //top offset for edit menu
    var topOffset = (node || e.target).getBoundingClientRect().top - editMenu.clientHeight - 10;
    editMenu.style.top = topOffset + "px";

    //left offset for edit menu
    var leftOffset = e.clientX - editMenu.clientWidth / 2;
    //10px - minimum left offset
    if (leftOffset < 10) {
        leftOffset = 10;
    }
    if (leftOffset + editMenu.clientWidth > screen.availWidth) {
        leftOffset = screen.availWidth - editMenu.clientWidth - 20;
    }
    editMenu.style.left = leftOffset + "px";

    var offetForTriangle = (e.clientX || 0) - editMenu.offsetLeft - 5;// 5 is haft of width of triangle
    if (offetForTriangle < 5) {
        offetForTriangle = 5;
    } else {
        if (offetForTriangle + 10 + 14 >= editMenu.clientWidth) {
            offetForTriangle = editMenu.clientWidth - 10 - 14;
        }
    }
    var css = 'left: ' + (offetForTriangle) + 'px;';
    addStyleToHead('div.asc-edit-menu:after{' + css + '}');

    setTimeout(function () {
        document.getElementsByTagName('html')[0].addEventListener('click', hideEditMenu);
    }, 0);
}

/**
 * Take selected text on the page
 * And check if it is in selectable element
 * @param e - DOM mouseup event
 */
function checkSelectedText(e) {
    var selectedText = (document.all)
        ? document.selection.createRange().text
        : document.getSelection();
    if (selectedText.toString().length > 0) {
        //node of selected text
        var node = selectedText.baseNode.parentElement;
        if (node.classList.contains("asc-selectable-text")) {
            editMenuClick(e, node);
        }
    } else {
        hideEditMenu(e);
    }
}

/**
 * Add style to head section
 * @param {string} css - css which you need to add
 */
function addStyleToHead(css) {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

/**
 * Find buttons for calling edit menu
 * And add click event to them
 */
function assignMenuToButtons() {
    var buttons = document.getElementsByClassName('asc-edit-menu-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', editMenuClick);
    }
}


/**
 * Find selectable elements for calling edit menu
 * Add apply selecting to the document
 */
function applyTextSelecting() {
    var selectableItems = document.getElementsByClassName('asc-selectable-text');
    if (selectableItems.length > 0) {
        applyDetectingSelectedText();
    }
}

/**
 * Apply text selecting to the document
 */
function applyDetectingSelectedText() {
    document.onmouseup = function (e) {
        if (!e.target.classList.contains('asc-edit-menu-button')) {
            setTimeout(function () {
                checkSelectedText(e);
            }, 0);
        }
    };
}

hideEditMenu();
assignMenuToButtons();
applyTextSelecting();