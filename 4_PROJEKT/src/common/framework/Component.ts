import ComponentBase from "./ComponentBase"
import ComponentChild from "./ComponentChild";
import ComponentOptions from "./ComponentOptions";


export class Component implements ComponentBase {

    public readonly tagName: keyof HTMLElementTagNameMap;

    public content: string;

    public readonly key: string;

    public children?: Array<ComponentChild>

    public className: string;

    private readonly _node: HTMLElement

    private readonly _parentNode: HTMLElement

    getNode = () => this._node;

    getElementTagName = () => this.tagName;

    getDomNode = () => document.querySelector(`[data-key="${this.key}"]`) as HTMLElement;



    constructor(tagName: keyof HTMLElementTagNameMap, {
        className,
        key,
        parentNode,
        content
    }: ComponentOptions, children?: Array<ComponentChild>) {
        this.tagName = tagName;
        this.className = className;
        this.key = key;
        this._parentNode = parentNode;
        this.children = children;
        this.content = content;

        this._node = document.createElement(tagName);
        this.initNode();

        this.render();
    }

    protected initNode = () => {
        const node = this.getNode();

        node.dataset.key = this.key;

        if (undefined !== this.className) {
            node.className = this.className;
        }
        if (this.content) { node.innerHTML = this.content; }


    }


    destroy = () => { this.getDomNode().remove(); }



    render = () => {

        this.children?.map(child => new child.ComponentName(child.tagName, {
            ...child.options,
            parentNode: this._parentNode,
        }))

        this._parentNode.append(this.getNode());
    }
}