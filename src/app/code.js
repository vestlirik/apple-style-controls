asc.component('app', function () {

    this.template =
        '<button class="asc" (click)="demo()">Demo</button>\n' +
        '<button class="asc" (click)="directives()">Directives</button>\n' +
        '<asc-router class="asc"></asc-router>'
    ;
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