asc.component('app', function () {
    var self = this;
    this.templateSrc = 'app/template.html';
    this.menuList = [
        {
            path: 'button',
            name: 'Button',
            component: 'demo-button'
        },
        {
            path: 'switch',
            name: 'Toggle button',
            component: 'demo-switch'
        },
        {
            path: 'radio',
            name: 'Radio button',
            component: 'demo-radio'
        },
        {
            path: 'checkbox',
            name: 'Checkbox',
            component: 'demo-checkbox'
        },
        {
            path: 'edit-menu',
            name: 'Edit menu',
            component: 'demo-edit-menu'
        },
        {
            path: 'activity-indicator',
            name: 'Activity indicator',
            component: 'demo-activity-indicator'
        },
        {
            path: 'segmented-controls',
            name: 'Segmented controls',
            component: 'demo-segmented-controls'
        },
        {
            path: 'input',
            name: 'Input',
            component: 'demo-input'
        },
        {
            path: 'tab-bar',
            name: 'Tab bar',
            component: 'demo-tab-bar'
        },
        {
            path: 'toolbar',
            name: 'Toolbar',
            component: 'demo-toolbar'
        },
        {
            path: 'action-sheet',
            name: 'Action sheet',
            component: 'demo-action-sheet'
        },
        {
            path: 'popover',
            name: 'Popover',
            component: 'demo-popover'
        },
        {
            path: 'combobox',
            name: 'Combobox',
            component: 'demo-combobox'
        },
        {
            path: 'list',
            name: 'List',
            component: 'demo-list'
        },
        {
            path: 'dialog',
            name: 'Dialog',
            component: 'demo-dialog'
        }
    ];
    this.init = function () {
        var routes = [{
            path: '',
            component: 'demo'
        }];
        self.menuList.forEach(function (route) {
            routes.push({
                path: route.path,
                component: route.component
            });
        });
        routes.push({
            path: '**',
            redirectTo: ''
        });
        window.router.setRouterConfig(routes);
    };

    this.goTo = function (e, link) {
        window.router.goTo(link);
    };

    this.gitHubPage = function () {
        window.open('https://github.com/vestlirik/apple-style-controls', '_blank');
    };
});