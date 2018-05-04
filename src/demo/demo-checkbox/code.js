asc.component('demo-checkbox', function () {
    this.templateSrc = 'demo/demo-checkbox/template.html';
    this.testItems = [
        {
            label: 'Butter',
            checked: false
        },
        {
            label: 'Milk',
            checked: true
        },
        {
            label: 'Cheese',
            checked: false
        }
    ];

    this.checkedChange = function (e, data) {
        debugger;
    }
});