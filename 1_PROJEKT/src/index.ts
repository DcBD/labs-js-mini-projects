

class Calculator{



    constructor(){
       this.init();
    }

    init = () : void => {
        this.initEventListeners();
    }

    initEventListeners = () => {
        this.initDataInputsListeners();
    }

    initDataInputsListeners(){
        const inputs = this.inputFields;

        inputs.forEach((input) => {
            console.log(input);
            this.initDataInputEvent(input);
        });
    } 

    initDataInputEvent = (input : HTMLInputElement) => {
        input.addEventListener('input', () => this.refreshData());
    }

    refreshData = () => {
        console.log("changfed");

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

    get inputFields() : NodeListOf<HTMLInputElement> {
        return document.querySelectorAll(".data-input-field");
    }

    get sum() : Number{
        var sum = 0;

        this.inputFields.forEach((element) => {
            
            sum += Number(element.value);
        })

        return sum;
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
        const inputs = this.inputFields;
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