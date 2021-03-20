import DataInput from "./DataInput.js";


class Calculator {


    generatedInputs: Array<DataInput> = [];

    constructor() {
        this.init();
    }

    init = (): void => {
        this.initEventListeners();
    }

    renderInputs = () => {

        const container = this.inputsContainer;

        this.resetInputsContainer();

        this.generatedInputs.map((input) => {
            container?.append(input.element);
        })
    }

    handleDelete = (name: string) => {
        this.generatedInputs.map((input, index) => {
            if (input.name == name) {
                input.element.remove();
                delete this.generatedInputs[index];
            }
        });

        this.refreshData();
    }

    generateInputs = () => {

        this.generatedInputs = [];

        for (let i = 0; i < this.inputsCountToGenerate; i++) {
            this.generatedInputs.push(new DataInput({
                index: i,
                handleDelete: (name: string) => this.handleDelete(name),
                onInput: () => this.refreshData()
            }));
        }

        this.renderInputs();
        this.refreshData();
    }

    get inputsCountToGenerate(): Number {
        return Number(this.inputsCountToGenerateInput?.value);
    }

    get inputsCountToGenerateInput(): HTMLInputElement | null {
        return document.querySelector("#no-inputs--settings");
    }


    resetInputsContainer = () => {
        if (this.inputsContainer !== null)
            this.inputsContainer.innerHTML = "";
    }


    get inputsContainer(): Element | null {
        return document.querySelector("#inputs-container");
    }

    initEventListeners = () => {
        this.initLoadFormButtonClickEvent();
        this.initDeleteSelectedButton();
    }


    initDeleteSelectedButton = () => {



        const delete_selected_btn = document.querySelector("#delete_selected_button");

        delete_selected_btn?.addEventListener("click", (e) => {
            const inputs = document.querySelector("#inputs-container")?.querySelectorAll("input:checked") as NodeListOf<HTMLInputElement>;;

            if (inputs !== undefined) {
                for (const input of inputs) {
                    input.parentElement?.remove();
                }
            }
        })




    }





    initLoadFormButtonClickEvent = () => {
        this.loadFormButton?.addEventListener("click", () => this.generateInputs());
    }

    refreshData = () => {

        this.updateSumValueInput();
        this.updateAvgValueInput();
        this.updateMinValueInput();
        this.updateMaxValueInput();
    }

    showError = (text: string) => {

        const errorBlock = this.errorBlock

        if (errorBlock !== null) {
            errorBlock.innerHTML = text;
        } else {
            console.error("Error block does not exist in document");
        }
    }

    get errorBlock(): HTMLDivElement | null {
        return document.querySelector("#error-block");
    }

    get inputFields(): NodeListOf<HTMLInputElement> | Array<any> {
        const inputsContainer = this.inputsContainer;
        if (this.inputsContainer !== undefined && inputsContainer !== null) {

            return inputsContainer.querySelectorAll("input[type='number']");

        }

        return [];

    }

    get sum(): Number {
        var sum = 0;
        const inputs = this.inputFields as NodeListOf<HTMLInputElement>;

        inputs.forEach((element) => {

            sum += Number(element.value);
        })

        return sum;
    }



    get loadFormButton(): Element | null {

        return document.querySelector("#load_form_button");
    }

    get avg(): Number {

        return (Number(this.sum) / this.inputFields?.length);
    }

    get sumInput(): HTMLInputElement | null {
        return document.querySelector("#sum");
    }

    get avgInput(): HTMLInputElement | null {
        return document.querySelector("#avg");
    }

    get minInput(): HTMLInputElement | null {
        return document.querySelector("#min");
    }

    get maxInput(): HTMLInputElement | null {
        return document.querySelector("#max");
    }

    get max(): Number {
        return Math.max(...this.inputValues);

    }

    get min(): Number {
        return Math.min(...this.inputValues);
    }

    get inputValues(): Array<number> {
        const inputs = this.inputFields as NodeListOf<HTMLInputElement>;
        const values: Array<number> = [];
        inputs.forEach((input) => {
            values.push(+input.value);
        });

        return values;
    }

    updateSumValueInput = () => {
        const input = this.sumInput;
        const sum = this.sum;

        if (input !== null) {
            input.value = String(sum);
        }
    }

    updateAvgValueInput = () => {
        const input = this.avgInput;
        const avg = this.avg;

        if (input !== null && !isNaN(+avg)) {
            input.value = String(avg);
        } else if (input !== null) {
            input.value = String(0);

        }
    }

    updateMinValueInput = () => {
        const input = this.minInput;
        const min = this.min;

        if (input !== null && min != Infinity && min != -Infinity) {
            input.value = String(min);
        } else if (input !== null) {
            input.value = String(0);
        }
    }

    updateMaxValueInput = () => {
        const input = this.maxInput;
        const max = this.max;

        if (input !== null && max != Infinity && max != -Infinity) {
            input.value = String(max);
        } else if (input !== null) {
            input.value = String(0);
        }
    }
}




const calculator = new Calculator();