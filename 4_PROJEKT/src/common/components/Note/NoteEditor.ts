import { Note } from "../../AppStorage";
import { Component } from "../../framework/Component";
import Icons from "../../Icons";
import Pallette from "../Palette/Palette";


interface Props extends Note {
    parentNode: HTMLElement
}
export default class NoteEditor extends Component {

    public getTitle = () => this.getAttributeElement<HTMLInputElement>("title").value
    public getText = () => this.getAttributeElement<HTMLTextAreaElement>("text").value

    private props: Note;
    private isFeatured: boolean;

    constructor(props: Props) {

        super({
            node: document.createElement("div"),
            parentNode: props.parentNode,
        })
        this.props = props;
        this.isFeatured = !!props.featured;
        this.update(this.generateContent());


    }



    private handleColorChange = (color: string) => {
        const container = this.getNode().querySelector('.card') as HTMLDivElement;

        container.style.backgroundColor = color;
    }

    private generateContent = (): HTMLElement => {

        /* #region  ROOT */
        const _root = document.createElement("div");
        _root.className = "card";
        _root.setAttribute("style", "width:500px");
        if (this.props.color)
            _root.style.backgroundColor = this.props.color;
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
        if (this.props.title)
            _title.value = this.props.title;
        _header.append(_title);
        /* #endregion */

        /* #region  TEXT */
        const _text = document.createElement("textarea");
        _text.className = "editor-text";
        _text.dataset.attribute = "text";
        if (this.props.text)
            _text.value = this.props.text;
        _header.append(_text);
        /* #endregion */

        const _footer = document.createElement("div");
        _footer.className = "footer";
        new Pallette({ parentNode: _footer, setColor: this.handleColorChange });

        _root.append(_footer);


        const _toggleFeatured = document.createElement("div");
        _toggleFeatured.className = "action-btn"
        _toggleFeatured.innerHTML = this.isFeatured ? Icons.bookmarkFilled() : Icons.bookmark();
        _toggleFeatured.addEventListener("mouseenter", (e) => {
            const element = e.target as HTMLDivElement;
            element.innerHTML = this.isFeatured ? Icons.bookmark() : Icons.bookmarkFilled();
        });

        _toggleFeatured.addEventListener("mouseleave", (e) => {
            const element = e.target as HTMLDivElement;
            element.innerHTML = this.isFeatured ? Icons.bookmarkFilled() : Icons.bookmark();
        });



        _footer.append(_toggleFeatured);




        return _root;
    }




}