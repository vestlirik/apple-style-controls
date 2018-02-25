asc.component('demo-list', function () {
    this.templateSrc = 'demo/demo-list/template.html';
    this.list = [
        {
            name: 'Favorites',
            type: 'subheader',
            isSubheader: true,
            isItem: false
        },
        {
            name: 'Macintosh HD',
            icon: 'fa-hdd-o',
            type: 'item',
            isSubheader: false,
            isItem: true
        },
        {
            name: 'iCloud Drive',
            icon: 'fa-cloud',
            type: 'item',
            isSubheader: false,
            isItem: true
        },
        {
            name: 'Applications',
            icon: 'fa-apple',
            type: 'item',
            isSubheader: false,
            isItem: true
        },
        {
            name: 'Desktop',
            icon: 'fa-desktop',
            type: 'item',
            isSubheader: false,
            isItem: true
        },
        {
            name: 'Documents',
            icon: 'fa-file',
            type: 'item',
            isSubheader: false,
            isItem: true
        },
        {
            name: 'Devices',
            type: 'subheader',
            isSubheader: true,
            isItem: false
        },
        {
            name: 'Remote Disc',
            icon: 'fa-compass',
            type: 'item',
            isSubheader: false,
            isItem: true
        }
    ];
});