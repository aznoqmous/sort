/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sort */ \"./src/sort.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', ()=>{\r\n    new _sort__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.querySelector('.list'))\r\n})\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sort.js":
/*!*********************!*\
  !*** ./src/sort.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sort; });\nclass Sort {\r\n    constructor(container) {\r\n        this.container = container\r\n\r\n        this.container.style.userSelect = 'none'\r\n\r\n        this.currentTarget = null\r\n\r\n        this.init()\r\n        this.bind()\r\n    }\r\n\r\n    init() {\r\n        this.elements = [...this.container.children]\r\n    }\r\n\r\n    bind() {\r\n        let move = (e)=>{\r\n            this.move(e, this.currentTarget)\r\n        }\r\n\r\n        let mouseup = ()=>{\r\n            this.currentTarget = null\r\n            this.container.removeEventListener('mousemove', move)\r\n            document.body.removeEventListener('mouseup', mouseup)\r\n            this.applyMove()\r\n        }\r\n\r\n        this.elements.map(el => {\r\n            el.addEventListener('mousedown', (e) => {\r\n                this.currentTarget = el\r\n                this.initialPos = e.currentTarget.getBoundingClientRect()\r\n                this.initialCursorPos = {x: e.pageX, y: e.pageY}\r\n\r\n                this.container.addEventListener('mousemove', move)\r\n                document.body.addEventListener('mouseup', mouseup)\r\n            })\r\n        })\r\n\r\n    }\r\n\r\n    move(e, el) {\r\n        let currentCursorPos = {x: e.pageX, y: e.pageY}\r\n        let cursorDiff = {x: currentCursorPos.x - this.initialCursorPos.x, y: currentCursorPos.y - this.initialCursorPos.y}\r\n        el.style.transform = `translate(${cursorDiff.x}px, ${cursorDiff.y}px)`\r\n        el.transformedX = cursorDiff.x\r\n        el.transformedY = cursorDiff.y\r\n        el.style.zIndex = 10000\r\n    }\r\n\r\n    applyMove() {\r\n        this.elements = this.elements.sort((a, b) => {\r\n            let ay = a.getBoundingClientRect().y\r\n            if(a.transformedY) ay += a.transformedY\r\n            let by = b.getBoundingClientRect().y\r\n            if(b.transformedY) by += b.transformedY\r\n            return (ay > by) ? 1 : -1;\r\n        })\r\n        this.container.innerHTML = ''\r\n        this.elements.map(el => {\r\n            el.style.transform = ''\r\n            this.container.appendChild(el)\r\n        })\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/sort.js?");

/***/ })

/******/ });