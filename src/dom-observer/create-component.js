(function () {
    /**
     * Adding component to app
     * @param {string} selector - selector of component (#*, .*, *)
     * @param {Object | function} componentObject - object for component registration
     * @param {function} componentObject.init - initialization function
     */
    function createComponent(selector, componentObject) {
        if (selector.length > 0) {
            var firstLetter = selector[0];
            var array = window.asc._registrationList.tag;
            var addName = selector;
            switch (firstLetter) {
                case '#':
                    array = window.asc._registrationList.id;
                    addName = selector.substring(1);
                    break;
                case '.':
                    array = window.asc._registrationList.classes;
                    addName = selector.substring(1);
                    break;
                case '[':
                    array = window.asc._registrationList.attr;
                    addName = selector.substring(1, selector.length - 1);
                    break;
            }
            addComponentToList(array, addName, componentObject);
            debugger;
        }
    }



    function addComponentToList(arr, name, object) {
        arr.push({
            name: name,
            obj: object
        });
    }

    window.asc.component = createComponent;
})();