"use strict";
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.init = function () {
        };
    }
    Object.defineProperty(Calculator.prototype, "inputFields", {
        get: function () {
            return document.querySelectorAll(".data-input-field");
        },
        enumerable: false,
        configurable: true
    });
    return Calculator;
}());
var calculator = new Calculator();
