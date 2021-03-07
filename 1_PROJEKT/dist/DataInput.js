export default class DataInput {
    constructor(index, onInput) {
        this.create = () => {
            const element = document.createElement('input');
            this.setProps(element);
            return element;
        };
        this.setProps = (element) => {
            element.type = "number";
            element.name = this.name;
            element.className = "form-control";
            element.addEventListener("input", () => this.onInput());
        };
        this.index = index;
        this.element = this.create();
        this.onInput = onInput;
    }
    get name() {
        return `DYN_FIELD[${this.index}]`;
    }
}
