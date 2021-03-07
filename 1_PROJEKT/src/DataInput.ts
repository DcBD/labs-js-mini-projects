

export default class DataInput{

    readonly index : String | Number | number;

    readonly element : Element;

    readonly onInput : Function;

    readonly handleDelete : Function;

    constructor({
        index,
        onInput,
        handleDelete,
    } : {index : String | Number | number, onInput : Function, handleDelete : Function}){
        
        this.index = index;
    
        this.element = this.create();

        this.onInput = onInput;

        this.handleDelete = handleDelete;


    }

    get name() : string{
        return `DYN_FIELD[${this.index}]`;
    }

    private create = () : Element => {
        const container = document.createElement("div");

        const element = document.createElement('input');
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.addEventListener("change" , (e) => {
            const target : HTMLInputElement = e.target as HTMLInputElement;

            this.handleDelete(this.name);
            console.log(target.checked);
        })

        container.append(element);
        container.append(checkBox);

    
        
        this.setProps(element);

        return container;
    }

    private setProps = (element : HTMLInputElement) => {
        element.type = "number";
        element.name = this.name;
        element.className = "form-control"; 
        element.addEventListener("input", () => this.onInput());
    }







}

