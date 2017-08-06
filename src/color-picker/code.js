function ColorPicker(element, line, colorSelector, rgbInput, hexInput) {
    this.element = element;

    this.init = function () {
        console.time('creating color picker');
        var diameter = this.element.offsetWidth;

        var canvas = document.createElement('canvas');
        canvas.height = diameter;
        canvas.width = diameter;
        this.canvas = canvas;

        var lineCanvas = document.createElement('canvas');
        lineCanvas.height = line.offsetHeight;
        lineCanvas.width = line.offsetWidth;
        this.lineCanvas = lineCanvas;
        line.appendChild(this.lineCanvas);

        var selectorCanvas = document.createElement('canvas');
        selectorCanvas.height = colorSelector.offsetHeight;
        selectorCanvas.width = colorSelector.offsetWidth;
        this.selectorCanvas = selectorCanvas;
        colorSelector.appendChild(this.selectorCanvas);

        this.renderColorMap();

        element.appendChild(canvas);

        this.setupBindings();
    };

    this.finish = function () {
        console.timeEnd('creating color picker');
        document.getElementById('color-loader').remove();
        this.lineCanvas.parentElement.children[0].style.display = "";
        document.getElementById('color-hr').style.display = 'block';
        this.canvas.dispatchEvent(new Event('click'));
    };

    this.renderColorMap = function () {
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');

        var radius = canvas.width / 2;
        var toRad = (2 * Math.PI) / 360;
        var step = 1 / radius;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var cx = cy = radius;
        for (var i = 0; i < 360; i += step) {
            var rad = i * toRad;
            var x = radius * Math.cos(rad),
                y = radius * Math.sin(rad);

            ctx.strokeStyle = 'hsl(' + i + ', 100%, 50%)';

            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.lineTo(cx + x, cy + y);
            ctx.stroke();
        }

        // draw saturation gradient
        var grd = ctx.createRadialGradient(cx, cy, 0, cx, cx, radius);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grd;
        //ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        // render the rainbow box here ----------
    };

    this.setupBindings = function () {
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        var self = this;

        canvas.addEventListener('click', function (e) {
            var x = e.offsetX || e.clientX - this.offsetLeft;
            var y = e.offsetY || e.clientY - this.offsetTop;

            var imgData = ctx.getImageData(x, y, 1, 1).data;
            // var selectedColor = new Color(imgData[0], imgData[1], imgData[2]);
            self.fillSelector(imgData[0], imgData[1], imgData[2]);

            var ctx2 = self.lineCanvas.getContext('2d');
            var grd = ctx2.createLinearGradient(0, 0, self.lineCanvas.offsetWidth, 0);
            grd.addColorStop(0, "rgb(" + imgData[0] + " ," + imgData[1] + " ," + imgData[2] + ")");
            grd.addColorStop(1, 'rgb(0, 0, 0)');
            ctx2.fillStyle = grd;
            ctx2.fillRect(0, 0, self.lineCanvas.offsetWidth, self.lineCanvas.offsetHeight);
            self.element.nextElementSibling.children[0].style.marginLeft = 0;
        }, false);

        function fillColorInput(e) {
            var x = e.offsetX || e.clientX - this.offsetLeft;
            var y = e.offsetY || e.clientY - this.offsetTop;

            var imgData = self.lineCanvas.getContext('2d').getImageData(x, y, 1, 1).data;
            // var selectedColor = new Color(imgData[0], imgData[1], imgData[2]);
            self.fillSelector(imgData[0], imgData[1], imgData[2]);

        }

        self.lineCanvas.addEventListener('click', fillColorInput, false);

        self.lineCanvas.addEventListener('mousemove', function (ev) {
            console.log('mousemove lineCanvas');
            if (self.lineCanvas.parentElement.hasAttribute('fill-on-move')) {
                fillColorInput(ev);
                console.log('fillColorInput');
            }
        });
    };

    this.fillSelector = function (r, g, b) {
        var colorCanvasContext = this.selectorCanvas.getContext('2d');
        rgbInput.value = r + ", " + g + ", " + b;
        hexInput.value = '#' + rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
        var selectedColor = "rgb(" + rgbInput.value + ")";
        colorCanvasContext.fillStyle = selectedColor;
        colorCanvasContext.fillRect(0, 0, this.selectorCanvas.offsetWidth, this.selectorCanvas.offsetHeight);
        document.getElementById('selected-color-div').value = selectedColor;
    };

    this.init();

    this.finish();
}

