(function () {

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
            document.getElementsByClassName('color-selector-line')[0].style.display = 'block';
            var inputs = document.getElementsByClassName('rgb-input-block');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].style.display = 'flex';
            }
            this.fillColorLine(255, 255, 255);
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

        this.fillColorLine = function (r, g, b) {
            var ctx = this.lineCanvas.getContext('2d');
            var grd = ctx.createLinearGradient(0, 0, this.lineCanvas.offsetWidth, 0);
            grd.addColorStop(0, "rgb(" + r + " ," + g + " ," + b + ")");
            grd.addColorStop(1, 'rgb(0, 0, 0)');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, this.lineCanvas.offsetWidth, this.lineCanvas.offsetHeight);
            this.element.nextElementSibling.children[0].style.marginLeft = 0;
            this.fillSelector(r, g, b);
        };

        var self = this;

        function fillColorInput(e) {
            var left = this.getBoundingClientRect().left;
            var top = this.getBoundingClientRect().top;
            if (e.clientX < left || e.clientY < top || e.clientY > left + 300 || e.clientY > top + 50) {
                return;
            }
            var x = e.clientX - left;
            var y = e.clientY - top;

            var imgData = self.lineCanvas.getContext('2d').getImageData(x, y, 1, 1).data;
            self.fillSelector(imgData[0], imgData[1], imgData[2]);
        }

        this.setupBindings = function () {
            var canvas = this.canvas;
            var ctx = canvas.getContext('2d');
            var self = this;

            canvas.addEventListener('click', function (e) {
                var x = e.offsetX || e.clientX - this.offsetLeft;
                var y = e.offsetY || e.clientY - this.offsetTop;

                var imgData = ctx.getImageData(x, y, 1, 1).data;
                if (imgData[0] === 0 && imgData[1] === 0 && imgData[2] === 0) {
                    return;
                }
                // var selectedColor = new Color(imgData[0], imgData[1], imgData[2]);
                self.fillColorLine(imgData[0], imgData[1], imgData[2]);

            });

            self.lineCanvas.addEventListener('click', fillColorInput);
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
        var dialogActions = document.createElement('asc-actions');
        colorPicker.appendChild(dialogContent);
        colorPicker.appendChild(dialogActions);
        document.body.appendChild(colorPicker);
        dialogContent.appendChild(spinner);

        var colorCircle = document.createElement('div');
        colorCircle.classList.add('color-circle');
        dialogContent.appendChild(colorCircle);

        var colorLine = document.createElement('div');
        colorLine.classList.add('color-line');
        dialogContent.appendChild(colorLine);

        colorLine.addEventListener('click', movingColorSelector);

        var colorSelectorLine = document.createElement('div');
        colorSelectorLine.classList.add('color-selector-line');
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

            var clickEv = new Event('click');
            clickEv.clientX = ev.clientX;
            clickEv.clientY = ev.clientY;
            colorLine.children[1].dispatchEvent(clickEv);
        }

        colorSelectorLine.addEventListener('mousedown', function (ev) {
            document.body.addEventListener('mouseup', function (ev) {
                console.log("mouseup");
                colorLine.removeAttribute('fill-on-move');
                document.body.removeEventListener('mousemove', movingColorSelector);
            });
            console.log("mousedown");
            colorLine.setAttribute('fill-on-move', '');
            document.body.addEventListener('mousemove', movingColorSelector);
        });

        var hr = document.createElement('hr');
        hr.id = 'color-hr';
        dialogContent.appendChild(hr);

        var selectedColorDetailsBlock = document.createElement('div');
        selectedColorDetailsBlock.classList.add('selected-color-details');

        var colorSelector = document.createElement('div');
        colorSelector.classList.add('color-selector');
        selectedColorDetailsBlock.appendChild(colorSelector);

        var detailInputsBlock = document.createElement('div');
        detailInputsBlock.classList.add('detail-inputs-block');

        selectedColorDetailsBlock.appendChild(detailInputsBlock);

        var rgbBlock = document.createElement('div');
        rgbBlock.classList.add('rgb-input-block');
        detailInputsBlock.appendChild(rgbBlock);

        var rgbLabel = document.createElement('div');
        rgbLabel.classList.add('rgb-input-label');
        rgbLabel.innerHTML = "RGB: ";
        rgbBlock.appendChild(rgbLabel);

        var rgbInput = document.createElement('input');
        rgbInput.setAttribute('readonly', '');
        rgbInput.classList.add('asc');
        rgbInput.value = "0, 0, 0";
        rgbBlock.appendChild(rgbInput);

        var rgbInputCopyBtn = document.createElement('button');
        rgbInputCopyBtn.classList.add('asc');
        rgbInputCopyBtn.classList.add('asc-icon-button');
        var span = document.createElement('span');
        span.classList.add('fa');
        span.classList.add('fa-copy');
        rgbInputCopyBtn.appendChild(span);
        rgbInputCopyBtn.addEventListener('click', function () {
            rgbInput.select();
            document.execCommand("copy");
            rgbInput.selectionStart = rgbInput.selectionEnd;
        });
        rgbBlock.appendChild(rgbInputCopyBtn);

        var hexBlock = document.createElement('div');
        hexBlock.classList.add('rgb-input-block');
        detailInputsBlock.appendChild(hexBlock);

        var hexLabel = document.createElement('div');
        hexLabel.classList.add('rgb-input-label');
        hexLabel.innerHTML = "Hex: ";
        hexBlock.appendChild(hexLabel);

        var hexInput = document.createElement('input');
        hexInput.setAttribute('readonly', '');
        hexInput.classList.add('asc');
        hexInput.value = "#000000";
        hexBlock.appendChild(hexInput);

        var hexInputCopyBtn = document.createElement('button');
        hexInputCopyBtn.classList.add('asc');
        hexInputCopyBtn.classList.add('asc-icon-button');
        var hexSpan = document.createElement('span');
        hexSpan.classList.add('fa');
        hexSpan.classList.add('fa-copy');
        hexInputCopyBtn.appendChild(hexSpan);
        hexInputCopyBtn.addEventListener('click', function () {
            hexInput.select();
            document.execCommand("copy");
            hexInput.selectionStart = hexInput.selectionEnd;
        });
        hexBlock.appendChild(hexInputCopyBtn);

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
        dialogActions.appendChild(alertCancel);
        dialogActions.appendChild(alertSubmit);

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
        sheet.innerHTML += ".color-circle {" +
            "width: 300px;\n" +
            "cursor: crosshair;\n" +
            "}";
        sheet.innerHTML += ".color-line {" +
            "width: 300px;\n" +
            "height: 50px;\n" +
            "cursor: crosshair;\n" +
            "position: relative;\n" +
            "}";
        sheet.innerHTML += ".color-line[fill-on-move] {" +
            "cursor: pointer;\n" +
            "}";
        sheet.innerHTML += ".color-selector-line {" +
            "display: none;\n" +
            "position: absolute;\n" +
            "width: 5px;\n" +
            "height: 50px;\n" +
            "cursor: pointer;\n" +
            "background: transparent;\n" +
            "border-left: 1px solid #fff;\n" +
            "}";
        sheet.innerHTML += "#color-hr {" +
            "height: 2px;\n" +
            "width: 100%;\n" +
            "border: none;\n" +
            "border-top: 1px solid #949494;\n" +
            "display: none;\n" +
            "}";
        sheet.innerHTML += ".selected-color-details {" +
            "display: flex;\n" +
            "align-items: center;\n" +
            "}";
        sheet.innerHTML += ".color-selector {" +
            "height: 50px;\n" +
            "width: 50px;\n" +
            "}";
        sheet.innerHTML += ".detail-inputs-block {" +
            "display: flex;\n" +
            "flex: 1;\n" +
            "flex-direction: column;\n" +
            "}";
        sheet.innerHTML += ".rgb-input-block {" +
            "display: none;\n" +
            "align-items: center;\n" +
            "}";
        sheet.innerHTML += ".rgb-input-label {" +
            "padding: 5px;\n" +
            "flex: 1;\n" +
            "}";
        sheet.innerHTML += ".color-circle canvas, .color-line canvas, .color-selector canvas {" +
            "user-select: none;\n" +
            "}";
        document.head.appendChild(sheet);
    }

    appendStyle();

    window.showColorPicker = showColorPicker;

})();