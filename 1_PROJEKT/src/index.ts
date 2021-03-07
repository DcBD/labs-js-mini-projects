import DataInput from "./DataInput.js";


class Calculator{


    generatedInputs : Array<DataInput> = [];

    constructor(){
       this.init();
    }

    init = () : void => {
        this.initEventListeners();
    }

    renderInputs = () => {



        const container = this.inputsContainer;

        this.resetInputsContainer();

        this.generatedInputs.map((input) => {
            container?.append(input.element);
        })
    }

    generateInputs = () => {
 
        this.generatedInputs = [];
 
        for(let i = 0; i < this.inputsCountToGenerate; i++){
            this.generatedInputs.push(new DataInput(i,() => this.refreshData()));
        }

        this.renderInputs();
    }

    get inputsCountToGenerate() : Number{
        return Number(this.inputsCountToGenerateInput?.value);
    }

    get inputsCountToGenerateInput(): HTMLInputElement | null {
        return document.querySelector("#no-inputs--settings");
    }

    
    resetInputsContainer = () => {
        if(this.inputsContainer !== null)
            this.inputsContainer.innerHTML = "";
    }


    get inputsContainer() : Element | null{
        return document.querySelector("#inputs-container");
    }

    initEventListeners = () => {

        this.initLoadFormButtonClickEvent();
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

    showError = (text : string) => {

        const errorBlock = this.errorBlock

        if(errorBlock !== null){
            errorBlock.innerHTML = text;
        }else{
            console.error("Error block does not exist in document");
        }
    }

    get errorBlock() : HTMLDivElement | null{
        return document.querySelector("#error-block");
    }

    get inputFields() : NodeListOf<HTMLInputElement> | Array<any> {
        const inputsContainer = this.inputsContainer;
        if(this.inputsContainer !== undefined && inputsContainer !== null){

            return inputsContainer.querySelectorAll("input[type='number']");

        }
        
        return [];

    }

    get sum() : Number{
        var sum = 0;
        const inputs = this.inputFields as NodeListOf<HTMLInputElement>;
        
        inputs.forEach((element) => {
            
            sum += Number(element.value);
        })

        return sum;
    }



    get loadFormButton() : Element | null{
 
       return document.querySelector("#load_form_button");
    }

    get avg() : Number{

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

    get max() : Number{
        return Math.max(...this.inputValues);

    }

    get min(): Number{
        return Math.min(...this.inputValues);
    }

    get inputValues() : Array<number>{
        const inputs = this.inputFields as NodeListOf<HTMLInputElement>;
        const values : Array<number> = [];
        inputs.forEach((input) => {
            values.push( +input.value);
        });

        return values;
    }

    updateSumValueInput = () => {
        const input = this.sumInput;
        const sum = this.sum;

        if(input !== null){
            input.value = String(sum);
        }
    }

    updateAvgValueInput = () => {
        const input = this.avgInput;
        const avg = this.avg;

        if(input !== null){
            input.value = String(avg);
        }
    }

    updateMinValueInput = () => {
        const input = this.minInput;
        const min = this.min;

        if(input !== null){
            input.value = String(min);
        }
    }

    updateMaxValueInput = () => {
        const input = this.maxInput;
        const max = this.max;

        if(input !== null){
            input.value = String(max);
        }
    }
}




const calculator = new Calculator();