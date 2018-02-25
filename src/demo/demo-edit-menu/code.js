asc.component('demo-edit-menu', function () {
    this.templateSrc = 'demo/demo-edit-menu/template.html';
    this.editMenuItems = [
        {
            label: 'Cut',
            handler: function () {
                console.log('Cut click');
            }
        },
        {
            label: 'Copy',
            handler: function () {
                console.log('Copy click');
            }
        },
        {
            label: 'Replace...',
            handler: function () {
                console.log('Replace... click');
            }
        },
        {
            label: 'Look Up',
            handler: function () {
                console.log('Look Up click');
            }
        },
        {
            label: 'Share...',
            handler: function () {
                console.log('Share... click');
            }
        }
    ];

});