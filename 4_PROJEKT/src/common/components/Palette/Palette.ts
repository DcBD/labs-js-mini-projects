import { Component } from "../../framework/Component";
import Icons from "../../Icons";
import ColorButton from "./ColorButton";

export default class Pallette extends Component {

    public getTitle = () => this.getAttributeElement<HTMLInputElement>("title").value
    public getText = () => this.getAttributeElement<HTMLTextAreaElement>("text").value

    public colors = ['red', 'green', 'blue', 'orange']

    constructor({ parentNode }: { parentNode: HTMLElement }) {

        super({
            node: document.createElement("div"),
            parentNode: parentNode,
        })

        this.update(this.generateContent());

    }





    private generateContent = (): HTMLElement => {

        /* #region  ROOT */
        const _root = document.createElement("div");
        _root.className = "d-flex"
        /* #endregion */

        /* #region  BUTTON */
        const _showPalletteBtn = document.createElement("div");
        _showPalletteBtn.className = "action-btn"
        _showPalletteBtn.innerHTML = Icons.palette();

        /* #endregion */

        const _palette = document.createElement("div");
        _palette.className = "palette d-flex";

        for (const color of this.colors) {
            new ColorButton({ parentNode: _palette, color: color });
        }



        _root.append(_palette)


        _root.append(_showPalletteBtn)

        return _root;
    }




}