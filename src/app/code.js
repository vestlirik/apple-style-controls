asc.component('app', function () {

    this.templateSrc = "app/template.html";
    this.init = function () {
        window.router.setRouterConfig([
            {
                path: '',
                component: 'demo'
            },
            {
                path: 'directives',
                component: 'directives-test'
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]);
    };

    this.demo = function () {
        window.router.goTo('');
    };

    this.directives = function () {
        window.router.goTo('directives');
    };
});