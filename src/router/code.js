(function () {
    var router = {
        currentHash: '',
        activeRoute: null,
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
        this.activeRoute = null;

        this.updateRoute = function () {
            var newActiveRoute;
            var currentRoute = router.config.find(function (value) {
                var pathParts = value.path.split('/');
                var currentParts = self.currentPath.split('/');
                var valid = true;
                newActiveRoute = {
                    hash: '',
                    params: []
                };
                pathParts.forEach(function (part, index) {
                    if (part.indexOf(':') !== 0) {
                        if (part !== currentParts[index]) {
                            valid = false;
                        } else {
                            newActiveRoute.hash += (index !== 0 ? "/" : "") + part;
                        }
                    } else {
                        if (currentParts[index]) {
                            newActiveRoute.params.push({
                                param: part.substring(1),
                                value: currentParts[index]
                            });
                        }
                    }
                });
                return valid;
            });
            if (!currentRoute) {
                currentRoute = router.config.find(function (value) {
                    return value.path === '**'
                });
                self.updateActiveRoute(newActiveRoute);
            }
            var node = document.createElement(currentRoute.component);
            node.classList.add('asc');
            while (self.element.firstChild) {
                self.element.removeChild(self.element.firstChild);
            }
            self.element.appendChild(node);
        };

        this.updateActiveRoute = function (newActiveRoute) {
            self.activeRoute = newActiveRoute;
            router.activeRoute = self.activeRoute;
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
        },
        getActiveRoute: function () {
            return router.activeRoute;
        }
    };
})();