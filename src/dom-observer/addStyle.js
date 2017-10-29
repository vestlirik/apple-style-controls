(function () {
    /**
     * Add style to head section
     * @param {string} css - css which you need to add
     */
    function addStyleToHead(css) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = eDOM.el('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }

    window.asc.addStyle = addStyleToHead;
})();