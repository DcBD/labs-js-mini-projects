import { Component } from "../../framework/Component";
import Pallette from "../Palette/Palette";

export default class NoteEditor extends Component {

    public getTitle = () => this.getAttributeElement<HTMLInputElement>("title").value
    public getText = () => this.getAttributeElement<HTMLTextAreaElement>("text").value

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
        _root.className = "card";
        _root.setAttribute("style", "width:500px");
        /* #endregion */

        /* #region  HEADER */
        const _header = document.createElement("div");
        _header.className = "card-header";
        _root.append(_header);
        /* #endregion */

        /* #region  TITLE */
        const _title = document.createElement('input');
        _title.type = "text";
        _title.dataset.attribute = "title";
        _title.className = "editor-text";
        _title.placeholder = "Title";
        _header.append(_title);
        /* #endregion */

        /* #region  TEXT */
        const _text = document.createElement("textarea");
        _text.className = "editor-text";
        _text.dataset.attribute = "text";
        _header.append(_text);
        /* #endregion */

        const _footer = document.createElement("div");
        new Pallette({ parentNode: _footer });
        _root.append(_footer);


        return _root;
    }




}