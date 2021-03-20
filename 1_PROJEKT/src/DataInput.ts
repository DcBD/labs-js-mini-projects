

export default class DataInput {

    readonly index: String | Number | number;

    readonly element: Element;

    readonly onInput: Function;

    readonly handleDelete: Function;

    constructor({
        index,
        onInput,
        handleDelete,
    }: { index: String | Number | number, onInput: Function, handleDelete: Function }) {

        this.index = index;

        this.element = this.create();

        this.onInput = onInput;

        this.handleDelete = handleDelete;


    }

    get name(): string {
        return `DYN_FIELD[${this.index}]`;
    }

    private create = (): Element => {
        const container = document.createElement("div");
        container.className = "d-flex m-4";

        const element = document.createElement('input');

        const deleteButton = document.createElement("input");

        deleteButton.type = "button";
        deleteButton.className = "btn btn-danger m-1";
        deleteButton.value = "Delete";
        deleteButton.addEventListener("click", () => {
            this.handleDelete(this.name);
        })


        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.value = this.name;


        container.append(element);
        container.append(deleteButton);
        container.append(checkBox);



        this.setProps(element);

        return container;
    }

    private setProps = (element: HTMLInputElement) => {
        element.type = "number";
        element.name = this.name;
        element.className = "form-control";
        element.value = "0";
        element.addEventListener("input", () => this.onInput());
    }







}

