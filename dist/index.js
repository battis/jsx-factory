(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@battis/monkey-patches"), require("@battis/typescript-tricks"));
	else if(typeof define === 'function' && define.amd)
		define(["@battis/monkey-patches", "@battis/typescript-tricks"], factory);
	else if(typeof exports === 'object')
		exports["BattisJsxFactory"] = factory(require("@battis/monkey-patches"), require("@battis/typescript-tricks"));
	else
		root["BattisJsxFactory"] = factory(root["@battis/monkey-patches"], root["@battis/typescript-tricks"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__battis_monkey_patches__, __WEBPACK_EXTERNAL_MODULE__battis_typescript_tricks__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderFragment = exports.render = exports.JSXComponent = exports.JSXFactory = void 0;
const monkey_patches_1 = __webpack_require__(/*! @battis/monkey-patches */ "@battis/monkey-patches");
Object.defineProperty(exports, "render", ({ enumerable: true, get: function () { return monkey_patches_1.render; } }));
Object.defineProperty(exports, "renderFragment", ({ enumerable: true, get: function () { return monkey_patches_1.renderFragment; } }));
const JSXFactory_1 = __importStar(__webpack_require__(/*! ./src/JSXFactory */ "./src/JSXFactory.ts"));
exports.JSXFactory = JSXFactory_1.default;
Object.defineProperty(exports, "JSXComponent", ({ enumerable: true, get: function () { return JSXFactory_1.JSXComponent; } }));
exports["default"] = JSXFactory_1.default;


/***/ }),

/***/ "./src/JSXFactory.ts":
/*!***************************!*\
  !*** ./src/JSXFactory.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.instanceOfJSXComponent = exports.JSXComponent = void 0;
const typescript_tricks_1 = __webpack_require__(/*! @battis/typescript-tricks */ "@battis/typescript-tricks");
const monkey_patches_1 = __webpack_require__(/*! @battis/monkey-patches */ "@battis/monkey-patches");
// typescript is dumb: can't have an interface with an constructor signature (wtf?)
class JSXComponent {
    constructor(properties) {
        // intentionally empty
    }
}
exports.JSXComponent = JSXComponent;
function instanceOfJSXComponent(obj) {
    return (obj instanceof JSXComponent || (obj && typeof obj["render"] === "function"));
}
exports.instanceOfJSXComponent = instanceOfJSXComponent;
class JSXFactory {
    static createElement(element, properties = {}, ...children) {
        children = monkey_patches_1._Array.flatten(children);
        children = children
            .filter((child) => !!child)
            .map((child) => {
            if (child instanceof Element) {
                return child;
            }
            else if (instanceOfJSXComponent(child)) {
                return child.render();
            }
            else if (typeof child === "function") {
                return child();
            }
            else {
                return String(child);
            }
        });
        if (typeof element == "string") {
            // HTML string
            return JSXFactory.parseElement(element, properties, children);
        }
        else if (typeof element === "function") {
            if ((0, typescript_tricks_1.isConstructor)(element)) {
                return new element(properties).render(children);
            }
            else {
                return element(properties, children);
            }
        }
        console.error({ element, properties, children });
        throw new TypeError();
    }
    static createFragment(props, ...children) {
        return children;
    }
    static elementFromSource(source) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = source;
        return () => { var _a; return (_a = wrapper.firstElementChild) === null || _a === void 0 ? void 0 : _a.cloneNode(true); };
    }
    static parseElement(tagName, attributes = {}, ...children) {
        const element = document.createElement(tagName);
        if (attributes) {
            for (const key of Object.getOwnPropertyNames(attributes)) {
                if (/^on/.test(key) && typeof attributes[key] === "function") {
                    element.addEventListener(key.replace(/^on/, "").toLowerCase(), attributes[key]);
                }
                else {
                    if (typeof attributes[key] === "boolean") {
                        element[key] = attributes[key];
                    }
                    else {
                        element.setAttribute(key, attributes[key]);
                    }
                }
            }
        }
        const recursiveAppendChild = (parent, child) => {
            if (child) {
                if (Array.isArray(child)) {
                    for (const nestedChild of child) {
                        recursiveAppendChild(parent, nestedChild);
                    }
                }
                else {
                    parent.appendChild(child.nodeType ? child : document.createTextNode(child));
                }
            }
        };
        for (const child of children) {
            recursiveAppendChild(element, child);
        }
        return element;
    }
}
exports["default"] = JSXFactory;


/***/ }),

/***/ "@battis/monkey-patches":
/*!*****************************************!*\
  !*** external "@battis/monkey-patches" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__battis_monkey_patches__;

/***/ }),

