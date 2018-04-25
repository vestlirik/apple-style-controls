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
        }
    }



    function addComponentToList(arr, name, object) {
        var obj = new object();
        if(obj.templateSrc && !obj.lazyTemplate){
            window.asc.getLocalFile(obj.templateSrc).then(function (template) {
                object._loadedTemplate = template;
            });
        }
        arr.push({
            name: name,
            obj: object
        });
    }

    window.asc.component = createComponent;
})();