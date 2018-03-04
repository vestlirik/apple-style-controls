asc.component('asc-add-to-cart-button', function () {
    this.templateSrc = "add-to-cart-button/template.html";
    var added;
    var addButton;
    this.afterInit = function (el) {
        added = el.getElementsByClassName('added-to-card')[0];
        addButton = el.getElementsByClassName('add-to-cart-button')[0];
    };

    this.toggleButton = function () {
        added.classList.toggle('hidden');
        addButton.classList.toggle('hidden');
    }
});