"use strict";
var Calculator = /** @class */ (function () {
    function Calculator() {
        var _this = this;
        this.init = function () {
            _this.initEventListeners();
        };
        this.initEventListeners = function () {
            _this.initDataInputsListeners();
        };
        this.initDataInputEvent = function (input) {
            input.addEventListener('input', function () { return _this.refreshData(); });
        };
        this.refreshData = function () {
            console.log("changfed");
            _this.updateSumValueInput();
            _this.updateAvgValueInput();
            _this.updateMinValueInput();
            _this.updateMaxValueInput();
        };
        this.showError = function (text) {
            var errorBlock = _this.errorBlock;
            if (errorBlock !== null) {
                errorBlock.innerHTML = text;
            }
            else {
                console.error("Error block does not exist in document");
            }
        };
        this.updateSumValueInput = function () {
            var input = _this.sumInput;
            var sum = _this.sum;
            if (input !== null) {
                input.value = String(sum);
            }
        };
        this.updateAvgValueInput = function () {
            var input = _this.avgInput;
            var avg = _this.avg;
            if (input !== null) {
                input.value = String(avg);
            }
        };
        this.updateMinValueInput = function () {
            var input = _this.minInput;
            var min = _this.min;
            if (input !== null) {
                input.value = String(min);
            }
        };
        this.updateMaxValueInput = function () {
            var input = _this.maxInput;
            var max = _this.max;
            if (input !== null) {
                input.value = String(max);
            }
        };
        this.init();
    }
    Calculator.prototype.initDataInputsListeners = function () {
        var _this = this;
        var inputs = this.inputFields;
        inputs.forEach(function (input) {
            console.log(input);
            _this.initDataInputEvent(input);
        });
    };
    Object.defineProperty(Calculator.prototype, "errorBlock", {
        get: function () {
            return document.querySelector("#error-block");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "inputFields", {
        get: function () {
            return document.querySelectorAll(".data-input-field");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "sum", {
        get: function () {
            var sum = 0;
            this.inputFields.forEach(function (element) {
                sum += Number(element.value);
            });
            return sum;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "avg", {
        get: function () {
            var _a;
            return (Number(this.sum) / ((_a = this.inputFields) === null || _a === void 0 ? void 0 : _a.length));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "sumInput", {
        get: function () {
            return document.querySelector("#sum");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "avgInput", {
        get: function () {
            return document.querySelector("#avg");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "minInput", {
        get: function () {
            return document.querySelector("#min");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "maxInput", {
        get: function () {
            return document.querySelector("#max");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "max", {
        get: function () {
            return Math.max.apply(Math, this.inputValues);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "min", {
        get: function () {
            return Math.min.apply(Math, this.inputValues);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "inputValues", {
        get: function () {
            var inputs = this.inputFields;
            var values = [];
            inputs.forEach(function (input) {
                values.push(+input.value);
            });
            return values;
        },
        enumerable: false,
        configurable: true
    });
    return Calculator;
}());
var calculator = new Calculator();
