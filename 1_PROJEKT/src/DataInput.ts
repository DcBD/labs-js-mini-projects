

export default class DataInput{

    readonly index : String | Number | number;

    readonly element : HTMLInputElement;

    readonly onInput : Function;

    constructor(index : String | Number | number, onInput: Function){
        
        this.index = index;
    
        this.element = this.create();

        this.onInput = onInput;
    }

    get name() : string{
        return `DYN_FIELD[${this.index}]`;
    }

    private create = () : HTMLInputElement => {
        const element = document.createElement('input');

        this.setProps(element);

        return element;
    }

    private setProps = (element : HTMLInputElement) => {
        element.type = "number";
        element.name = this.name;
        element.className = "form-control"; 
        element.addEventListener("input", () => this.onInput());
    }







}

