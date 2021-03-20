import DataInput from "./DataInput.js";
class Calculator {
    constructor() {
        this.generatedInputs = [];
        this.init = () => {
            this.initEventListeners();
        };
        this.renderInputs = () => {
            const container = this.inputsContainer;
            this.resetInputsContainer();
            this.generatedInputs.map((input) => {
                container === null || container === void 0 ? void 0 : container.append(input.element);
            });
        };
        this.handleDelete = (name) => {
            this.generatedInputs.map((input, index) => {
                if (input.name == name) {
                    input.element.remove();
                    delete this.generatedInputs[index];
                }
            });
            this.refreshData();
        };
        this.generateInputs = () => {
            this.generatedInputs = [];
            for (let i = 0; i < this.inputsCountToGenerate; i++) {
                this.generatedInputs.push(new DataInput({
                    index: i,
                    handleDelete: (name) => this.handleDelete(name),
                    onInput: () => this.refreshData()
                }));
            }
            this.renderInputs();
            this.refreshData();
        };
        this.resetInputsContainer = () => {
            if (this.inputsContainer !== null)
                this.inputsContainer.innerHTML = "";
        };
        this.initEventListeners = () => {
            this.initLoadFormButtonClickEvent();
            this.initDeleteSelectedButton();
        };
        this.initDeleteSelectedButton = () => {
            const delete_selected_btn = document.querySelector("#delete_selected_button");
            delete_selected_btn === null || delete_selected_btn === void 0 ? void 0 : delete_selected_btn.addEventListener("click", (e) => {
                var _a, _b;
                const inputs = (_a = document.querySelector("#inputs-container")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("input:checked");
                ;
                if (inputs !== undefined) {
                    for (const input of inputs) {
                        (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
                    }
                }
            });
        };
        this.initLoadFormButtonClickEvent = () => {
            var _a;
            (_a = this.loadFormButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.generateInputs());
        };
        this.refreshData = () => {
            this.updateSumValueInput();
            this.updateAvgValueInput();
            this.updateMinValueInput();
            this.updateMaxValueInput();
        };
        this.showError = (text) => {
            const errorBlock = this.errorBlock;
            if (errorBlock !== null) {
                errorBlock.innerHTML = text;
            }
            else {
                console.error("Error block does not exist in document");
            }
        };
        this.updateSumValueInput = () => {
            const input = this.sumInput;
            const sum = this.sum;
            if (input !== null) {
                input.value = String(sum);
            }
        };
        this.updateAvgValueInput = () => {
            const input = this.avgInput;
            const avg = this.avg;
            if (input !== null && !isNaN(+avg)) {
                input.value = String(avg);
            }
            else if (input !== null) {
                input.value = String(0);
            }
        };
        this.updateMinValueInput = () => {
            const input = this.minInput;
            const min = this.min;
            if (input !== null && min != Infinity && min != -Infinity) {
                input.value = String(min);
            }
            else if (input !== null) {
                input.value = String(0);
            }
        };
        this.updateMaxValueInput = () => {
            const input = this.maxInput;
            const max = this.max;
            if (input !== null && max != Infinity && max != -Infinity) {
                input.value = String(max);
            }
            else if (input !== null) {
                input.value = String(0);
            }
        };
        this.init();
    }
    get inputsCountToGenerate() {
        var _a;
        return Number((_a = this.inputsCountToGenerateInput) === null || _a === void 0 ? void 0 : _a.value);
    }
    get inputsCountToGenerateInput() {
        return document.querySelector("#no-inputs--settings");
    }
    get inputsContainer() {
        return document.querySelector("#inputs-container");
    }
    get errorBlock() {
        return document.querySelector("#error-block");
    }
    get inputFields() {
        const inputsContainer = this.inputsContainer;
        if (this.inputsContainer !== undefined && inputsContainer !== null) {
            return inputsContainer.querySelectorAll("input[type='number']");
        }
        return [];
    }
    get sum() {
        var sum = 0;
        const inputs = this.inputFields;
        inputs.forEach((element) => {
            sum += Number(element.value);
        });
        return sum;
    }
    get loadFormButton() {
        return document.querySelector("#load_form_button");
    }
    get avg() {
        var _a;
        return (Number(this.sum) / ((_a = this.inputFields) === null || _a === void 0 ? void 0 : _a.length));
    }
    get sumInput() {
        return document.querySelector("#sum");
    }
    get avgInput() {
        return document.querySelector("#avg");
    }
    get minInput() {
        return document.querySelector("#min");
    }
    get maxInput() {
        return document.querySelector("#max");
    }
    get max() {
        return Math.max(...this.inputValues);
    }
    get min() {
        return Math.min(...this.inputValues);
    }
    get inputValues() {
        const inputs = this.inputFields;
        const values = [];
        inputs.forEach((input) => {
            values.push(+input.value);
        });
        return values;
    }
}
const calculator = new Calculator();
