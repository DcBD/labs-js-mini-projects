export default class DataInput {
    constructor({ index, onInput, handleDelete, }) {
        this.create = () => {
            const container = document.createElement("div");
            const element = document.createElement('input');
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.addEventListener("change", (e) => {
                const target = e.target;
                this.handleDelete(this.name);
                console.log(target.checked);
            });
            container.append(element);
            container.append(checkBox);
            this.setProps(element);
            return container;
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
        this.handleDelete = handleDelete;
    }
    get name() {
        return `DYN_FIELD[${this.index}]`;
    }
}
