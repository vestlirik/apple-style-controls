(function () {
    var router = {
        currentHash: '',
        applyRoute: function () {
            router.currentHash = window.location.hash.replace("#/", '');
            router.update(router.currentHash);
        },
        update: function (hash) {

        },
        goTo: function (path) {
            window.location.hash = "/" + path;
        },
        setRouterConfig: function (config) {
            router.config = config;
            router.applyRoute();
        }
    };
    window.onhashchange = function (e) {
        router.applyRoute();
    };
    asc.component('asc-router', function () {
        var self = this;
        this.templateSrc = 'router/template.html';
        this.currentPath = "";
        this.afterInit = function (el) {
            self.element = el;
            self.currentPath = router.currentHash;
            self.updateRoute();
            router.update = function (hash) {
                self.currentPath = hash;
                self.updateRoute();
            };
        };

        this.updateRoute = function () {
            var currentRoute = router.config.find(function (value) {
                return value.path === self.currentPath
            });
            if (!currentRoute) {
                currentRoute = router.config.find(function (value) {
                    return value.path === '**'
                });
            }
            var node = document.createElement(currentRoute.component);
            node.classList.add('asc');
            while (self.element.firstChild) {
                self.element.removeChild(self.element.firstChild);
            }
            self.element.appendChild(node);
        }
    });


    /***
     * Setting router config
     * example
     * [
     *  {
     *      path: 'home',
     *      component: 'home'
     *  }
     * ]
     * @param {Array<{{string}path, {string}component}>} config
     */
    window.router = {
        setRouterConfig: function (config) {
            router.setRouterConfig(config);
        },
        goTo: function (path) {
            router.goTo(path);
        }
    };
})();