function rgbToHex(n) {
    var hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function showColorPicker(yesText, noText) {
    yesText = yesText || "OK";
    noText = noText || "Cancel";
    var colorPicker = document.createElement('asc-dialog');
    colorPicker.id = "sample-color-picker";

    var dialogHeader = document.createElement('asc-dialog-header');
    dialogHeader.innerText = "Color picker";

    var spinner = document.createElement('div');
    spinner.id = 'color-loader';
    spinner.classList.add('asc');
    spinner.classList.add('asc-activity-indicator');
    spinner.classList.add('absolute-center');
    var dialogContent = document.createElement('asc-content');
    dialogContent.appendChild(dialogHeader);
    dialogContent.appendChild(spinner);

    var colorCircle = document.createElement('div');
    colorCircle.classList.add('color-circle');
    colorCircle.style.width = "300px";
    colorCircle.style.cursor = "crosshair";
    dialogContent.appendChild(colorCircle);

    var colorLine = document.createElement('div');
    colorLine.classList.add('color-line');
    colorLine.style.width = "300px";
    colorLine.style.height = "50px";
    colorLine.style.cursor = "crosshair";
    colorLine.style.position = "relative";
    dialogContent.appendChild(colorLine);

    colorLine.addEventListener('click', movingColorSelector);

    var colorSelectorLine = document.createElement('div');
    colorSelectorLine.classList.add('color-selector-line');
    colorSelectorLine.style.display = "none";
    colorSelectorLine.style.position = "absolute";
    colorSelectorLine.style.width = "5px";
    colorSelectorLine.style.height = "50px";
    colorSelectorLine.style.cursor = "pointer";
    colorSelectorLine.style.background = "transparent";
    colorSelectorLine.style.border = "none";
    colorSelectorLine.style.borderLeft = "1px solid #fff";
    colorLine.appendChild(colorSelectorLine);

    function colorLinePosition() {
        if (!colorLinePosition.cached) {
            colorLinePosition.cached = document.getElementsByClassName('color-line')[0].getBoundingClientRect();
        }
        return colorLinePosition.cached;
    }

    function movingColorSelector(ev) {
        var margin = ev.x - colorLinePosition().left;
        if (margin >= 0 && margin <= 300) {
            colorSelectorLine.style.marginLeft = margin + "px";
        }
    }

    colorSelectorLine.addEventListener('mousedown', function (ev) {
        document.body.addEventListener('mouseup', function (ev) {
            console.log("mouseup");
            colorLine.removeAttribute('fill-on-move');
            document.body.removeEventListener('mousemove', movingColorSelector);
        });
        console.log("mousedown");
        colorLine.setAttribute('fill-on-move', '');
        document.body.addEventListener('mousemove', movingColorSelector, false);
    });

    var hr = document.createElement('hr');
    hr.id = 'color-hr';
    hr.style.height = "2px";
    hr.style.width = "100%";
    hr.style.border = "1px solid #949494";
    hr.style.borderBottom = "none";
    hr.style.display = "none";
    dialogContent.appendChild(hr);

    var selectedColorDetailsBlock = document.createElement('div');
    selectedColorDetailsBlock.classList.add('selected-color-details');
    selectedColorDetailsBlock.style.display = "flex";

    var colorSelector = document.createElement('div');
    colorSelector.classList.add('color-selector');
    colorSelector.style.width = "50px";
    colorSelector.style.height = "50px";
    selectedColorDetailsBlock.appendChild(colorSelector);

    var detailInputsBlock = document.createElement('div');
    detailInputsBlock.classList.add('detail-inputs-block');
    detailInputsBlock.style.display = "flex";
    detailInputsBlock.style.flex = "1";
    detailInputsBlock.style.flexDirection = "column";

    selectedColorDetailsBlock.appendChild(detailInputsBlock);

    var rgbBlock = document.createElement('div');
    rgbBlock.classList.add('rgb-input-block');
    rgbBlock.style.display = "flex";
    detailInputsBlock.appendChild(rgbBlock);

    var rgbInput = document.createElement('input');
    rgbInput.setAttribute('readonly', '');
    rgbInput.value = "0, 0, 0";
    rgbBlock.appendChild(rgbInput);

    var hexBlock = document.createElement('div');
    hexBlock.classList.add('rgb-input-block');
    hexBlock.style.display = "flex";
    detailInputsBlock.appendChild(hexBlock);

    var hexInput = document.createElement('input');
    hexInput.setAttribute('readonly', '');
    hexInput.value = "#000000";
    hexBlock.appendChild(hexInput);

    dialogContent.appendChild(selectedColorDetailsBlock);

    var selectedColorInput = document.createElement('input');
    selectedColorInput.setAttribute('hidden', '');
    selectedColorInput.id = 'selected-color-div';
    dialogContent.appendChild(selectedColorInput);

    var alertSubmit = document.createElement('asc-action-button');
    alertSubmit.innerText = yesText;
    alertSubmit.setAttribute('resolve', '');
    alertSubmit.setAttribute('return-value-id', selectedColorInput.id);
    var alertCancel = document.createElement('asc-action-button');
    alertCancel.innerText = noText;
    alertCancel.setAttribute('reject', '');
    var dialogActions = document.createElement('asc-actions');
    dialogActions.appendChild(alertCancel);
    dialogActions.appendChild(alertSubmit);
    colorPicker.appendChild(dialogContent);
    colorPicker.appendChild(dialogActions);
    document.body.appendChild(colorPicker);
    applyActivityIndicators();
    var additionalAction = function () {
        colorPicker.remove();
    };
    return showDialog(colorPicker.id, additionalAction, additionalAction, function () {
        new ColorPicker(colorCircle, colorLine, colorSelector, rgbInput, hexInput);
    });
}

function appendStyle() {
    var sheet = document.createElement('style');
    sheet.innerHTML += ".color-selector-line::before {" +
        "content: '';\n" +
        "position: absolute;\n" +
        "width: 0;\n" +
        "height: 0;\n" +
        "top: -7px;\n" +
        "left: -5px;\n" +
        "border-style: solid;\n" +
        "border-width: 7px 5px 0 5px;\n" +
        "border-color: #9e9e9e transparent transparent transparent;" +
        "}";
    sheet.innerHTML += ".color-selector-line::after {" +
        "content: '';\n" +
        "position: absolute;\n" +
        "width: 0;\n" +
        "height: 0;\n" +
        "bottom: -7px;\n" +
        "left: -5px;\n" +
        "border-style: solid;\n" +
        "border-width: 0 5px 7px 5px;\n" +
        "border-color: transparent transparent #9e9e9e transparent;" +
        "}";
    document.body.appendChild(sheet);
}

appendStyle();
