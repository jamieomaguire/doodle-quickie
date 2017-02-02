"use strict";
const drawableCanvas = (function() {

    // Canvas Class
    class CanvasObj {
        constructor(el) {
            this.el = function(elementId) {
                this.el = document.getElementById(elementId);
                return this.el;
            };
        }
    }

    // Create a new instance of CanvasObj
    let canvasObj = new CanvasObj();

    // Attach it to a <canvas> on the page
    canvasObj.el('draw');

    // Assign a height and width to the canvas element
    canvasObj.el.width = window.innerWidth;
    canvasObj.el.height = window.innerHeight - 180;

    // Grab canvas context
    canvasObj.ctx = canvasObj.el.getContext('2d');

    /** set the line setStyle
     * @param {string} cap - shape of the line cap
     * @param {int} width - with of the line
     */
    canvasObj.ctx.setStyles = function(cap, width) {
        this.lineCap = cap;
        this.lineWidth = width;
    }

    /** set the line setStyle
     * @param {string} id - element id on HTML page
     */
    const controls = {
        range: function(id) {
            this.range = document.getElementById(id);
        },
        color: function(id) {
            this.color = document.getElementById(id);
        },
        colorWrapper: function(id) {
            this.colorWrapper = document.getElementById(id);
        },
        shape: function(id) {
            this.shape = document.getElementById(id);
        },
        download: function(id) {
            this.download = document.getElementById(id);
        },
        clear: function(id) {
            this.clear = document.getElementById(id);
        }
    }

    // Assign the controls to elements
    controls.range('slider');
    controls.color('color');
    controls.colorWrapper('colorWrapper');
    controls.shape('shape');
    controls.download('download');
    controls.clear('clear');

    // Color label displays default color
    controls.colorWrapper.style.backgroundColor = controls.color.value;

    // On slider change, update the size of the brush
    controls.range.addEventListener('change', (e) => {
        canvasObj.ctx.lineWidth = e.target.value;
    });

    // On color selection, update the color of the brush
    controls.color.addEventListener('change', (e) => {
        canvasObj.ctx.strokeStyle = e.target.value;
    });

    // Dispaly the selected color on the label of the color input
    controls.color.addEventListener('change', function() {
        controls.colorWrapper.style.backgroundColor = controls.color.value;
    })

    // On shape selection, update the shape of the brush
    controls.shape.addEventListener('click', (e) => {
        e.target.checked ? canvasObj.ctx.lineCap = 'square' : canvasObj.ctx.lineCap = 'round';
    });

    // On download click, download the canvas image as a PNG
    controls.download.addEventListener('click', function() {
        function downloadCanvas(link, canvas, filename) {
            link.href = canvas.toDataURL();
            link.download = filename;
        }
        downloadCanvas(this, canvasObj.el, 'drawing');
    });

    // On clear click, reset the canvas to be empty
    controls.clear.addEventListener('click', function() {
        canvasObj.ctx.clearRect(0, 0, canvasObj.el.width, canvasObj.el.height );
    });


    // Set default values
    canvasObj.ctx.strokeStyle = 'color';
    canvasObj.ctx.lineCap = 'round';
    canvasObj.ctx.lineWidth = controls.range.value;

    // Drawing Object
    const drawing = {
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        direction: true,
        draw: function(e) {
            if (!drawing.isDrawing) return;
            canvasObj.ctx.strokeStyle = controls.color.value;
            canvasObj.ctx.lineWidth = controls.range.value;
            // start a path
            canvasObj.ctx.beginPath();
            // start from
            canvasObj.ctx.moveTo(drawing.lastX, drawing.lastY);
            // go to
            canvasObj.ctx.lineTo(e.offsetX, e.offsetY);
            canvasObj.ctx.stroke();
            [drawing.lastX, drawing.lastY] = [e.offsetX, e.offsetY];
        },
        getThis: function() {
            return this.isDrawing;
        }
    }

    // Draw function is called when mouse is moved over canvas
    canvasObj.el.addEventListener('mousedown', (e) => {
        drawing.isDrawing = true;
        [drawing.lastX, drawing.lastY] = [e.offsetX, e.offsetY];
        console.log(drawing.lastX + ' ' + drawing.lastY);
    });

    // Various events clicked and holding the mouse down whilst moving will draw
    canvasObj.el.addEventListener('mousemove', drawing.draw);

    canvasObj.el.addEventListener('mousedown', drawing.draw);

    // Releasing the mouse or moving off the canvas will cancel the drawing
    canvasObj.el.addEventListener('mouseup', () => drawing.isDrawing = false );

    canvasObj.el.addEventListener('mouseout', () => drawing.isDrawing = false);

})();