/***/ "@battis/typescript-tricks":
/*!********************************************!*\
  !*** external "@battis/typescript-tricks" ***!
  \********************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__battis_typescript_tricks__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7QUNWYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMENBQTBDLDRCQUE0QjtBQUN0RSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCLEdBQUcsY0FBYyxHQUFHLG9CQUFvQixHQUFHLGtCQUFrQjtBQUNuRix5QkFBeUIsbUJBQU8sQ0FBQyxzREFBd0I7QUFDekQsMENBQXlDLEVBQUUscUNBQXFDLG1DQUFtQyxFQUFDO0FBQ3BILGtEQUFpRCxFQUFFLHFDQUFxQywyQ0FBMkMsRUFBQztBQUNwSSxrQ0FBa0MsbUJBQU8sQ0FBQyw2Q0FBa0I7QUFDNUQsa0JBQWtCO0FBQ2xCLGdEQUErQyxFQUFFLHFDQUFxQyxxQ0FBcUMsRUFBQztBQUM1SCxrQkFBZTs7Ozs7Ozs7Ozs7QUNoQ0Y7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsOEJBQThCLEdBQUcsb0JBQW9CO0FBQ3JELDRCQUE0QixtQkFBTyxDQUFDLDREQUEyQjtBQUMvRCx5QkFBeUIsbUJBQU8sQ0FBQyxzREFBd0I7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0JBQStCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQzdGZjs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQmF0dGlzSnN4RmFjdG9yeS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4RmFjdG9yeS8uL2luZGV4LnRzIiwid2VicGFjazovL0JhdHRpc0pzeEZhY3RvcnkvLi9zcmMvSlNYRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9CYXR0aXNKc3hGYWN0b3J5L2V4dGVybmFsIHVtZCBcIkBiYXR0aXMvbW9ua2V5LXBhdGNoZXNcIiIsIndlYnBhY2s6Ly9CYXR0aXNKc3hGYWN0b3J5L2V4dGVybmFsIHVtZCBcIkBiYXR0aXMvdHlwZXNjcmlwdC10cmlja3NcIiIsIndlYnBhY2s6Ly9CYXR0aXNKc3hGYWN0b3J5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0JhdHRpc0pzeEZhY3Rvcnkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9CYXR0aXNKc3hGYWN0b3J5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9CYXR0aXNKc3hGYWN0b3J5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJAYmF0dGlzL21vbmtleS1wYXRjaGVzXCIpLCByZXF1aXJlKFwiQGJhdHRpcy90eXBlc2NyaXB0LXRyaWNrc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJAYmF0dGlzL21vbmtleS1wYXRjaGVzXCIsIFwiQGJhdHRpcy90eXBlc2NyaXB0LXRyaWNrc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJCYXR0aXNKc3hGYWN0b3J5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiQGJhdHRpcy9tb25rZXktcGF0Y2hlc1wiKSwgcmVxdWlyZShcIkBiYXR0aXMvdHlwZXNjcmlwdC10cmlja3NcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJhdHRpc0pzeEZhY3RvcnlcIl0gPSBmYWN0b3J5KHJvb3RbXCJAYmF0dGlzL21vbmtleS1wYXRjaGVzXCJdLCByb290W1wiQGJhdHRpcy90eXBlc2NyaXB0LXRyaWNrc1wiXSk7XG59KShzZWxmLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYmF0dGlzX21vbmtleV9wYXRjaGVzX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX2JhdHRpc190eXBlc2NyaXB0X3RyaWNrc19fKSA9PiB7XG5yZXR1cm4gIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVuZGVyRnJhZ21lbnQgPSBleHBvcnRzLnJlbmRlciA9IGV4cG9ydHMuSlNYQ29tcG9uZW50ID0gZXhwb3J0cy5KU1hGYWN0b3J5ID0gdm9pZCAwO1xuY29uc3QgbW9ua2V5X3BhdGNoZXNfMSA9IHJlcXVpcmUoXCJAYmF0dGlzL21vbmtleS1wYXRjaGVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmVuZGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtb25rZXlfcGF0Y2hlc18xLnJlbmRlcjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJlbmRlckZyYWdtZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtb25rZXlfcGF0Y2hlc18xLnJlbmRlckZyYWdtZW50OyB9IH0pO1xuY29uc3QgSlNYRmFjdG9yeV8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9KU1hGYWN0b3J5XCIpKTtcbmV4cG9ydHMuSlNYRmFjdG9yeSA9IEpTWEZhY3RvcnlfMS5kZWZhdWx0O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSlNYQ29tcG9uZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBKU1hGYWN0b3J5XzEuSlNYQ29tcG9uZW50OyB9IH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gSlNYRmFjdG9yeV8xLmRlZmF1bHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5zdGFuY2VPZkpTWENvbXBvbmVudCA9IGV4cG9ydHMuSlNYQ29tcG9uZW50ID0gdm9pZCAwO1xuY29uc3QgdHlwZXNjcmlwdF90cmlja3NfMSA9IHJlcXVpcmUoXCJAYmF0dGlzL3R5cGVzY3JpcHQtdHJpY2tzXCIpO1xuY29uc3QgbW9ua2V5X3BhdGNoZXNfMSA9IHJlcXVpcmUoXCJAYmF0dGlzL21vbmtleS1wYXRjaGVzXCIpO1xuLy8gdHlwZXNjcmlwdCBpcyBkdW1iOiBjYW4ndCBoYXZlIGFuIGludGVyZmFjZSB3aXRoIGFuIGNvbnN0cnVjdG9yIHNpZ25hdHVyZSAod3RmPylcbmNsYXNzIEpTWENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcGVydGllcykge1xuICAgICAgICAvLyBpbnRlbnRpb25hbGx5IGVtcHR5XG4gICAgfVxufVxuZXhwb3J0cy5KU1hDb21wb25lbnQgPSBKU1hDb21wb25lbnQ7XG5mdW5jdGlvbiBpbnN0YW5jZU9mSlNYQ29tcG9uZW50KG9iaikge1xuICAgIHJldHVybiAob2JqIGluc3RhbmNlb2YgSlNYQ29tcG9uZW50IHx8IChvYmogJiYgdHlwZW9mIG9ialtcInJlbmRlclwiXSA9PT0gXCJmdW5jdGlvblwiKSk7XG59XG5leHBvcnRzLmluc3RhbmNlT2ZKU1hDb21wb25lbnQgPSBpbnN0YW5jZU9mSlNYQ29tcG9uZW50O1xuY2xhc3MgSlNYRmFjdG9yeSB7XG4gICAgc3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudCwgcHJvcGVydGllcyA9IHt9LCAuLi5jaGlsZHJlbikge1xuICAgICAgICBjaGlsZHJlbiA9IG1vbmtleV9wYXRjaGVzXzEuX0FycmF5LmZsYXR0ZW4oY2hpbGRyZW4pO1xuICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuXG4gICAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gISFjaGlsZClcbiAgICAgICAgICAgIC5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5zdGFuY2VPZkpTWENvbXBvbmVudChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQucmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLy8gSFRNTCBzdHJpbmdcbiAgICAgICAgICAgIHJldHVybiBKU1hGYWN0b3J5LnBhcnNlRWxlbWVudChlbGVtZW50LCBwcm9wZXJ0aWVzLCBjaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgaWYgKCgwLCB0eXBlc2NyaXB0X3RyaWNrc18xLmlzQ29uc3RydWN0b3IpKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBlbGVtZW50KHByb3BlcnRpZXMpLnJlbmRlcihjaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudChwcm9wZXJ0aWVzLCBjaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcih7IGVsZW1lbnQsIHByb3BlcnRpZXMsIGNoaWxkcmVuIH0pO1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVGcmFnbWVudChwcm9wcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cbiAgICBzdGF0aWMgZWxlbWVudEZyb21Tb3VyY2Uoc291cmNlKSB7XG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB3cmFwcGVyLmlubmVySFRNTCA9IHNvdXJjZTtcbiAgICAgICAgcmV0dXJuICgpID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsb25lTm9kZSh0cnVlKTsgfTtcbiAgICB9XG4gICAgc3RhdGljIHBhcnNlRWxlbWVudCh0YWdOYW1lLCBhdHRyaWJ1dGVzID0ge30sIC4uLmNoaWxkcmVuKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICBpZiAoL15vbi8udGVzdChrZXkpICYmIHR5cGVvZiBhdHRyaWJ1dGVzW2tleV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoa2V5LnJlcGxhY2UoL15vbi8sIFwiXCIpLnRvTG93ZXJDYXNlKCksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXNba2V5XSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWN1cnNpdmVBcHBlbmRDaGlsZCA9IChwYXJlbnQsIGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXN0ZWRDaGlsZCBvZiBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjdXJzaXZlQXBwZW5kQ2hpbGQocGFyZW50LCBuZXN0ZWRDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZC5ub2RlVHlwZSA/IGNoaWxkIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHJlY3Vyc2l2ZUFwcGVuZENoaWxkKGVsZW1lbnQsIGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBKU1hGYWN0b3J5O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX19iYXR0aXNfbW9ua2V5X3BhdGNoZXNfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX2JhdHRpc190eXBlc2NyaXB0X3RyaWNrc19fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9