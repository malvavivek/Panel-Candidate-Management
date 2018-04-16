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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flux__ = __webpack_require__(1);


const controlPanelDispatcher = new __WEBPACK_IMPORTED_MODULE_0__flux__["a" /* Dispatcher */]();
// export const getNominee = `GET_NOMINEE`;

// const getNomineeAction = (nominee) => {
//     return {
//         'type': VIEW_NOMINEE,
//         "value": nominee,
//     }
// }
$(function () {

    $("#countTable").dataTable({
        "bPaginate": true,
        "bInfo": false,
        "bFilter": false,
        "bLengthChange": false,
        "bSort": false,
        "sPaginationType": "full_numbers"
    });

    $('.first').text('').append('<i class="fa fa-angle-double-left" aria-hidden="true"></i>');
    $('.previous').text('').append('<i class="fa fa-angle-left" aria-hidden="true"></i>');
    $('.next').text('').append('<i class="fa fa-angle-right" aria-hidden="true"></i>');
    $('.last').text('').append('<i class="fa fa-angle-double-right" aria-hidden="true"></i>');

    class getNomineeStore extends __WEBPACK_IMPORTED_MODULE_0__flux__["b" /* Store */] {

        getInitialState(cb) {
            $.ajax({
                url: "http://localhost:3000/nomineeList",
                method: 'get',
                contentType: 'application/json',
                success: res => {
                    this.__state = res;
                    cb();
                }
            });
        }

        // __onDispatch(action) {
        //     switch (action.type) {
        //         case VIEW_NOMINEE:
        //             this.__state = action.value;

        //     }
        // }


    }
    const render = state => {
        const template = $('.nominee-details');
        $('.nominee-details').remove();
        let i = 1;
        state.forEach(nominee => {
            let nomineeRow = template.clone();
            nomineeRow.find('.serial-no').html(`${i++}`);
            nomineeRow.find('.nominee-name').html(`${nominee.name}`);
            nomineeRow.find('.nominated-by').html(nominee.nominatedBy);
            nomineeRow.find('.assessment-status').html(nominee.status);
            nomineeRow.appendTo('.nominee-table');
            $('.odd').hide();
        });
    };
    const nomineeStore = new getNomineeStore(controlPanelDispatcher);
    nomineeStore.addListener(state => {
        console.log('render');
        render(state);
    });
    nomineeStore.getInitialState(nominee => {
        render(nominee);
    });
    // nomineeStore.nomineeDetails();
});
// export const UPDATE_USERNAME = `UPDATE_USERNAME`;
// export const UPDATE_FONT_SIZE_PREFERENCE = `UPDATE_FONT_SIZE_PREFERENCE`;

// const userNameUpdateAction = (name)=>{
//     return {
//         type: UPDATE_USERNAME,
//         value: name
//     }
// };

// const fontSizePreferenceUpdateAction = (size)=>{
//     return {
//         type: UPDATE_FONT_SIZE_PREFERENCE,
//         value: size
//     }
// };

// document.forms.fontSizeForm.fontSize.forEach(element=>{
//     element.addEventListener("change",({target})=>{
//         controlPanelDispatcher.dispatch(fontSizePreferenceUpdateAction(target.value));
//     })
// });

// document.getElementById(`userNameInput`).addEventListener("input",({target})=>{
//     const name = target.value;
//     controlPanelDispatcher.dispatch(userNameUpdateAction(name));
// });

// class UserPrefsStore extends Store {
//     getInitialState() {
//         return localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]) : {
//             userName: "Jim",
//             fontSize: "small"
//         };
//     }
//     __onDispatch(action){
//         switch(action.type) {
//             case UPDATE_USERNAME:
//                 this.__state.userName = action.value;
//                 this.__emitChange();
//                 break;
//             case UPDATE_FONT_SIZE_PREFERENCE:
//                 this.__state.fontSize = action.value;
//                 this.__emitChange();
//                 break;
//         }
//     }
//     getUserPreferences(){
//         return this.__state;
//     }
// }

// const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);

// userPrefsStore.addListener((state)=>{
//     console.info(`Updated Store`,state);
//     render(state);
//     localStorage[`preferences`] = JSON.stringify(state);
// });

// const render = ({userName,fontSize})=>{
//     document.getElementById("userName").innerText = userName;
//     document.getElementsByClassName("container")[0].style.fontSize = fontSize === "small" ? "16px" : "24px";
//     document.forms.fontSizeForm.fontSize.value = fontSize;
// }

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dispatcher__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Dispatcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Store__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Store__["a"]; });



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Dispatcher {
    constructor() {
        this.__listeners = [];
    }
    dispatch(action) {
        this.__listeners.forEach(listener => listener(action));
    }
    register(listener) {
        this.__listeners.push(listener);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dispatcher;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Store {
    constructor(dispatcher) {
        this.__listeners = [];
        this.__state = this.getInitialState();
        dispatcher.register(this.__onDispatch.bind(this));
    }
    getInitialState() {
        throw new Error("Subclasses must override getInitialState method of a Flux Store");
    }
    __onDispatch() {
        throw new Error("Subclasses must override __onDispatch method of a Flux Store");
    }
    addListener(listener) {
        this.__listeners.push(listener);
    }
    __emitChange() {
        this.__listeners.forEach(listener => listener(this.__state));
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;


/***/ })
/******/ ]);