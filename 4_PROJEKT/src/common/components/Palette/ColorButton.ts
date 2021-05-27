import { Component } from "../../framework/Component";
import Icons from "../../Icons";

export default class ColorButton extends Component {

    private readonly color: string;

    public getColor = () => this.getAttributeElement<HTMLElement>('color').dataset.color;

    public readonly onClick: (color: string) => void

    constructor({ parentNode, color, onClick }: { parentNode: HTMLElement, color: string, onClick: (color: string) => void }) {

        super({
            node: document.createElement("div"),
            parentNode: parentNode,
        })
        this.color = color;
        this.onClick = onClick;

        this.update(this.generateContent());

    }





    private generateContent = (): HTMLElement => {

        console.log(this.color);
        /* #region  ROOT */
        const _root = document.createElement("div");
        _root.className = "color-picker";
        _root.addEventListener("click", this.handleClick);
        _root.style.backgroundColor = this.color;
        _root.dataset.attribute = 'color';
        _root.addEventListener("click", () => this.onClick(this.color));
        /* #endregion */



        return _root;
    }


    handleClick = (e: MouseEvent) => {
        console.log("clicked");
    }



}