import ComponentBase from "./ComponentBase"
import ComponentChild from "./ComponentChild";
import ComponentOptions from "./ComponentOptions";
import { v4 as uuidv4 } from 'uuid';



export class Component implements ComponentBase {

    public readonly tagName: keyof HTMLElementTagNameMap;

    public content: string;

    public readonly key: string;

    public children?: Array<ComponentChild>

    public className: string;

    protected readonly node: HTMLElement

    private readonly _parentNode: HTMLElement

    getNode = () => this.node;

    getElementTagName = () => this.tagName;

    getDomNode = () => document.querySelector(`[data-key="${this.key}"]`) as HTMLElement;

    getAttributeElement = <T extends Element>(attribute: string): T => this.node.querySelector<T>(`[data-attribute="${attribute}"]`);


    constructor({
        parentNode,
        node
    }: ComponentOptions, children?: Array<ComponentChild>) {

        this._parentNode = parentNode;
        this.children = children;
        this.key = uuidv4();

        this.node = node ? node : document.createElement("div");
        this.initNode();

        this.render();
    }

    protected initNode = () => {
        const node = this.getNode();

        node.dataset.key = this.key;
    }


    destroy = () => { this.getDomNode().remove(); }




    update = (content: HTMLElement) => {
        const domNode = this.getDomNode();

        if (domNode) {
            domNode.innerHTML = "";
            domNode.append(content);
        } else {
            this.node.innerHTML = "";
            this.node.append(content);
        }

    }

    render = () => {

        this.children?.map(child => new child.ComponentName({ parentNode: this._parentNode, ...child.props }))

        this._parentNode.append(this.getNode());
    }
}