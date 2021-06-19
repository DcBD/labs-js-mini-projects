import { Component } from "../../framework/Component";
import Icons from "../../misc/Icons";
import ColorButton from "./ColorButton";

export default class Pallette extends Component {

    public getTitle = () => this.getAttributeElement<HTMLInputElement>("title").value
    public getText = () => this.getAttributeElement<HTMLTextAreaElement>("text").value

    public colors = ['white', '#ff9494', '#baffba', '#b1e2ff', '#ffd2b1', '#f5ffb1']
    public isToggled = true;
    public color: string = "white"
    public setColor: (color: string) => void

    constructor({ parentNode, setColor }: { parentNode: HTMLElement, setColor: (color: string) => void }) {

        super({
            node: document.createElement("div"),
            parentNode: parentNode,
        })

        this.setColor = setColor;
        this.update(this.generateContent());

    }



    public toggle = (show: boolean = true) => {

        const palette = this.getNode().querySelector('.palette');
        const classes = palette.className.replace(/hidden/, "");

        if (show) {
            palette.className = classes + " hidden";
        } else {
            palette.className = classes;
        }

        this.isToggled = show;
    }

    private handleSelectColor = (color: string) => {
        this.color = color;
        this.toggle(true);
        this.setColor(color);
    }

    private generateContent = (): HTMLElement => {

        this.getNode().style.width = "50px";

        /* #region  ROOT */
        const _root = document.createElement("div");
        _root.style.width = "50px"

        /* #endregion */

        /* #region  BUTTON */
        const _showPalletteBtn = document.createElement("div");
        _showPalletteBtn.className = "action-btn"
        _showPalletteBtn.innerHTML = Icons.palette();
        _showPalletteBtn.addEventListener("click", () => {
            this.toggle(!this.isToggled);
        })
        /* #endregion */

        /* #region  Palette select */
        const _palette = document.createElement("div");
        _palette.className = "palette d-flex hidden";

        for (const color of this.colors) {
            new ColorButton({ parentNode: _palette, color: color, onClick: this.handleSelectColor });
        }
        /* #endregion */



        _root.append(_palette)


        _root.append(_showPalletteBtn)

        return _root;
    }




}