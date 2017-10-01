(function () {
    var menu;
    asc.component('#asc-edit-menu', function(){
        this.init = function (m) {
            menu = m;
        }
    });
    /**
     * Apply text selecting to the document
     */
    asc.component('.asc-selectable-text', function(){
        this.init = function () {
            document.addEventListener('mouseup', function (e) {
                if (!e.target.classList.contains('asc-edit-menu-button')) {
                    setTimeout(function () {
                        checkSelectedText(e);
                    }, 0);
                }
            });
        }
    });
    /**
     * Find buttons for calling edit menu
     * And add click event to them
     */
    asc.component('.asc-edit-menu-button', function(){
        this.init = function (button) {
            button.addEventListener('click', editMenuClick);
        }
    });

    /**
     * Hide opened edit menu
     * @param e - DOM event
     */
    function hideEditMenu() {
        menu.style.display = 'none';
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
        menu.style.display = 'flex';

        //top offset for edit menu
        var topOffset = (node || e.target).getBoundingClientRect().top - menu.clientHeight - 10;
        menu.style.top = topOffset + "px";

        //left offset for edit menu
        var leftOffset = e.clientX - menu.clientWidth / 2;
        //10px - minimum left offset
        if (leftOffset < 10) {
            leftOffset = 10;
        }
        if (leftOffset + menu.clientWidth > screen.availWidth) {
            leftOffset = screen.availWidth - menu.clientWidth - 20;
        }
        menu.style.left = leftOffset + "px";

        var offetForTriangle = (e.clientX || 0) - menu.offsetLeft - 5;// 5 is haft of width of triangle
        if (offetForTriangle < 5) {
            offetForTriangle = 5;
        } else {
            if (offetForTriangle + 10 + 14 >= menu.clientWidth) {
                offetForTriangle = menu.clientWidth - 10 - 14;
            }
        }
        var css = 'left: ' + (offetForTriangle) + 'px;';
        asc.addStyle('div.asc-edit-menu:after{' + css + '}');

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

})();