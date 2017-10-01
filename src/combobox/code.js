asc.component('asc-combobox', function(){
    this.init = function (combobox) {
        var div = eDOM.el('div.dropdown-list');
        while (combobox.children.length) {
            var item = combobox.children[0];
            if (item.tagName === "ITEM") {
                item.innerText += item.getAttribute("text");
                div.appendChild(item);
            }
        }
        combobox.appendChild(div);
        var innerText = eDOM.el('span');
        var selectedValue = combobox.getAttribute("data-selected-value");
        if (selectedValue) {
            for (var i = 0; i < div.children.length; i++) {
                var child = div.children[i];
                if (child.getAttribute("value") === selectedValue) {
                    innerText.innerHTML = child.getAttribute("text");
                    break;
                }
            }
        }
        if (innerText.innerHTML.length === 0) {
            innerText.innerHTML = combobox.getAttribute('data-placeholder');
        }
        combobox.insertBefore(innerText, div);
        combobox.style.width = combobox.offsetWidth + "px";
        div.style.width = (combobox.offsetWidth + 14) + "px";
        var closeBackClick = function () {
            combobox.classList.remove('active');
            document.body.removeEventListener('click', closeBackClick);
        };
        combobox.addEventListener('click', function (e) {
            if (combobox.classList.contains('active')) {
                if (e.target.tagName === "ITEM") {
                    innerText.innerHTML = e.target.getAttribute("text");
                    combobox.setAttribute("data-selected-value", e.target.getAttribute("value"));
                }
                closeBackClick();
            } else {
                combobox.classList.add('active');
                setTimeout(function () {
                    document.body.addEventListener('click', closeBackClick);
                }, 0);
            }
        });
    }
});