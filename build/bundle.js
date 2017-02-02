/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var drawableCanvas = function () {

	    // Canvas Class
	    var CanvasObj = function CanvasObj(el) {
	        _classCallCheck(this, CanvasObj);

	        this.el = function (elementId) {
	            this.el = document.getElementById(elementId);
	            return this.el;
	        };
	    };

	    // Create a new instance of CanvasObj


	    var canvasObj = new CanvasObj();

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
	    canvasObj.ctx.setStyles = function (cap, width) {
	        this.lineCap = cap;
	        this.lineWidth = width;
	    };

	    /** set the line setStyle
	     * @param {string} id - element id on HTML page
	     */
	    var controls = {
	        range: function range(id) {
	            this.range = document.getElementById(id);
	        },
	        color: function color(id) {
	            this.color = document.getElementById(id);
	        },
	        colorWrapper: function colorWrapper(id) {
	            this.colorWrapper = document.getElementById(id);
	        },
	        shape: function shape(id) {
	            this.shape = document.getElementById(id);
	        },
	        download: function download(id) {
	            this.download = document.getElementById(id);
	        },
	        clear: function clear(id) {
	            this.clear = document.getElementById(id);
	        }
	    };

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
	    controls.range.addEventListener('change', function (e) {
	        canvasObj.ctx.lineWidth = e.target.value;
	    });

	    // On color selection, update the color of the brush
	    controls.color.addEventListener('change', function (e) {
	        canvasObj.ctx.strokeStyle = e.target.value;
	    });

	    // Dispaly the selected color on the label of the color input
	    controls.color.addEventListener('change', function () {
	        controls.colorWrapper.style.backgroundColor = controls.color.value;
	    });

	    // On shape selection, update the shape of the brush
	    controls.shape.addEventListener('click', function (e) {
	        e.target.checked ? canvasObj.ctx.lineCap = 'square' : canvasObj.ctx.lineCap = 'round';
	    });

	    // On download click, download the canvas image as a PNG
	    controls.download.addEventListener('click', function () {
	        function downloadCanvas(link, canvas, filename) {
	            link.href = canvas.toDataURL();
	            link.download = filename;
	        }
	        downloadCanvas(this, canvasObj.el, 'drawing');
	    });

	    // On clear click, reset the canvas to be empty
	    controls.clear.addEventListener('click', function () {
	        canvasObj.ctx.clearRect(0, 0, canvasObj.el.width, canvasObj.el.height);
	    });

	    // Set default values
	    canvasObj.ctx.strokeStyle = 'color';
	    canvasObj.ctx.lineCap = 'round';
	    canvasObj.ctx.lineWidth = controls.range.value;

	    // Drawing Object
	    var drawing = {
	        isDrawing: false,
	        lastX: 0,
	        lastY: 0,
	        direction: true,
	        draw: function draw(e) {
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
	            var _ref = [e.offsetX, e.offsetY];
	            drawing.lastX = _ref[0];
	            drawing.lastY = _ref[1];
	        },
	        getThis: function getThis() {
	            return this.isDrawing;
	        }
	    };

	    // Draw function is called when mouse is moved over canvas
	    canvasObj.el.addEventListener('mousedown', function (e) {
	        drawing.isDrawing = true;
	        var _ref2 = [e.offsetX, e.offsetY];
	        drawing.lastX = _ref2[0];
	        drawing.lastY = _ref2[1];

	        console.log(drawing.lastX + ' ' + drawing.lastY);
	    });

	    // Various events clicked and holding the mouse down whilst moving will draw
	    canvasObj.el.addEventListener('mousemove', drawing.draw);

	    canvasObj.el.addEventListener('mousedown', drawing.draw);

	    // Releasing the mouse or moving off the canvas will cancel the drawing
	    canvasObj.el.addEventListener('mouseup', function () {
	        return drawing.isDrawing = false;
	    });

	    canvasObj.el.addEventListener('mouseout', function () {
	        return drawing.isDrawing = false;
	    });
	}();

/***/ }
/******/ ]);